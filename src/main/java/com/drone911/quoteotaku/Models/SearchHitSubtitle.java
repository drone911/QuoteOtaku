package com.drone911.quoteotaku.Models;

import java.sql.Date;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class SearchHitSubtitle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer startTime;

    @Column
    private Integer endTime;

    @Column
    private String subtitle;

    @Column
    private Boolean isHit;

    @ManyToOne
    @JoinColumn(name = "search_hit_id", nullable = false)
    private SearchHit searchHit;
}
