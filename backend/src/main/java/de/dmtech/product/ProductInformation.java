package de.dmtech.product;

import lombok.Data;

import java.util.List;

@Data
public class ProductInformation {

    private String gtin;
    private String dan;
    private String name;
    private String brandName;
    private ProductPrice price;
    private List<String> categoryNames;
    private List<String> imageUrlTemplates;
    private String relativeProductUrl;
}
