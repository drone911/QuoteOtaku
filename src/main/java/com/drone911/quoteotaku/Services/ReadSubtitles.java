package com.drone911.quoteotaku.Services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Stream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ReadSubtitles {

    @Value(value = "${data.subtitles.directory}")
    private String subtitlesDirectory;

    private final ObjectMapper readerMapper = new ObjectMapper();

    public Stream<Path> getFileNames() throws IOException {
        return Files.walk(Paths.get(subtitlesDirectory)).filter(Files::isRegularFile);
    }

    public List<Map<String, Object>> getConversations(Path file) {
        List<List<Map<String, String>>> origConversations = null;
        try {
            JsonNode conversationsNode = readerMapper.readTree(file.toFile()).get("conversations");
            origConversations = readerMapper.convertValue(conversationsNode,
                    new TypeReference<List<List<Map<String, String>>>>() {
                    });
        } catch (IOException e) {
            System.err.println("Unable to read JSON file: " + file);
        }

        ArrayList<Map<String, Object>> conversations = new ArrayList<>();
        if (origConversations != null) {
            int nConversations = origConversations.get(0).size();
            conversations.ensureCapacity(nConversations);
            for (Map<String, String> conversation : origConversations.get(0)) {
                Map<String, Object> subtitleMap = new HashMap<>();
                subtitleMap.put("conversation", conversation.get("text"));
                subtitleMap.put("start", conversation.get("start"));
                subtitleMap.put("end", conversation.get("end"));

                conversations.add(subtitleMap);
            }
        }
        return conversations;
    }

    public String getAnimeName(String fileName) {
        return fileName;
    }

    public String getAnimeEpisode(String fileName) {
        return fileName;
    }

    public List<Map<String, Object>> processFile(Path file) {
        List<Map<String, Object>> conversations = getConversations(file);
        String cleanedFileName = cleanSubtitleFileName(file);

        String animeName = getAnimeName(cleanedFileName);
        String animeEpisode = getAnimeEpisode(cleanedFileName);
        for(Map<String, Object> subtitleMap: conversations){
            subtitleMap.put("fileName", file.getFileName().toString());
            subtitleMap.put("animeName", animeName);
            subtitleMap.put("animeEpisode", animeEpisode);    
        }
        return conversations;
    }

    public static String cleanSubtitleFileName(Path file) {
        Path fileNamePath = file.getFileName();
        String filename = fileNamePath.toString().split("[.]")[0];
        return filename;
    }
}
