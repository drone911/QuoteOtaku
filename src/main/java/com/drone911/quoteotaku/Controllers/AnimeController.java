package com.drone911.quoteotaku.Controllers;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.drone911.quoteotaku.Models.Anime.AnimeList;
import com.drone911.quoteotaku.Models.Anime.AnimeListAPI;
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
        Optional<AnimeList> animeList = animeListRepository.findById(animeQuery);

        AnimeListAPI animeListResponse = webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/anime").queryParam("q", animeQuery).queryParam("limit", 3)
                        .build())
                .retrieve()
                .bodyToMono(AnimeListAPI.class).block();

        return Collections.singletonMap("result", animeList);
    }

}
