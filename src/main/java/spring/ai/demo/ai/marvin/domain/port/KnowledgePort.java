package spring.ai.demo.ai.marvin.domain.port;

import org.springframework.ai.document.Document;
import java.util.List;

public interface KnowledgePort {
    List<Document> findSimilarDocuments(String query);
}
