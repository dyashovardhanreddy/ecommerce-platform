package com.projects.notification_service.event;

import java.time.LocalDateTime;

public record OrderCreatedEvent(
        Long orderId,
        String customerName,
        String productName,
        Integer quantity,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
