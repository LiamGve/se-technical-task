package com.se.favourites.exceptions;

import static java.lang.String.format;

public class NotFoundException extends Exception {
    private final String userId;

    public NotFoundException(String userId) {
        super();
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    @Override
    public String getMessage() {
        return format("Could not find any matches for %s", userId);
    }
}
