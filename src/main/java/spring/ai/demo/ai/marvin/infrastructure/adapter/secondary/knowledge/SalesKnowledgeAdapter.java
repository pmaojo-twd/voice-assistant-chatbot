package spring.ai.demo.ai.marvin.infrastructure.adapter.secondary.knowledge;

import org.springframework.ai.document.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import spring.ai.demo.ai.marvin.domain.port.KnowledgePort;

import java.util.List;
import java.util.Map;

/**
 * Adaptador de conocimiento que devuelve un prompt fijo orientado a ventas.
 * Demuestra la flexibilidad de la arquitectura hexagonal al permitir cambiar
 * la fuente de "conocimiento" por una estrategia comercial estática.
 */
@Component
@ConditionalOnProperty(name = "rag.mode", havingValue = "sales")
public class SalesKnowledgeAdapter implements KnowledgePort {

    private final String salesPrompt;

    public SalesKnowledgeAdapter(@Value("${rag.sales.prompt}") String salesPrompt) {
        this.salesPrompt = salesPrompt;
    }

    @Override
    public List<Document> findSimilarDocuments(String query) {
        System.out.println("[SALES RAG]: Inyectando prompt comercial de Orion...");
        
        // Devolvemos un documento ficticio con el prompt de ventas
        Document salesDoc = new Document(salesPrompt, Map.of("source", "sales_strategy"));
        
        return List.of(salesDoc);
    }
}
