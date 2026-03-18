package com.secondskin.shirts.domain;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_shirts")
public class UserShirt {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "shirt_id", nullable = false)
    private Shirt shirt;

    @Column(name = "player_name", length = 50)
    private String playerName;

    @Column(name = "player_number")
    private Integer playerNumber;

    @Column(name = "match_worn", nullable = false)
    private boolean matchWorn = false;

    @Column(name = "match_date")
    private LocalDate matchDate;

    @Column(name = "match_notes", columnDefinition = "text")
    private String matchNotes;

    @Column(name = "acquired_at")
    private LocalDate acquiredAt;

    @Column(name = "condition", length = 100)
    private String condition;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    protected UserShirt() {
    }

    public UserShirt(User user, Shirt shirt) {
        this.user = user;
        this.shirt = shirt;
    }

    public UUID getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Shirt getShirt() {
        return shirt;
    }

    public void setShirt(Shirt shirt) {
        this.shirt = shirt;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public Integer getPlayerNumber() {
        return playerNumber;
    }

    public void setPlayerNumber(Integer playerNumber) {
        this.playerNumber = playerNumber;
    }

    public boolean isMatchWorn() {
        return matchWorn;
    }

    public void setMatchWorn(boolean matchWorn) {
        this.matchWorn = matchWorn;
    }

    public LocalDate getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDate matchDate) {
        this.matchDate = matchDate;
    }

    public String getMatchNotes() {
        return matchNotes;
    }

    public void setMatchNotes(String matchNotes) {
        this.matchNotes = matchNotes;
    }

    public LocalDate getAcquiredAt() {
        return acquiredAt;
    }

    public void setAcquiredAt(LocalDate acquiredAt) {
        this.acquiredAt = acquiredAt;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
