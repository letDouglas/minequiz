package derain.minequizapi.controller;

import derain.minequizapi.entity.Question;
import derain.minequizapi.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")

public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions(
            @RequestParam(required = false) String category
    ) {
        List<Question> questions;
        if (category != null && !category.isEmpty()) {
            questions = questionService.getQuestionsByCategory(category);
        } else {
            questions = questionService.getAllQuestions();
        }
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/random")
    public ResponseEntity<List<Question>> getRandomQuestions(
            @RequestParam(defaultValue = "5") int count
    ) {
        if (count <= 0) {
            return ResponseEntity.badRequest().build();
        }
        List<Question> randomQuestions = questionService.getRandomQuestions(count);
        return ResponseEntity.ok(randomQuestions);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable String id) {
        return questionService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        if (question.getId() != null) {
            return ResponseEntity.badRequest().build();
        }
        Question savedQuestion = questionService.addQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuestion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable String id) {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}