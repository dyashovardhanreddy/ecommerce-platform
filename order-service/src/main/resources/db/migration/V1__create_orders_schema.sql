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

SET @idx_orders_status_exists = (
    SELECT COUNT(1)
    FROM information_schema.statistics
    WHERE table_schema = '${order_schema}'
        AND table_name = 'orders'
        AND index_name = 'idx_orders_status'
);

SET @idx_orders_status_sql = IF(
    @idx_orders_status_exists = 0,
    'CREATE INDEX `idx_orders_status` ON `${order_schema}`.`orders` (`status`)',
    'SELECT 1'
);

PREPARE idx_orders_status_stmt FROM @idx_orders_status_sql;
EXECUTE idx_orders_status_stmt;
DEALLOCATE PREPARE idx_orders_status_stmt;

SET @idx_orders_customer_name_exists = (
    SELECT COUNT(1)
    FROM information_schema.statistics
    WHERE table_schema = '${order_schema}'
        AND table_name = 'orders'
        AND index_name = 'idx_orders_customer_name'
);

SET @idx_orders_customer_name_sql = IF(
    @idx_orders_customer_name_exists = 0,
    'CREATE INDEX `idx_orders_customer_name` ON `${order_schema}`.`orders` (`customer_name`)',
    'SELECT 1'
);

PREPARE idx_orders_customer_name_stmt FROM @idx_orders_customer_name_sql;
EXECUTE idx_orders_customer_name_stmt;
DEALLOCATE PREPARE idx_orders_customer_name_stmt;
