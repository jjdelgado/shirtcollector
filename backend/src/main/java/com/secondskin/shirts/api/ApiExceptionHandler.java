package com.secondskin.shirts.api;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.secondskin.shirts.api.exceptions.DuplicateShirtException;
import com.secondskin.shirts.api.exceptions.TeamNotFoundByIdException;
import com.secondskin.shirts.api.exceptions.TeamNotFoundException;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> badRequest(IllegalArgumentException ex) {
        return Map.of("error", "bad_request", "message", ex.getMessage());
    }

    @ExceptionHandler(TeamNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> notFound(TeamNotFoundException ex) {
        return Map.of("error", "not_found", "message", ex.getMessage());
    }

    @ExceptionHandler(TeamNotFoundByIdException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> teamNotFoundById(TeamNotFoundByIdException ex) {
        return Map.of(
                "error", "not_found",
                "message", ex.getMessage());
    }

    @ExceptionHandler(DuplicateShirtException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, Object> duplicateShirt(DuplicateShirtException ex) {
        return Map.of(
                "error", "conflict",
                "message", ex.getMessage());
    }
}
