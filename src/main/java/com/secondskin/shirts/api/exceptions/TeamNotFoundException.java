package com.secondskin.shirts.api.exceptions;

public class TeamNotFoundException extends RuntimeException {
    public TeamNotFoundException(String alias) {
        super("Team not found: " + alias);
    }
}
