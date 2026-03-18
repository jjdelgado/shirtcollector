package com.secondskin.shirts.api.dto;

import com.secondskin.shirts.domain.TeamType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateTeamRequest(
        @NotNull TeamType teamType,
        @NotBlank @Size(max = 100) String alias,
        @NotBlank @Size(max = 255) String fullName,
        @NotBlank @Size(max = 100) String country,
        @Size(max = 100) String city) {

}
