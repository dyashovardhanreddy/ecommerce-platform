CREATE SCHEMA IF NOT EXISTS `${order_schema}`;

CREATE TABLE IF NOT EXISTS `${order_schema}`.`orders` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `customer_name` VARCHAR(255) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `quantity` INT NOT NULL,
    `status` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(6) NOT NULL,
    `updated_at` DATETIME(6) NOT NULL,
    CONSTRAINT `pk_orders` PRIMARY KEY (`id`),
    CONSTRAINT `chk_orders_quantity_positive` CHECK (`quantity` >= 1),
    CONSTRAINT `chk_orders_status` CHECK (
        `status` IN ('CREATED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED')
    )
);

CREATE INDEX `idx_orders_status`
    ON `${order_schema}`.`orders` (`status`);

CREATE INDEX `idx_orders_customer_name`
    ON `${order_schema}`.`orders` (`customer_name`);
