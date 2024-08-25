package com.drone911.quoteotaku.Controllers;

import java.util.Date;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.drone911.quoteotaku.Models.Anime.AnimeList;
import com.drone911.quoteotaku.Models.Anime.AnimeListAPI;
import com.drone911.quoteotaku.Models.Anime.AnimeNode;
import com.drone911.quoteotaku.Repositories.AnimeListRepository;

@RestController
public class AnimeController {

        private WebClient webClient;

        @Autowired
        private AnimeListRepository animeListRepository;

        @Autowired
        public AnimeController(
                        @Value(value = "${spring.application.malAPIBaseURL}") final String malAPIBaseURL,
                        @Value(value = "${spring.application.malAPIClientId}") final String malAPIclientId,
                        @Value(value = "${spring.application.malAPIClientSecret}") final String malAPIclientSecret) {
                this.webClient = WebClient.builder()
                                .baseUrl(malAPIBaseURL)
                                .defaultHeader("X-MAL-CLIENT-ID", malAPIclientId)
                                .defaultHeader(malAPIclientId, malAPIclientSecret)
                                .build();
        }

        @GetMapping("/anime")
        public Map<String, Object> animeGet(@RequestParam("q") String animeQuery) {
                Optional<AnimeList> animeListPresent = animeListRepository.findById(animeQuery);
                if (animeListPresent.isPresent()) {
                        AnimeList animeList = animeListPresent.get();
                        // If the record is older than 100 days, then do not refresh record
                        if ((new Date()).getTime() - animeList.getUpdatedAt().getTime() <= 100 * 60 * 60
                                        * 24
                                        * 100) {
                                return Collections.singletonMap("result", animeList);
                        }
                        animeListRepository.delete(animeList);
                }

                AnimeListAPI animeListResponse = webClient.get()
                                .uri(uriBuilder -> uriBuilder.path("/anime").queryParam("q", animeQuery)
                                                .queryParam("limit", 1)
                                                .build())
                                .retrieve()
                                .bodyToMono(AnimeListAPI.class).block();

                AnimeList animeList = new AnimeList(animeQuery, new Date(),
                                animeListResponse.getData().stream().map(animeData -> {
                                        AnimeNode animeNode = animeData.getNode();
                                        animeNode.setAnimeId(animeNode.getId());
                                        return animeData.getNode();
                                }).toList());
                try {
                        animeList = animeListRepository.save(animeList);
                } catch (DataIntegrityViolationException duplicateKeyException) {
                        System.out.println("Duplicate key error for anime search insertion: " + duplicateKeyException.toString());
                }

                return Collections.singletonMap("result", animeList);
        }

}
