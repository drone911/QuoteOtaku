package com.drone911.quoteotaku;

import java.util.stream.Stream;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.ApplicationArguments;
import org.springframework.kafka.core.KafkaTemplate;

import com.drone911.quoteotaku.Services.ReadSubtitles;

@SpringBootApplication
public class QuoteotakuApplication implements ApplicationRunner {
    @Autowired
    private KafkaTemplate<String, List<Map<String, Object>>> kafkaTemplate;

    @Autowired
    private ReadSubtitles readSubtitles;

    public void run(ApplicationArguments args) throws Exception {
        Stream<Path> pathsStream = readSubtitles.getFileNames();
        pathsStream.limit(500).forEach(fileName -> {
            var subtitlesMap = readSubtitles.processFile(fileName);
            // Split to accomodate kafka's max allowed element
            List<Map<String, Object>> subtitleStart = new ArrayList<>(subtitlesMap.subList(0, subtitlesMap.size()/3));
            List<Map<String, Object>> subtitleMid = new ArrayList<>(subtitlesMap.subList(subtitlesMap.size()/3, (subtitlesMap.size() * 2)/3));
            List<Map<String, Object>> subtitleEnd = new ArrayList<>(subtitlesMap.subList( (subtitlesMap.size() * 2)/3, subtitlesMap.size()));
            
            kafkaTemplate.send("subtitles", subtitleStart);
            kafkaTemplate.send("subtitles", subtitleMid);
            kafkaTemplate.send("subtitles", subtitleEnd);
        });
    }

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(QuoteotakuApplication.class);
        application.run(args);
    }

}
