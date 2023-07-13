/*
package com.example.eazygames.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private int userId;

    @NotBlank
    @Size(min = 8, max = 20)
    private String username;

    @NotBlank
    @Size(min = 8, max = 20)
    private String password;

    @OneToMany
    private List<Game> favorites;

    @OneToOne(cascade = CascadeType.ALL)
    private Basket basket;
}
*/
