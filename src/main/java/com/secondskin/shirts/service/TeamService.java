package com.secondskin.shirts.service;

import com.secondskin.shirts.api.dto.CreateTeamRequest;
import com.secondskin.shirts.domain.Team;
import com.secondskin.shirts.domain.TeamType;
import com.secondskin.shirts.repository.TeamRepository;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TeamService {
    
    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Transactional
    public Team create(CreateTeamRequest req) {
        String alias = req.alias().trim();

        if(teamRepository.existsByAlias(alias)) {
            throw new IllegalArgumentException("Team alias already exists: " + alias);
        }

        String city = req.teamType() == TeamType.NATION ? null : blankToNull(req.city());

        Team team = new Team(req.teamType(), alias, req.fullName(), req.country(), city);

        return teamRepository.save(team);
    }

    public List<Team> list(TeamType teamType, String country) {
        
        if (teamType != null && country != null) {
            return teamRepository.findByTeamTypeAndCountryIgnoreCase(teamType, country);
        }

        if (teamType != null) {
            return teamRepository.findByTeamType(teamType);
        }

        if (country != null) {
            return teamRepository.findByCountryIgnoreCase(country);
        }

        return teamRepository.findAll();
    }

    private static String blankToNull(String s) {
        if (s == null) return null;
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }
}
