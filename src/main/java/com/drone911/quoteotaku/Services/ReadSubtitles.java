package com.drone911.quoteotaku.Services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Stream;
import java.util.HashMap;

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

    public String getConversations(Path file) {
        List<List<List<String>>> origConversations = null;
        try {
            JsonNode conversationsNode = readerMapper.readTree(file.toFile()).get("conversations");
            origConversations = readerMapper.convertValue(conversationsNode, new TypeReference<List<List<List<String>>>>(){});
        } catch (IOException e) {
            System.err.println("Unable to read JSON file: " + file);
        }

        StringBuilder conversations = new StringBuilder();
        if(origConversations != null) {
            int nConversations = origConversations.get(0).size();
            conversations.ensureCapacity(nConversations);
            for(List<String> conversation: origConversations.get(0)) {
                conversations.append(conversation.get(0));
                conversations.append("\n");
            }
        }
        return conversations.toString();
    }

    public String getAnimeName(String fileName) {
        return fileName;
    }

    public String getAnimeEpisode(String fileName) {
        return fileName;
    }

    public HashMap<String, Object> processFile(Path file) {
        HashMap<String, Object> subtitleMap = new HashMap<>();
        String cleanedFileName = cleanSubtitleFileName(file);
        
        String conversations = getConversations(file);
        String animeName = getAnimeName(cleanedFileName);
        String animeEpisode = getAnimeEpisode(cleanedFileName);
        
        subtitleMap.put("fileName", file.getFileName().toString());        
        subtitleMap.put("animeName", animeName);
        subtitleMap.put("animeEpisode", animeEpisode);
        subtitleMap.put("conversations", conversations);
        return subtitleMap;
    }

    public static String cleanSubtitleFileName(Path file) {
        Path fileNamePath = file.getFileName();
        String filename = fileNamePath.toString().split("[.]")[0];
        return filename;
    }
}
