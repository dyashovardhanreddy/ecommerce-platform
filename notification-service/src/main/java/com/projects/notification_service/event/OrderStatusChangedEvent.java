package com.projects.notification_service.event;

import java.time.LocalDateTime;

public record OrderStatusChangedEvent(
        Long orderId,
        String customerName,
        String productName,
        Integer quantity,
        String previousStatus,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
