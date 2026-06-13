package com.projects.product_service.service;

import com.projects.product_service.dto.CreateProductRequest;
import com.projects.product_service.dto.ProductResponse;
import java.util.List;

public interface ProductService {

    ProductResponse createProduct(CreateProductRequest request);

    List<ProductResponse> getProducts();

    ProductResponse getProductById(Long id);

    List<ProductResponse> getProductByCategory(String category);

    List<ProductResponse> getProductsByKeyword(String keyword);
}
