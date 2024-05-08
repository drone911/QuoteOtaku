package com.drone911.quoteotaku.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.StringQuery;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.drone911.quoteotaku.Repositories.Subtitle;

import java.util.HashMap;

@RestController
public class QueryController {
    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    @GetMapping("/search")
    public HashMap<String, Object> greeting(@RequestParam("query") String requestQuery) {
        StringQuery query = new StringQuery("{ \"match\": { \"name\": { \"query\": \"" + requestQuery + "\" } } } ");
        HashMap<String, Object> queryResult = new HashMap<>();
        SearchHits<Subtitle> queriedSubtitles = elasticsearchOperations.search( query, Subtitle.class);
        queryResult.put("result", queriedSubtitles.toString());
        return queryResult;
    }
}
