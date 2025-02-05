package de.dmtech.product;

import lombok.Data;

import java.util.List;

@Data
public class ProductSearchResponse {
    private List<ProductInformation> products;
    private int count;
}

