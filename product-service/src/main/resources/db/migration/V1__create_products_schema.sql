CREATE TABLE IF NOT EXISTS `${product_schema}`.`products` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `availability` BOOLEAN NOT NULL,
    CONSTRAINT `pk_products` PRIMARY KEY (`id`),
    CONSTRAINT `chk_products_price_positive` CHECK (`price` > 0)
);

CREATE INDEX `idx_products_category`
    ON `${product_schema}`.`products` (`category`);

CREATE INDEX `idx_products_name`
    ON `${product_schema}`.`products` (`name`);
