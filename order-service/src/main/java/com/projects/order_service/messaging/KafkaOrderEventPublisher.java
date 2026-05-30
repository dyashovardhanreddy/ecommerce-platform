package com.projects.order_service.messaging;

import com.projects.order_service.event.OrderCreatedEvent;
import com.projects.order_service.event.OrderStatusChangedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaOrderEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${order.kafka.topic:orders}")
    private String ordersTopic;

    public void publishOrderCreatedEventAfterCommit(OrderCreatedEvent event) {
        publishAfterCommit(() -> sendOrderCreatedEvent(event));
        log.info("Scheduled order created event for order {} to publish after transaction commit", event.orderId());
    }

    public void publishOrderStatusChangedEventAfterCommit(OrderStatusChangedEvent event) {
        publishAfterCommit(() -> sendOrderStatusChangedEvent(event));
        log.info(
                "Scheduled status change event for order {} from {} to {} to publish after transaction commit",
                event.orderId(),
                event.previousStatus(),
                event.status()
        );
    }

    private void publishAfterCommit(Runnable publishAction) {
        if (!TransactionSynchronizationManager.isSynchronizationActive()) {
            publishAction.run();
            return;
        }

        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                publishAction.run();
            }
        });
    }

    private void sendOrderCreatedEvent(OrderCreatedEvent event) {
        kafkaTemplate.send(ordersTopic, event.orderId().toString(), event)
                .whenComplete((result, exception) -> {
                    if (exception != null) {
                        log.error("Failed to publish order {} to Kafka topic {}", event.orderId(), ordersTopic, exception);
                        return;
                    }

                    log.info(
                            "Published order created event for order {} to Kafka topic {} partition {} offset {}",
                            event.orderId(),
                            result.getRecordMetadata().topic(),
                            result.getRecordMetadata().partition(),
                            result.getRecordMetadata().offset()
                    );
                });
    }

    private void sendOrderStatusChangedEvent(OrderStatusChangedEvent event) {
        kafkaTemplate.send(ordersTopic, event.orderId().toString(), event)
                .whenComplete((result, exception) -> {
                    if (exception != null) {
                        log.error(
                                "Failed to publish status change for order {} to Kafka topic {}",
                                event.orderId(),
                                ordersTopic,
                                exception
                        );
                        return;
                    }

                    log.info(
                            "Published status change for order {} to Kafka topic {} partition {} offset {}",
                            event.orderId(),
                            result.getRecordMetadata().topic(),
                            result.getRecordMetadata().partition(),
                            result.getRecordMetadata().offset()
                    );
                });
    }
}
