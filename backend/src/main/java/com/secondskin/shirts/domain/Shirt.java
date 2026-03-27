package com.secondskin.shirts.domain;

import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "shirts",
    uniqueConstraints = @UniqueConstraint(
        name = "shirts_unique",
        columnNames = {"team_id", "season", "type", "sleeve", "authenticity", "brand"}
    )
)
public class Shirt {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @Column(nullable = false, length = 20)
    private String season;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 10)
    private ShirtType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 5)
    private SleeveType sleeve;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 8)
    private AuthenticityType authenticity;

    @Column(nullable = false, length = 30)
    private String brand;

    @Column(columnDefinition = "text")
    private String notes;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    protected Shirt() {}

    public Shirt(Team team, String season, ShirtType type, SleeveType sleeve, AuthenticityType authenticity, String brand){
        this.team = team;
        this.season = season;
        this.type = type;
        this.sleeve = sleeve;
        this.authenticity = authenticity;
        this.brand = brand;
    }

    public UUID getId() {
        return id;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public ShirtType getType() {
        return type;
    }

    public void setType(ShirtType type) {
        this.type = type;
    }

    public SleeveType getSleeve() {
        return sleeve;
    }

    public void setSleeve(SleeveType sleeve) {
        this.sleeve = sleeve;
    }

    public AuthenticityType getAuthenticity(){
        return authenticity;
    }

    public void setAuthenticity(AuthenticityType authenticity) {
        this.authenticity = authenticity;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public OffsetDateTime getCreatedAt() { return createdAt; }
}
