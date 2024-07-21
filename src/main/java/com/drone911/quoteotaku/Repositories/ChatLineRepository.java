package com.drone911.quoteotaku.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.drone911.quoteotaku.Models.Chat;
import com.drone911.quoteotaku.Models.ChatLine;

@Repository
public interface ChatLineRepository extends JpaRepository<ChatLine, Long> {
        @Query("select Chatline from Chat c inner join c.chatLines Chatline where c = :inputChat order by Chatline.id desc")
        public Page<ChatLine> findByChat(@Param("inputChat") Chat inpuChat, Pageable pageable);
}
