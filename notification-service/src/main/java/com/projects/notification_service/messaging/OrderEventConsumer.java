package com.projects.notification_service.messaging;

import com.projects.notification_service.event.OrderCreatedEvent;
import com.projects.notification_service.event.OrderStatusChangedEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventConsumer {

    private final ObjectMapper objectMapper;

    @KafkaListener(
            topics = "${order.kafka.topic:orders}",
            groupId = "${spring.kafka.consumer.group-id:notification-service}"
    )
    public void consumeOrderEvent(@Payload String message) {
        try {
            JsonNode rootNode = objectMapper.readTree(message);
            if (rootNode.has("previousStatus")) {
                OrderStatusChangedEvent event = objectMapper.treeToValue(rootNode, OrderStatusChangedEvent.class);
                log.info("Received order status changed event from Kafka: {}", event);
                return;
            }

            OrderCreatedEvent event = objectMapper.treeToValue(rootNode, OrderCreatedEvent.class);
            log.info("Received order created event from Kafka: {}", event);
        } catch (JsonProcessingException exception) {
            log.error("Failed to parse order event from Kafka: {}", message, exception);
        }
    }
}
