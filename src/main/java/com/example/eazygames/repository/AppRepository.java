package com.example.eazygames.repository;

import com.example.eazygames.entity.Game;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppRepository extends CrudRepository<Game, Integer> {
    List<Game> findAll();

    List<Game> findAllByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
    List<Game> findDistinctByPriceGreaterThanEqualAndPriceLessThanEqualAndAgeInAndCategoriesInAndDeveloperIn(Double minPrice, Double maxPrice, List<Integer> ages, List<String> categories, List<String> developers, Sort sort);
    @Query("SELECT DISTINCT c FROM Game g JOIN g.categories c")
    List<String> findAllCategories();

    @Query("SELECT DISTINCT g.developer FROM Game g")
    List<String> findAllDevelopers();
}
