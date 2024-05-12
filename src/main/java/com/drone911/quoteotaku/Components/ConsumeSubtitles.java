package com.drone911.quoteotaku.Components;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.drone911.quoteotaku.Repositories.Subtitle;

@Component
public class ConsumeSubtitles {
    private Integer count = 0;
    @Autowired
    ElasticsearchOperations elasticsearchOperations;

    @SuppressWarnings("unchecked")
    @KafkaListener(topics = "subtitles", id = "SubtitleToElastic")
    public void listen(List<Map<String, Object>> subtitles) {
        ArrayList<Subtitle> subtitlesToSave = new ArrayList<Subtitle>();
        subtitlesToSave.ensureCapacity(subtitles.size());
        for (var subtitle : subtitles) {
            Subtitle subtitleToSave = new Subtitle();
            subtitleToSave.setId(count);
            subtitleToSave.setStart((String) subtitle.get("start"));
            subtitleToSave.setEnd((String) subtitle.get("end"));
            subtitleToSave.setFileName((String) subtitle.get("fileName"));
            subtitleToSave.setAnimeName((String) subtitle.get("animeName"));
            subtitleToSave.setAnimeEpisode((String) subtitle.get("animeEpisode"));
            subtitleToSave.setSubtitle((String) subtitle.get("conversation"));
            subtitleToSave.setSubtitle((String) subtitle.get("conversation"));
            subtitleToSave.setSubtitle((String) subtitle.get("conversation"));
            subtitlesToSave.add(subtitleToSave);
            count++;
            if (count % 5000 == 0) {
                System.out.print("[Debug] Saved " + count + " conversations in Elastic");
            }    
        }
        elasticsearchOperations.save(subtitlesToSave);
    }
}
