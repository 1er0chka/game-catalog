/*
package com.example.eazygames.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "baskets")
public class Basket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "basket_id")
    private int basketId;

    @ManyToMany
    private List<Game> games;
}
*/
