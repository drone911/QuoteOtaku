package com.drone911.quoteotaku.Configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;

@Configuration
public class ElasticSearchConfig extends ElasticsearchConfiguration {
    @Value(value = "${spring.elasticsearch.bootstrap-servers}")
    private String elasticsearchServerAddress;
    @Value(value = "${spring.elasticsearch.user}")
    private String elasticUser;
    @Value(value = "${spring.elasticsearch.password}")
    private String elasticPassword;
    

    public ClientConfiguration clientConfiguration() {
        return ClientConfiguration.builder()
            .connectedTo(elasticsearchServerAddress)
            .withBasicAuth(elasticUser, elasticPassword)
            .build();
    }
}
