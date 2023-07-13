package com.example.eazygames.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@Controller
public class AppController {
    @GetMapping("/eazy-games")
    public String goToMain() {
        return "main";
    }

    @GetMapping("/eazy-games/catalog")
    public String goToCatalog() {
        return "catalog";
    }

    @GetMapping("/eazy-games/basket")
    public String goToBasket() {
        return "basket";
    }

    @GetMapping("/eazy-games/favorites")
    public String goToFavorites() {
        return "favorites";
    }

    @RequestMapping(value = "/eazy-games/category")
    public String goToCategory(@RequestParam(value = "category", required = false) String category, ModelMap model) {
        model.addAttribute("category", category);
        return "category";
    }

    @RequestMapping(value = "/eazy-games/game")
    public String goToGame(@RequestParam(value = "name", required = false) String name, ModelMap model) {
        model.addAttribute("name", name);
        return "game";
    }

    @RequestMapping(value = "/eazy-games/search")
    public String goToSearchResult(@RequestParam(value = "request", required = false) String request, ModelMap model) {
        model.addAttribute("request", request);
        return "searchResult";
    }
}
