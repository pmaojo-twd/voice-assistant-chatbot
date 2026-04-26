package spring.ai.demo.ai.marvin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import spring.ai.demo.ai.marvin.infrastructure.config.AppConfig;

/**
 * ChatBot Assistant Application that uses voice input and output to communicate
 * with the
 * user. The application uses the simple {@link Audio} utility to record and
 * playback the
 * audio.
 *
 * The application is refactored to a hexagonal vertical sliced architecture.
 *
 * @author Christian Tzolov
 */
@SuppressWarnings("null")
@SpringBootApplication
@ComponentScan(basePackageClasses = { VoiceAssistantApplication.class, AppConfig.class })
public class VoiceAssistantApplication {

	public static void main(String[] args) {
		SpringApplication.run(VoiceAssistantApplication.class, args);
	}
}
