package com.projects.order_service.config;

import java.util.Arrays;

import org.flywaydb.core.api.MigrationState;
import org.flywaydb.core.api.exception.FlywayValidateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.flyway.autoconfigure.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlywayMigrationConfig {

    private static final Logger log = LoggerFactory.getLogger(FlywayMigrationConfig.class);

    @Bean
    FlywayMigrationStrategy repairFailedMigrationBeforeMigrate() {
        return flyway -> {
            boolean hasFailedMigration = Arrays.stream(flyway.info().all())
                    .anyMatch(migration -> migration.getState() == MigrationState.FAILED);

            if (hasFailedMigration) {
                log.warn("Detected failed Flyway migration metadata. Running Flyway repair before migrate.");
                flyway.repair();
            }

            try {
                flyway.migrate();
            } catch (FlywayValidateException exception) {
                log.warn("Flyway validation failed. Running repair once before retrying migration.", exception);
                flyway.repair();
                flyway.migrate();
            }
        };
    }
}
