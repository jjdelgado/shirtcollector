package com.secondskin.shirts.api.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

import com.secondskin.shirts.domain.TeamType;

public record TeamResponse(
        UUID id,
        TeamType teamType,
        String alias,
        String fullName,
        String country,
        String city,
        OffsetDateTime createdAt) {

}
