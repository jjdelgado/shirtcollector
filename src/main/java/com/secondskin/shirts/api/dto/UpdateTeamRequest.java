package com.secondskin.shirts.api.dto;

import com.secondskin.shirts.domain.TeamType;
import jakarta.validation.constraints.Size;

public record UpdateTeamRequest(
        TeamType teamType,
        @Size(max = 255) String fullName,
        @Size(max = 100) String country,
        @Size(max = 100) String city
    ) {}
