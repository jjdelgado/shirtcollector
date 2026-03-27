package com.secondskin.shirts.api.exceptions;

import java.util.UUID;

public class TeamNotFoundByIdException extends RuntimeException {
  public TeamNotFoundByIdException(UUID teamId) {
    super("Team not found: " + teamId);
  }
}