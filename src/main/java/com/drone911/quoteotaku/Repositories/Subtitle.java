package com.drone911.quoteotaku.Repositories;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.Data;


@Data
@Document(indexName = "subtitles", createIndex = true)
public class Subtitle {
    @Id
    private String fileName;

    @Field(type = FieldType.Constant_Keyword)
    private String animeName;
    @Field(type = FieldType.Constant_Keyword)
    private String animeEpisode;
    @Field(type = FieldType.Text)
    private String subtitles;

}
