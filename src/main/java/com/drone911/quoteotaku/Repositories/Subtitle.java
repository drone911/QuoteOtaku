package com.drone911.quoteotaku.Repositories;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.Data;


@Data
@Document(indexName = "subtitles", createIndex = true)
public class Subtitle {
    @Id
    private Integer id;

    @Field(type = FieldType.Constant_Keyword)
    private String fileName;

    @Field(type = FieldType.Constant_Keyword)
    private String animeName;

    @Field(type = FieldType.Constant_Keyword)
    private String animeEpisode;

    @Field(type = FieldType.Constant_Keyword)
    private String start;
    
    @Field(type = FieldType.Constant_Keyword)
    private String end;

    @Field(type = FieldType.Text)
    private String subtitle;
}
