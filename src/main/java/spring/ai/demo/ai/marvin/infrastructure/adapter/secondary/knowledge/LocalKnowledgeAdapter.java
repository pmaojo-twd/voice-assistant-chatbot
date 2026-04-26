package spring.ai.demo.ai.marvin.infrastructure.adapter.secondary.knowledge;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import spring.ai.demo.ai.marvin.domain.port.KnowledgePort;

import java.util.List;

@Component
@ConditionalOnProperty(name = "rag.mode", havingValue = "vector", matchIfMissing = true)
public class LocalKnowledgeAdapter implements KnowledgePort {

    private final VectorStore vectorStore;

    public LocalKnowledgeAdapter(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @Override
    public List<Document> findSimilarDocuments(String query) {
        return vectorStore.similaritySearch(SearchRequest.builder().query(query).topK(2).build());
    }
}