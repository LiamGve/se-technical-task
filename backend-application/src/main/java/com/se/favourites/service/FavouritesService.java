package com.se.favourites.service;

import com.se.favourites.exceptions.NotFoundException;
import com.se.favourites.model.FavouriteRequest;
import com.se.favourites.repository.FavouritesRepository;
import com.se.favourites.repository.entity.FavouriteEntity;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.lang.Nullable;

import java.util.List;

import static com.se.favourites.repository.entity.FavouriteEntity.Builder.createEntity;
import static java.util.Objects.isNull;
import static org.springframework.util.Assert.notNull;

public class FavouritesService {
    private static final Logger log = LoggerFactory.getLogger(FavouritesService.class);

    private static final String USER_ID_BAD_REQUEST_MESSAGE = "userId must be provided";
    private static final String SALE_ID_BAD_REQUEST_MESSAGE = "saleId must be provided";

    private final FavouritesRepository repository;

    public FavouritesService(FavouritesRepository repository) {
        this.repository = repository;
    }

    public FavouriteEntity createFavouriteMapping(final FavouriteRequest request) {
        notNull(request.userId(), USER_ID_BAD_REQUEST_MESSAGE);
        notNull(request.saleId(), SALE_ID_BAD_REQUEST_MESSAGE);
        log.debug("A favourite request is being made for userId={} and saleId={}", request.userId(), request.saleId());

        final FavouriteEntity entity = repository.saveAndFlush(createEntity()
                .withSaleId(request.saleId())
                .and()
                .withUserId(request.userId())
                .build());
        log.debug("A favourite entity has been saves successfully {}", entity.getUserId());
        return entity;
    }

    public List<FavouriteEntity> getFavourites(final String userId,
                                               @Nullable final Integer page,
                                               @Nullable final Integer count) throws NotFoundException {
        notNull(userId, USER_ID_BAD_REQUEST_MESSAGE);
        log.debug("A call to list a user's favourites for userId={} page={} count={}", userId, page, count);

        final List<FavouriteEntity> favouriteEntities;

        if (isNull(page) || isNull(count)) {
            log.warn("No pagination is applied so result may contain many favourites! userId={} page={} count={}", userId, page, count);
            favouriteEntities = repository.findAllByUserId(userId);
        } else {
            favouriteEntities = repository.findAllByUserId(userId, PageRequest.of(page, count));
        }

        if (favouriteEntities.isEmpty()) {
            throw new NotFoundException(userId);
        }

        return favouriteEntities;
    }

    @Transactional
    public void deleteFavourites(final String userId,
                                 @Nullable final String saleId) {
        notNull(userId, USER_ID_BAD_REQUEST_MESSAGE);
        log.debug("A call to delete a favourite has been made userId={} saleId={}", userId, saleId);

        if (isNull(saleId)) {
            log.warn("This request for userId={} will clear all favourites for this user", userId);
            repository.deleteAllByUserId(userId);
        } else {
            repository.deleteByUserIdAndSaleId(userId, saleId);
        }
    }
}
