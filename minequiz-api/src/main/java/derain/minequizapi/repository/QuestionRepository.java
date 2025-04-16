package derain.minequizapi.repository;

import derain.minequizapi.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {

    List<Question> findByCategory(String category);

    List<Question> findByDifficulty(String difficulty);

    List<Question> findByCategoryAndDifficulty(String category, String difficulty);

}