package com.drone911.quoteotaku.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.MultiGetItem;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.PageRequest;

import com.drone911.quoteotaku.Models.*;
import com.drone911.quoteotaku.Repositories.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
public class ChatController {
    @Value(value = "")
    private String corsOrigin;

    @Value(value = "${controller.subtitles.correspondingSubtitlesAboveorBelow}")
    private Integer correspondingSubtitlesAboveOrBelow;

    @Value(value = "${controller.subtitles.maxPageSize}")
    private Integer maxPageSize;

    @Value(value = "${controller.subtitles.defaultPageSize}")
    private Integer defaultPageSize;

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ChatLineRepository chatLineRepository;

    @Autowired
    private SearchHitRepository searchHitRepository;

    @Autowired
    private SearchHitSubtitleRepository searchHitSubtitleRepository;

    @PostMapping(value = "/chat/{chatId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public HashMap<String, Object> chatPost(@PathVariable("chatId") String chatId,
            @RequestBody ChatQuery chatQuery) {

        SearchHits<Subtitle> hits = query(chatQuery);

        HashMap<String, Object> queryResult = new HashMap<>();

        Chat chat = chatRepository.findById(chatId).orElse(null);
        if (chat == null) {
            chat = chatRepository.save(new Chat(chatId, Instant.now()));
        }

        ChatLine chatLine = new ChatLine();
        chatLine.setTimestamp(Instant.now());
        chatLine.setSearchMessage(chatQuery.query);
        chatLine = chatLineRepository.save(chatLine);
        chat.getChatLines().add(chatLine);
        createSearchHits(hits, chatLine);
        chatLine = chatLineRepository.findById(chatLine.getId()).orElse(null);
        queryResult.put("result", chatLine);
        return queryResult;
    }

    @GetMapping(value = "/chat/{chatId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public HashMap<String, Object> chatGet(@PathVariable("chatId") String chatId,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value = "pageOffsetEnd", required = false) Integer pageOffsetEnd) {

        if (pageSize == null) {
            pageSize = defaultPageSize;
        } else {
            if (pageSize > maxPageSize) {
                pageSize = maxPageSize;
            }
        }
        if (pageOffsetEnd == null) {
            pageOffsetEnd = 0;
        }

        HashMap<String, Object> queryResult = new HashMap<>();
        Chat chat = chatRepository.findById(chatId).orElse(null);
        if (chat == null) {
            queryResult.put("result", chat);
        } else {
            chat.setChatLines(
                    chatLineRepository.findByChat(chat, PageRequest.of(pageOffsetEnd, pageSize))
                            .getContent());
            queryResult.put("result", chat);
        }
        return queryResult;

    }

    private SearchHits<Subtitle> query(ChatQuery chatQuery) {
        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q.fuzzy(fz -> fz.field("subtitle").value(chatQuery.query))).build();
        return elasticsearchOperations.search(query, Subtitle.class);
    }

    private List<SearchHit> createSearchHits(SearchHits<Subtitle> hits, ChatLine chatLine) {
        List<SearchHit> searchHits = hits.map(hit -> {
            SearchHit searchHit = new SearchHit();
            Subtitle subtitle = hit.getContent();
            searchHit.setAnimeEpisode(subtitle.getAnimeEpisode());
            searchHit.setAnimeName(subtitle.getAnimeName());
            searchHit.setAnimeLength(123);
            chatLine.getSearchHits().add(searchHit);
            return searchHit;
        }).toList();
        searchHits = searchHitRepository.saveAll(searchHits);
        int i = 0;
        for (var hit : hits) {
            saveCorrespodingSubtitles(searchHits.get(i), hit);
            i++;
        }
        return searchHits;
    }

    private void saveCorrespodingSubtitles(SearchHit hit,
            org.springframework.data.elasticsearch.core.SearchHit<Subtitle> elasticHit) {
        SearchHitSubtitle hitSubtitle = new SearchHitSubtitle();
        Subtitle subtitle = elasticHit.getContent();
        hitSubtitle.setIsHit(true);

        hitSubtitle.setStartTime(subtitle.getStart());
        hitSubtitle.setEndTime(subtitle.getEnd());

        Integer hitId = subtitle.getId();

        List<String> correspondingIds = IntStream.range(hitId - this.correspondingSubtitlesAboveOrBelow - 1, hitId - 1)
                .mapToObj(i -> String.valueOf(i)).collect(Collectors.toList());
        correspondingIds.add(String.valueOf(hitId));
        correspondingIds.addAll(IntStream.range(hitId + 1, hitId + 1 + this.correspondingSubtitlesAboveOrBelow)
                .mapToObj(i -> String.valueOf(i)).toList());
        ;
        Query query = NativeQuery.builder().withIds(correspondingIds).build();
        List<MultiGetItem<Subtitle>> correspondingSubtitles = elasticsearchOperations.multiGet(query, Subtitle.class);

        correspondingSubtitles.forEach(s -> System.out.println(s));
        List<SearchHitSubtitle> correspondingSubtitleModels = correspondingSubtitles.stream().map(s -> {
            Subtitle sub = s.getItem();
            SearchHitSubtitle searchHitSubtitle = new SearchHitSubtitle();
            searchHitSubtitle.setEndTime(sub.getEnd());
            searchHitSubtitle.setStartTime(sub.getStart());
            searchHitSubtitle.setSubtitle(sub.getSubtitle());

            searchHitSubtitle.setIsHit(sub.getId().compareTo(hitId) == 0);
            hit.getSearchHitSubtitle().add(searchHitSubtitle);
            return searchHitSubtitle;
        }).toList();
        searchHitSubtitleRepository.saveAll(correspondingSubtitleModels);

    }
}

class ChatQuery {
    public String query;
}
