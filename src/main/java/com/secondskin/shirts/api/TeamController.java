package com.secondskin.shirts.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.secondskin.shirts.api.dto.CreateTeamRequest;
import com.secondskin.shirts.api.dto.TeamResponse;
import com.secondskin.shirts.api.dto.UpdateTeamRequest;
import com.secondskin.shirts.domain.Team;
import com.secondskin.shirts.domain.TeamType;
import com.secondskin.shirts.service.TeamService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/teams")
public class TeamController {
    
    private final TeamService teamService;
    
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeamResponse create(@Valid @RequestBody CreateTeamRequest req) {
        Team created = teamService.create(req);
        return toResponse(created);
    }

    @GetMapping
    public List<TeamResponse> list(
        @RequestParam(required = false) TeamType teamType,
        @RequestParam(required = false) String country
    ) {
        return teamService.list(teamType, country).stream().map(this::toResponse).toList();
    }

    @GetMapping("/{alias}")
    public TeamResponse getByAlias(@PathVariable String alias){
        return toResponse(teamService.getByAlias(alias));
    }

    @PutMapping("/{alias}")
    public TeamResponse putMethodName(@PathVariable String alias, @RequestBody UpdateTeamRequest req) {
        return toResponse(teamService.updateByAlias(alias, req));
    }

    private TeamResponse toResponse(Team t) {
        return new TeamResponse(
            t.getId(),
            t.getTeamType(),
            t.getAlias(),
            t.getFullName(),
            t.getCountry(),
            t.getCity(),
            t.getCreatedAt()
        );
    }
}
