/*
 * Copyright 2024 - 2024 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package spring.ai.demo.ai.marvin.infrastructure.adapter.secondary.sound;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.TargetDataLine;

import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import spring.ai.demo.ai.marvin.domain.port.AudioPort;

/**
 * Simple, audio recording and playback utility using plain Java Sound API.
 *
 * This is an adapter for the {@link AudioPort} interface.
 * It captures computer's Mic for input and Speakers as output.
 *
 * Warning: This implementation is not thread-safe and should not be used in a
 * production.
 *
 * @author Christian Tzolov
 */
@Component
public class JavaSoundAudioAdapter implements AudioPort {

	// Volatile to ensure visibility across threads
	private volatile AudioFormat format;

	private volatile TargetDataLine microphone;
	
	private volatile Clip activeClip;

	/**
	 * The file to store the recorded audio. Plays the role of a buffer.
	 */
	private final File wavFile;

	public JavaSoundAudioAdapter() {
		this(new AudioFormat(44100.0f, 16, 1, true, true), "AudioRecordBuffer.wav");
	}

	public JavaSoundAudioAdapter(AudioFormat format, String wavFileName) {
		this.format = format;
		this.wavFile = new File(wavFileName);
	}

	@Override
	public void startRecording() {
		if (this.microphone != null && this.microphone.isOpen()) {
			System.err.println("Recording already in progress. Stopping current recording before starting a new one.");
			stopRecording();
		}
		new Thread(() -> {
			try {
				// Ensure clean slate for new recording
				this.microphone = AudioSystem.getTargetDataLine(this.format);
				this.microphone.open(this.format);
				this.microphone.start();
				// This blocks until the line is closed, so it needs to be in a separate thread
				AudioSystem.write(new AudioInputStream(this.microphone), AudioFileFormat.Type.WAVE, this.wavFile);
			} catch (LineUnavailableException e) {
				throw new RuntimeException("Microphone line is unavailable. Check if it's already in use or configured.", e);
			} catch (Exception e) {
				throw new RuntimeException("Recording failed", e);
			}
		}).start();
	}

	@Override
	public void stopRecording() {
		if (this.microphone != null) {
			this.microphone.stop();
			this.microphone.close();
			this.microphone = null;
		}
	}

	@Override
	public byte[] getLastRecording() {
		try {
			return (this.wavFile.exists())
					? StreamUtils.copyToByteArray(new BufferedInputStream(new FileInputStream(this.wavFile)))
					: new byte[0];
		} catch (IOException e) {
			throw new RuntimeException("Failed to read recording", e);
		}
	}

	@Override
	public void recordActiveSpeech(Runnable onSpeechStart) {
		try {
			this.microphone = AudioSystem.getTargetDataLine(this.format);
			this.microphone.open(this.format);
			this.microphone.start();

			ByteArrayOutputStream out = new ByteArrayOutputStream();
			byte[] buffer = new byte[4096];

			boolean speechStarted = false;
			long silenceStartTime = 0;
			int silenceThresholdMs = 1500; // 1.5 segundos de silencio para cortar
			
			// IMPORTANTE: Este valor depende de la sensibilidad de tu micrófono. 
			// 1500 suele ser un buen umbral para distinguir voz de ruido de fondo.
			double volumeThreshold = 1500.0; 

			while (true) {
				int bytesRead = microphone.read(buffer, 0, buffer.length); // Esto bloquea hasta tener audio
				if (bytesRead > 0) {
					double rms = calculateRMS(buffer, bytesRead);

					if (!speechStarted) {
						if (rms > volumeThreshold) {
							speechStarted = true;
							System.out.println("\n[VAD] ¡Voz detectada! (Vol: " + (int)rms + ")");
							if (onSpeechStart != null) {
								onSpeechStart.run(); // ¡Mandamos callar al bot!
							}
							out.write(buffer, 0, bytesRead);
						}
					} else {
						out.write(buffer, 0, bytesRead);
						if (rms < volumeThreshold) {
							if (silenceStartTime == 0) {
								silenceStartTime = System.currentTimeMillis();
							} else if (System.currentTimeMillis() - silenceStartTime > silenceThresholdMs) {
								break; // Hemos superado el tiempo máximo de silencio
							}
						} else {
							silenceStartTime = 0; // Reseteamos el temporizador si vuelves a hablar
						}
					}
				}
			}

			stopRecording(); // Cerramos el micrófono

			// Guardamos el buffer en el archivo temporal para compatibilidad
			byte[] audioData = out.toByteArray();
			try (AudioInputStream ais = new AudioInputStream(
					new ByteArrayInputStream(audioData), this.format, audioData.length / this.format.getFrameSize())) {
				AudioSystem.write(ais, AudioFileFormat.Type.WAVE, this.wavFile);
			}

		} catch (Exception e) {
			throw new RuntimeException("Error durante la grabación VAD", e);
		}
	}

	private double calculateRMS(byte[] buffer, int length) {
		long sum = 0;
		if (length == 0) return 0;
		for (int i = 0; i < length - 1; i += 2) {
			// Java Sound con bigEndian=true empaqueta el MSB primero
			short sample = (short) (((buffer[i] & 0xFF) << 8) | (buffer[i + 1] & 0xFF));
			sum += (long) sample * sample;
		}
		return Math.sqrt((double) sum / (length / 2));
	}

	@Override
	public void play(byte[] waveData) { // java utils to play wav audio
		new Thread(() -> {
			try {
				// Get the audio input stream
				AudioInputStream audioInputStream = AudioSystem
						.getAudioInputStream(new BufferedInputStream(new ByteArrayInputStream(waveData)));

				// Get the audio format
				AudioFormat format = audioInputStream.getFormat();

				// Create a normalized format that works well with GraalVM
				AudioFormat normalizedFormat = new AudioFormat(
						AudioFormat.Encoding.PCM_SIGNED, // Use signed PCM encoding
						format.getSampleRate(),
						16, // Use 16-bit samples
						format.getChannels(),
						format.getChannels() * 2, // Frame size
						format.getSampleRate(),
						false); // Use little-endian (more widely compatible)

				// Convert to the normalized format
				AudioInputStream normalizedStream = AudioSystem.getAudioInputStream(normalizedFormat, audioInputStream);

				// Create a temporary buffer to ensure all data is valid
				byte[] audioBytes = normalizedStream.readAllBytes();

				// Create a new stream from the validated data
				AudioInputStream validatedStream = new AudioInputStream(
						new ByteArrayInputStream(audioBytes),
						normalizedFormat,
						audioBytes.length / normalizedFormat.getFrameSize());

				// Play the audio
				try (Clip clip = AudioSystem.getClip()) {
					this.activeClip = clip;
					clip.open(validatedStream);
					clip.start();

					// Wait for playback to complete
					while (!clip.isRunning()) {
						Thread.sleep(100);
					}
					while (clip.isRunning()) {
						Thread.sleep(100);
					}

					clip.stop();
				} finally {
					this.activeClip = null;
				}
			} catch (Exception e) {
				System.err.println("Audio playback error: " + e.getMessage());
				e.printStackTrace();
				// Continue without throwing to prevent application crash
			}
		}).start();
	}

	@Override
	public void stopPlaying() {
		Clip clip = this.activeClip;
		if (clip != null && clip.isRunning()) {
			clip.stop(); // Al pararlo, se rompe el bucle while del hilo de reproducción y se cierra limpiamente
		}
	}
}