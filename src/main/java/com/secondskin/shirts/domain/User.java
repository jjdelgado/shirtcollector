package com.secondskin.shirts.domain;

import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 50)
    private String handle;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    protected User() {}

    public User(String handle) {
        this.handle = handle;
    }

    public UUID getId() { return id; }
    
    public String getHandle() { return handle; }
    public void setHandle(String handle) { this.handle = handle; }
    
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
