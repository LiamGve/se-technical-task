package com.se.favourites;

import com.se.favourites.configuration.BootstrapConfiguration;
import com.se.favourites.configuration.RepositoryConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Import;

@Import({
		RepositoryConfiguration.class,
		BootstrapConfiguration.class
})
@SpringBootConfiguration
@EnableAutoConfiguration
public class FavouritesApplication {

	public static void main(String[] args) {
		SpringApplication.run(FavouritesApplication.class, args);
	}
}
