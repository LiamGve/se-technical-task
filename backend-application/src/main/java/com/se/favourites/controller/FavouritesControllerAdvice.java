package com.se.favourites.controller;

import com.se.favourites.exceptions.NotFoundException;
import com.se.favourites.model.Error;
import io.micrometer.tracing.Tracer;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import static java.time.Instant.now;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@ControllerAdvice
public class FavouritesControllerAdvice {
    private static final Logger log = LoggerFactory.getLogger(FavouritesControllerAdvice.class);

    private final Tracer tracer;

    public FavouritesControllerAdvice(Tracer tracer) {
        this.tracer = tracer;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<Error> badRequestHandling(IllegalArgumentException ex, HttpServletRequest request) {
        log.debug("A bad request was made to the service {}", ex.getMessage());
        return ResponseEntity
                .badRequest()
                .body(new Error(ex.getMessage(), now().toString(), request.getRequestURI(), tracer.currentSpan().context().traceId()));
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(NOT_FOUND)
    public ResponseEntity<Error> notFoundRequestHandling(NotFoundException ex, HttpServletRequest request) {
        log.debug("A not found exception has occurred {}", ex.getMessage());
        return ResponseEntity
                .status(NOT_FOUND)
                .body(new Error(ex.getMessage(), now().toString(), request.getRequestURI(), tracer.currentSpan().context().traceId()));
    }

    /**
     * This method is used to handle any non-accounted-for exceptions that might result in an ugly
     * (or dangerous) exception being given to the calling client. This way our app's errors are in
     * a consistent pattern and do not give away any of the internals about how our app works.
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public ResponseEntity<Error> genericErrorHandling(Exception ex, HttpServletRequest request) {
        String error = "An unexpected error has occurred.";
        log.error(error, ex);
        return ResponseEntity
                .internalServerError()
                .body(new Error(error, now().toString(), request.getRequestURI(), tracer.currentSpan().context().traceId()));
    }
}
