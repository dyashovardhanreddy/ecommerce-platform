package com.projects.order_service.event;

import com.projects.order_service.dto.OrderResponse;
import com.projects.order_service.model.OrderStatus;
import java.time.LocalDateTime;

public record OrderStatusChangedEvent(
        Long orderId,
        String customerName,
        String productName,
        Integer quantity,
        OrderStatus previousStatus,
        OrderStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static OrderStatusChangedEvent from(OrderResponse order, OrderStatus previousStatus) {
        return new OrderStatusChangedEvent(
                order.id(),
                order.customerName(),
                order.productName(),
                order.quantity(),
                previousStatus,
                order.status(),
                order.createdAt(),
                order.updatedAt()
        );
    }
}
