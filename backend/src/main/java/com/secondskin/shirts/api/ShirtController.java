package com.secondskin.shirts.api;

import com.secondskin.shirts.api.dto.CreateShirtRequest;
import com.secondskin.shirts.api.dto.ShirtResponse;
import com.secondskin.shirts.api.dto.TeamResponse;
import com.secondskin.shirts.domain.AuthenticityType;
import com.secondskin.shirts.domain.Shirt;
import com.secondskin.shirts.domain.ShirtType;
import com.secondskin.shirts.domain.SleeveType;
import com.secondskin.shirts.domain.Team;
import com.secondskin.shirts.service.ShirtService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/shirts")
public class ShirtController {

  private final ShirtService shirtService;

  public ShirtController(ShirtService shirtService) {
    this.shirtService = shirtService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ShirtResponse create(@Valid @RequestBody CreateShirtRequest req) {
    return toResponse(shirtService.create(req));
  }

  @GetMapping
  public List<ShirtResponse> list(
      @RequestParam(required = false) UUID teamId,
      @RequestParam(required = false) String season,
      @RequestParam(required = false) ShirtType type,
      @RequestParam(required = false) SleeveType sleeve,
      @RequestParam(required = false) AuthenticityType authenticity,
      @RequestParam(required = false) String brand
  ) {
    return shirtService.list(teamId, season, type, sleeve, authenticity, brand)
        .stream()
        .map(this::toResponse)
        .toList();
  }

  private ShirtResponse toResponse(Shirt shirt) {
    return new ShirtResponse(
        shirt.getId(),
        toTeamResponse(shirt.getTeam()),
        shirt.getSeason(),
        shirt.getType(),
        shirt.getSleeve(),
        shirt.getAuthenticity(),
        shirt.getBrand(),
        shirt.getNotes(),
        shirt.getCreatedAt()
    );
  }

  private TeamResponse toTeamResponse(Team team) {
    return new TeamResponse(
        team.getId(),
        team.getTeamType(),
        team.getAlias(),
        team.getFullName(),
        team.getCountry(),
        team.getCity(),
        team.getCreatedAt()
    );
  }
}