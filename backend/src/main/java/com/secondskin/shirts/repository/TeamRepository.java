package com.secondskin.shirts.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.secondskin.shirts.domain.Team;
import com.secondskin.shirts.domain.TeamType;

public interface TeamRepository extends JpaRepository<Team, UUID> {
    Optional<Team> findByAliasIgnoreCase(String alias);
    
    boolean existsByAlias(String alias);

    List<Team> findByTeamType(TeamType teamType);

    List<Team> findByCountryIgnoreCase(String country);

    List<Team> findByTeamTypeAndCountryIgnoreCase(TeamType teamType, String country);
}
