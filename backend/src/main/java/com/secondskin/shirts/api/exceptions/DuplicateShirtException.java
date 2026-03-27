package com.secondskin.shirts.api.exceptions;

public class DuplicateShirtException extends RuntimeException {
  public DuplicateShirtException() {
    super("Shirt already exists with the same team, season, type, sleeve, authenticity and brand.");
  }
}