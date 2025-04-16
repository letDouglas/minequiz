package derain.minequizapi.service;

import derain.minequizapi.entity.Question;
import derain.minequizapi.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(String id) {
        return questionRepository.findById(id);
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public List<Question> getQuestionsByCategory(String category) {
        return questionRepository.findByCategory(category);
    }

    public List<Question> getRandomQuestions(int count) {
        List<Question> allQuestions = questionRepository.findAll();
        if (allQuestions.isEmpty() || count <= 0) {
            return Collections.emptyList();
        }
        Collections.shuffle(allQuestions);
        int actualCount = Math.min(count, allQuestions.size());
        return allQuestions.subList(0, actualCount);
    }

    public void deleteQuestion(String id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found with id: " + id);
        }
        questionRepository.deleteById(id);
    }
}