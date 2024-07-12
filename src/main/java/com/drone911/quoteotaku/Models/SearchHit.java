package com.drone911.quoteotaku.Models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class SearchHit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_line_Id", nullable = false)
    private ChatLine chatLine;

    @Column
    private String animeName;

    @Column
    private String animeEpisode;

    @Column
    private Integer animeLength;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "searchHitSubtitle", nullable = false)
    private List<SearchHitSubtitle> searchHitSubtitle;
}
