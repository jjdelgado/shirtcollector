package com.secondskin.shirts.repository;

import com.secondskin.shirts.domain.AuthenticityType;
import com.secondskin.shirts.domain.Shirt;
import com.secondskin.shirts.domain.ShirtType;
import com.secondskin.shirts.domain.SleeveType;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public final class ShirtSpecifications {

  private ShirtSpecifications() {
  }

  public static Specification<Shirt> hasTeamId(UUID teamId) {
    return (root, query, cb) ->
        teamId == null ? null : cb.equal(root.get("team").get("id"), teamId);
  }

  public static Specification<Shirt> hasSeason(String season) {
    return (root, query, cb) ->
        season == null || season.isBlank() ? null : cb.equal(root.get("season"), season.trim());
  }

  public static Specification<Shirt> hasType(ShirtType type) {
    return (root, query, cb) ->
        type == null ? null : cb.equal(root.get("type"), type);
  }

  public static Specification<Shirt> hasSleeve(SleeveType sleeve) {
    return (root, query, cb) ->
        sleeve == null ? null : cb.equal(root.get("sleeve"), sleeve);
  }

  public static Specification<Shirt> hasAuthenticity(AuthenticityType authenticity) {
    return (root, query, cb) ->
        authenticity == null ? null : cb.equal(root.get("authenticity"), authenticity);
  }

  public static Specification<Shirt> hasBrand(String brand) {
    return (root, query, cb) ->
        brand == null || brand.isBlank()
            ? null
            : cb.equal(cb.lower(root.get("brand")), brand.trim().toLowerCase());
  }
}