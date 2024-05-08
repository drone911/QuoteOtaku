package com.drone911.quoteotaku;

import java.util.stream.Stream;
import java.util.Map;
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
    private KafkaTemplate<String, Map<String, Object>> kafkaTemplate;

    @Autowired
    private ReadSubtitles readSubtitles;

    public void run(ApplicationArguments args) throws Exception {
        Stream<Path> pathsStream = readSubtitles.getFileNames();
        pathsStream.map(readSubtitles::processFile).limit(2).forEach(subtitleMap -> kafkaTemplate.send("subtitles", subtitleMap));
    }

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(QuoteotakuApplication.class);
		application.run(args);
	}

}
