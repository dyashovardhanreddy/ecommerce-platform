package com.projects.order_service.service;

import com.projects.order_service.dto.CreateOrderRequest;
import com.projects.order_service.dto.OrderResponse;
import com.projects.order_service.dto.UpdateOrderStatusRequest;
import java.util.List;

public interface OrderService {

    OrderResponse createOrder(CreateOrderRequest request);

    OrderResponse getOrderById(Long id);

    List<OrderResponse> getAllOrders();

    OrderResponse updateOrderStatus(Long id, UpdateOrderStatusRequest request);
}
