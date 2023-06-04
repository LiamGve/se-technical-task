package com.se.favourites.repository.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "favourites")
@IdClass(FavouriteId.class)
public class FavouriteEntity {

    @Id
    private String userId;

    @Id
    private String saleId;

    @CreationTimestamp // TODO should be auto created at DB level not app level
    private LocalDateTime createdDate;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSaleId() {
        return saleId;
    }

    public void setSaleId(String saleId) {
        this.saleId = saleId;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public static class Builder {

        private final FavouriteEntity entity;

        private Builder() {
            entity = new FavouriteEntity();
        }

        public static Builder createEntity() {
            return new Builder();
        }

        public Builder withSaleId(String saleId) {
            entity.setSaleId(saleId);
            return this;
        }

        public Builder withUserId(String userId) {
            entity.setUserId(userId);
            return this;
        }

        public Builder and() {
            return this; // readability scaffolding
        }

        public FavouriteEntity build() {
            return entity;
        }
    }
}
