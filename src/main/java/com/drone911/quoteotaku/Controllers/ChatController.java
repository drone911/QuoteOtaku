package com.drone911.quoteotaku.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.MultiGetItem;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.drone911.quoteotaku.Models.Chat;
import com.drone911.quoteotaku.Models.ChatLine;
import com.drone911.quoteotaku.Models.SearchHit;
import com.drone911.quoteotaku.Models.SearchHitSubtitle;
import com.drone911.quoteotaku.Models.Subtitle;
import com.drone911.quoteotaku.Repositories.ChatLineRepository;
import com.drone911.quoteotaku.Repositories.ChatRepository;
import com.drone911.quoteotaku.Repositories.SearchHitRepository;
import com.drone911.quoteotaku.Repositories.SearchHitSubtitleRepository;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.stream.IntStream;

@RestController
public class ChatController {
    @Value(value = "${controller.subtitles.correspondingSubtitlesAboveorBelow}")
    private Integer correspondingSubtitlesAboveOrBelow;

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

        List<SearchHit> searchHits = createSearchHits(hits);
        ChatLine chatLine = new ChatLine();
        chatLine.setTimestamp(Instant.now());
        chatLine.setChat(chat);
        chatLine.setSearchMessage(chatQuery.query);
        chatLine.setSearchHits(searchHits);
        chatLineRepository.save(chatLine);

        queryResult.put("result", searchHits);
        return queryResult;
    }

    @GetMapping(value = "/chat/{chatId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public HashMap<String, Object> chatGet(@PathVariable("chatId") String chatId,
            @RequestParam("pageSize") Integer pageSize, @RequestParam("pageOffsetEnd") Integer pageOffsetEnd) {

        HashMap<String, Object> queryResult = new HashMap<>();
        Chat chat = chatRepository.findById(chatId).orElse(null);
        if (chat == null) {
            chat = chatRepository.save(new Chat(chatId, Instant.now()));
        }
        chat.getChatLines();
        queryResult.put("result", chat);
        return queryResult;

    }

    private SearchHits<Subtitle> query(ChatQuery chatQuery) {
        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q.fuzzy(fz -> fz.field("subtitle").value(chatQuery.query))).build();
        return elasticsearchOperations.search(query, Subtitle.class);
    }

    private List<SearchHit> createSearchHits(SearchHits<Subtitle> hits) {
        List<SearchHit> searchHits = hits.map(hit -> {
            SearchHit searchHit = new SearchHit();
            Subtitle subtitle = hit.getContent();
            searchHit.setAnimeEpisode(subtitle.getAnimeEpisode());
            searchHit.setAnimeName(subtitle.getAnimeName());
            searchHit.setAnimeLength(123);
            searchHit.setChatLine(null);
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
                .mapToObj(i -> String.valueOf(i)).toList();
        correspondingIds.add(String.valueOf(hitId));
        correspondingIds.addAll(IntStream.range(hitId + 1, hitId + 1 + this.correspondingSubtitlesAboveOrBelow)
                .mapToObj(i -> String.valueOf(i)).toList());
        ;

        List<MultiGetItem<Subtitle>> correspondingSubtitles = elasticsearchOperations
                .multiGet(CriteriaQuery.builder(null).withIds(
                        correspondingIds).build(), Subtitle.class);
        List<SearchHitSubtitle> correspondingSubtitleModels = correspondingSubtitles.stream().map(s -> {
            Subtitle sub = s.getItem();
            SearchHitSubtitle searchHitSubtitle = new SearchHitSubtitle();
            searchHitSubtitle.setEndTime(sub.getEnd());
            searchHitSubtitle.setStartTime(sub.getStart());
            searchHitSubtitle.setSearchHit(hit);
            searchHitSubtitle.setSubtitle(sub.getSubtitle());
            searchHitSubtitle.setIsHit(sub.getId() == hitId);
            return searchHitSubtitle;
        }).toList();

        searchHitSubtitleRepository.saveAll(correspondingSubtitleModels);

    }
}

class ChatQuery {
    public String query;
}