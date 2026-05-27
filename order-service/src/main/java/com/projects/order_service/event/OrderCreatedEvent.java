package com.projects.order_service.event;

import com.projects.order_service.dto.OrderResponse;
import com.projects.order_service.model.OrderStatus;
import java.time.LocalDateTime;

public record OrderCreatedEvent(
        Long orderId,
        String customerName,
        String productName,
        Integer quantity,
        OrderStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static OrderCreatedEvent from(OrderResponse order) {
        return new OrderCreatedEvent(
                order.id(),
                order.customerName(),
                order.productName(),
                order.quantity(),
                order.status(),
                order.createdAt(),
                order.updatedAt()
        );
    }
}
