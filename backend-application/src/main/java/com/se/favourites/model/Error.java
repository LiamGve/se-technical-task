package com.se.favourites.model;

public record Error(String error,
                    String timestamp,
                    String path,
                    String traceId) {
}
