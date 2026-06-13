CREATE DATABASE IF NOT EXISTS `order_service`;
CREATE DATABASE IF NOT EXISTS `product_service`;

CREATE USER IF NOT EXISTS 'dev'@'%' IDENTIFIED BY 'Password@123';

GRANT ALL PRIVILEGES ON `order_service`.* TO 'dev'@'%';
GRANT ALL PRIVILEGES ON `product_service`.* TO 'dev'@'%';

FLUSH PRIVILEGES;
