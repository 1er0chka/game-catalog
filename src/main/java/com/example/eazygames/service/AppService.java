package com.example.eazygames.service;

import com.example.eazygames.entity.Game;
import com.example.eazygames.repository.AppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class AppService {
    @Autowired
    private AppRepository repository;

    public List<Game> getMainLeaderGames() {
        List<Game> leaderGames = new ArrayList<>();
        for (Game game : repository.findAll()) {
            if (game.getCategories().contains("Лидеры продаж")) {
                leaderGames.add(game);
            }
        }
        Collections.shuffle(leaderGames);
        while (leaderGames.size() > 3) {
            leaderGames.remove(leaderGames.size() - 1);
        }
        return leaderGames;
    }

    public List<Game> getMainNewGames() {
        List<Game> newGames = new ArrayList<>();
        for (Game game : repository.findAll()) {
            if (game.getCategories().contains("Новинки")) {
                newGames.add(game);
            }
        }
        Collections.shuffle(newGames);
        while (newGames.size() > 8) {
            newGames.remove(newGames.size() - 1);
        }
        return newGames;
    }

    public List<Game> getCatalog() {
        return repository.findAll();
    }

    public List<Game> getCatalogCategory(String category) {
        List<Game> games = new ArrayList<>();
        for (Game game : repository.findAll()) {
            if (game.getCategories().contains(category)) {
                games.add(game);
            }
        }
        return games;
    }

    public List<String> getDevelopers(){
        return repository.findAllDevelopers();
    }

    public List<String> getCategories() {
        return repository.findAllCategories();
    }

    public List<Game> findGames(String request) {
        return repository.findAllByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(request, request);
    }

    public List<Game> sortGames(String sortBy, double minPrice, double maxPrice, List<Integer> ages, List<String> categories, List<String> developers) {
        Sort sort = Sort.by(Sort.Direction.DESC, "date");
        switch (sortBy) {
            case "new": {
                sort = Sort.by(Sort.Direction.DESC, "date");
            }
            break;
            case "old": {
                sort = Sort.by(Sort.Direction.ASC, "date");
            }
            break;
            case "min_cost": {
                sort = Sort.by(Sort.Direction.ASC, "price");
            }
            break;
            case "max_cost": {
                sort = Sort.by(Sort.Direction.DESC, "price");
            }
            break;
            case "name": {
                sort = Sort.by(Sort.Direction.ASC, "name");
            }
        }
        if (categories.size() == 0){
            categories = repository.findAllCategories();
        }
        if (developers.size() == 0){
            developers = repository.findAllDevelopers();
        }
        return repository.findDistinctByPriceGreaterThanEqualAndPriceLessThanEqualAndAgeInAndCategoriesInAndDeveloperIn(minPrice, maxPrice, ages, categories, developers, sort);
    }
}