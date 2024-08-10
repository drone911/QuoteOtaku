package com.drone911.quoteotaku.Models.Anime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class AnimePictures {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medium;
    private String large;
}
