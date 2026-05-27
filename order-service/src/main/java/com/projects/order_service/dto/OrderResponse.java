package com.projects.order_service.dto;

import com.projects.order_service.model.OrderStatus;
import java.time.LocalDateTime;

public record OrderResponse(
        Long id,
        String customerName,
        String productName,
        Integer quantity,
        OrderStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
