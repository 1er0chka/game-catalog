package com.example.eazygames.controller;

import com.example.eazygames.entity.Game;
import com.example.eazygames.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
public class AppRestController {
    @Autowired
    AppService service;

    @RequestMapping(value = "/eazy-games/getLeader", method = RequestMethod.GET, produces = "application/json")
    public List<Game> getMainLeaderGames() {
        return service.getMainLeaderGames();
    }

    @RequestMapping(value = "/eazy-games/getMainNew", method = RequestMethod.GET, produces = "application/json")
    public List<Game> getMainNewGames() {
        return service.getMainNewGames();
    }

    @RequestMapping(value = "/eazy-games/getCatalog", method = RequestMethod.GET, produces = "application/json")
    public List<Game> getCatalog() {
        return service.getCatalog();
    }

    @RequestMapping(value = "/eazy-games/getCategory", method = RequestMethod.GET, produces = "application/json")
    public List<Game> getCatalog(@RequestParam(value = "category", required = false) String category) {
        return service.getCatalogCategory(category);
    }

    @RequestMapping(value = "/eazy-games/getSearchResult", method = RequestMethod.GET, produces = "application/json")
    public List<Game> findGames(@RequestParam(value = "request", required = false) String request) {
        return service.findGames(request);
    }

    @RequestMapping(value = "/eazy-games/sort", method = RequestMethod.GET, produces = "application/json")
    public List<Game> sortGames(@RequestParam(value = "sortBy", required = false) String sortBy, @RequestParam(value = "minPrice", required = false) Double minPrice,
                                @RequestParam(value = "maxPrice", required = false) Double maxPrice, @RequestParam(value = "age", required = false) List<Integer> ages,
                                @RequestParam(value = "categories", required = false) List<String> categories, @RequestParam(value = "developers", required = false) List<String> developers) {
        if (minPrice == null) {
            minPrice = 0.0;
        }
        if (maxPrice == null) {
            maxPrice = Double.MAX_VALUE;
        }
        if (ages == null || ages.size() == 0){
            ages = List.of(0, 3, 6, 12, 16, 18);
        }
        if (categories == null || categories.size() == 0){
            categories = Collections.emptyList();
        }
        if (developers == null || developers.size() == 0){
            developers = Collections.emptyList();
        }
        return service.sortGames(sortBy, minPrice, maxPrice, ages, categories, developers);
    }

    @RequestMapping(value = "/eazy-games/getDevelopers", method = RequestMethod.GET, produces = "application/json")
    public List<String> getDevelopers() {
        return service.getDevelopers();
    }

    @RequestMapping(value = "/eazy-games/getCategories", method = RequestMethod.GET, produces = "application/json")
    public List<String> getCategories() {
        return service.getCategories();
    }
}
