package com.drone911.quoteotaku.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.drone911.quoteotaku.Models.SearchHitSubtitle;

@Repository
public interface SearchHitSubtitleRepository extends JpaRepository<SearchHitSubtitle, Long> {

}
