package com.drone911.quoteotaku.Models.Anime;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimeList {
    @Id
    private String name;

    @Temporal(value = TemporalType.DATE)
    private Date updatedAt;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<AnimeNode> nodes;
}
