package com.secondskin.shirts.api.dto;

import com.secondskin.shirts.domain.AuthenticityType;
import com.secondskin.shirts.domain.ShirtType;
import com.secondskin.shirts.domain.SleeveType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateShirtRequest(
    @NotNull UUID teamId,
    @NotBlank @Size(max = 20) String season,
    @NotNull ShirtType type,
    @NotNull SleeveType sleeve,
    @NotNull AuthenticityType authenticity,
    @NotBlank @Size(max = 100) String brand,
    String notes
) {
}