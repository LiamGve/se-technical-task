package com.se.favourites.repository;

import com.se.favourites.repository.entity.FavouriteEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouritesRepository extends JpaRepository<FavouriteEntity, Long> {

    List<FavouriteEntity> findAllByUserId(String userId);

    List<FavouriteEntity> findAllByUserId(String userId, Pageable pagination);

    void deleteAllByUserId(String userId);

    void deleteByUserIdAndSaleId(String userId, String saleId);
}
