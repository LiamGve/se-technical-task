package com.se.favourites.repository.entity;

import java.io.Serializable;

public class FavouriteId implements Serializable {
    private String userId;
    private String saleId;

    public FavouriteId(String userId, String saleId) {
        this.userId = userId;
        this.saleId = saleId;
    }

    public FavouriteId() {
    }
}
