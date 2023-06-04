package com.se.favourites.controller;

import com.se.favourites.exceptions.NotFoundException;
import com.se.favourites.model.FavouriteRequest;
import com.se.favourites.repository.entity.FavouriteEntity;
import com.se.favourites.service.FavouritesService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/favourites")
public class FavouritesControllerV1 {

    private final FavouritesService favouritesService;

    public FavouritesControllerV1(FavouritesService favouritesService) {
        this.favouritesService = favouritesService;
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public FavouriteEntity createFavouriteMapping(@RequestBody final FavouriteRequest request) {
        return favouritesService.createFavouriteMapping(request);
    }

    @GetMapping("/{userId}")
    @ResponseStatus(OK)
    public List<FavouriteEntity> retrieveFavourites(@PathVariable final String userId,
                                                    @RequestParam(required = false) final Integer page,
                                                    @RequestParam(required = false) final Integer count) throws NotFoundException {
        return favouritesService.getFavourites(userId, page, count);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(OK)
    public void deleteFavourites(@PathVariable final String userId,
                                 @RequestParam(required = false) final String saleId) {
        favouritesService.deleteFavourites(userId, saleId);
    }
}
