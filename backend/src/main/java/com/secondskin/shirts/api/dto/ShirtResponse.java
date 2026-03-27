package com.secondskin.shirts.api.dto;

import com.secondskin.shirts.domain.AuthenticityType;
import com.secondskin.shirts.domain.ShirtType;
import com.secondskin.shirts.domain.SleeveType;

import java.time.OffsetDateTime;
import java.util.UUID;

public record ShirtResponse(
    UUID id,
    TeamResponse team,
    String season,
    ShirtType type,
    SleeveType sleeve,
    AuthenticityType authenticity,
    String brand,
    String notes,
    OffsetDateTime createdAt
) {
}