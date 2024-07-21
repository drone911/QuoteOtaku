package com.drone911.quoteotaku.Models;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Chat {
    @Id
    private String id;

    @Column
    private Instant creationTimestamp;

    @Column
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ChatLine> chatLines = new ArrayList<ChatLine>();

    public Chat(String chatId, Instant creationTimestamp) {
        this.id = chatId;
        this.creationTimestamp = creationTimestamp;
    }
}