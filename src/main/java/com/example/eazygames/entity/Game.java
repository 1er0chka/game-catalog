package com.example.eazygames.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="game_id")
    @JsonIgnore
    private int gameId;

    @NotBlank
    private String name;

    @NotNull
    private Double price;

    @NotBlank
    private String description;

    @NotEmpty
    @ElementCollection
    private List<String> categories;

    private Integer age;

    private Date date;

    private String developer;

    @NotBlank
    private String image;
}
