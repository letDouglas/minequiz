package derain.minequizapi.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import derain.minequizapi.entity.Question;
import derain.minequizapi.repository.QuestionRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
@Profile("!test") // Solo se non è il profilo test
@Slf4j
public class DatabaseInitializer {

    private final QuestionRepository repository;
    private final ObjectMapper objectMapper;

    public DatabaseInitializer(QuestionRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void init() {
        long count = repository.count();
        if (count == 0) {
            log.info("No questions found in DB. Attempting to load from JSON...");
            try {
                ClassPathResource resource = new ClassPathResource("data/questions.json");
                if (!resource.exists()) {
                    log.error("Cannot find data/questions.json in classpath.");
                    return;
                }

                try (InputStream inputStream = resource.getInputStream()) {
                    String jsonContent = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
                    List<Question> questions = objectMapper.readValue(jsonContent, new TypeReference<>() {
                    });
                    if (questions != null && !questions.isEmpty()) {
                        repository.deleteAll();
                        repository.saveAll(questions);
                        log.info("Successfully loaded {} questions.", questions.size());
                    } else {
                        log.warn("JSON file was empty or malformed.");
                    }
                }
            } catch (Exception e) {
                log.error("Failed to load questions from JSON.", e);
            }
        } else {
            log.info("Database already contains {} questions. Skipping load.", count);
        }
    }
}
