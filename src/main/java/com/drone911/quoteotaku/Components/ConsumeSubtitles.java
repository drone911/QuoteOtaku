package com.drone911.quoteotaku.Components;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.drone911.quoteotaku.Repositories.Subtitle;


@Component
public class ConsumeSubtitles {
    @Autowired
    ElasticsearchOperations elasticsearchOperations;

    @SuppressWarnings("unchecked")
    @KafkaListener(topics = "subtitles", id = "SubtitleToElastic")
    public void listen(HashMap<String, Object> data) {
        Subtitle subtitle = new Subtitle();

        subtitle.setFileName((String)data.get("fileName"));
        subtitle.setAnimeName((String)data.get("animeName"));
        subtitle.setAnimeEpisode((String)data.get("animeEpisode"));
        subtitle.setSubtitles((String)data.get("conversations"));

        elasticsearchOperations.save(subtitle);
        System.out.println("WOWOWOWE");
    } 
}
