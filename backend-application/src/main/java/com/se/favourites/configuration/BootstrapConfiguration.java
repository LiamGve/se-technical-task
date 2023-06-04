package com.se.favourites.configuration;

import com.se.favourites.controller.FavouritesControllerAdvice;
import com.se.favourites.controller.FavouritesControllerV1;
import com.se.favourites.repository.FavouritesRepository;
import com.se.favourites.service.FavouritesService;
import io.micrometer.tracing.Tracer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BootstrapConfiguration {

    @Bean
    public FavouritesService favouritesService(final FavouritesRepository favouritesRepository) {
        return new FavouritesService(favouritesRepository);
    }

    @Bean
    public FavouritesControllerAdvice favouritesControllerAdvice(final Tracer tracer) {
        return new FavouritesControllerAdvice(tracer);
    }

    @Bean
    public FavouritesControllerV1 favouritesControllerV1(final FavouritesService favouritesService) {
        return new FavouritesControllerV1(favouritesService);
    }
}
