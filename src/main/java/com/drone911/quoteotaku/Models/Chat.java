package com.drone911.quoteotaku.Models;

import java.time.Instant;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
    private List<ChatLine> chatLines;

    public Chat(String chatId, Instant creationTimestamp) {
        this.id = chatId;
        this.creationTimestamp = creationTimestamp;
    }
}