package com.drone911.quoteotaku.Models.Anime;

import java.util.List;

import lombok.Data;

@Data
public class AnimeListAPI {
    private List<AnimeData> data;
    private Page paging;
}
