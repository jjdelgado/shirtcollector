package com.secondskin.shirts.service;

import com.secondskin.shirts.api.exceptions.DuplicateShirtException;
import com.secondskin.shirts.api.exceptions.TeamNotFoundByIdException;
import com.secondskin.shirts.api.dto.CreateShirtRequest;
import com.secondskin.shirts.domain.AuthenticityType;
import com.secondskin.shirts.domain.Shirt;
import com.secondskin.shirts.domain.ShirtType;
import com.secondskin.shirts.domain.SleeveType;
import com.secondskin.shirts.domain.Team;
import com.secondskin.shirts.repository.ShirtRepository;
import com.secondskin.shirts.repository.ShirtSpecifications;
import com.secondskin.shirts.repository.TeamRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ShirtService {

  private final ShirtRepository shirtRepository;
  private final TeamRepository teamRepository;

  @PersistenceContext
  private EntityManager entityManager;

  public ShirtService(ShirtRepository shirtRepository, TeamRepository teamRepository) {
    this.shirtRepository = shirtRepository;
    this.teamRepository = teamRepository;
  }

  @Transactional
  public Shirt create(CreateShirtRequest req) {
    Team team = teamRepository.findById(req.teamId())
        .orElseThrow(() -> new TeamNotFoundByIdException(req.teamId()));

    Shirt shirt = new Shirt(
        team,
        req.season().trim(),
        req.type(),
        req.sleeve(),
        req.authenticity(),
        req.brand().trim()
    );

    shirt.setNotes(blankToNull(req.notes()));

    try {
      return shirtRepository.saveAndFlush(shirt);
    } catch (DataIntegrityViolationException ex) {
      throw new DuplicateShirtException();
    }
  }

  public List<Shirt> list(
      UUID teamId,
      String season,
      ShirtType type,
      SleeveType sleeve,
      AuthenticityType authenticity,
      String brand
  ) {
    Specification<Shirt> spec = Specification
        .where(ShirtSpecifications.hasTeamId(teamId))
        .and(ShirtSpecifications.hasSeason(season))
        .and(ShirtSpecifications.hasType(type))
        .and(ShirtSpecifications.hasSleeve(sleeve))
        .and(ShirtSpecifications.hasAuthenticity(authenticity))
        .and(ShirtSpecifications.hasBrand(brand));

    return shirtRepository.findAll(spec);
  }

  private static String blankToNull(String value) {
    if (value == null) {
      return null;
    }
    String trimmed = value.trim();
    return trimmed.isEmpty() ? null : trimmed;
  }
}