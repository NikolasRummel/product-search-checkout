package de.dmtech.shoppingcard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCheckoutInformation {

    private int count;
    private String productName;
    private String dan;
    private double price;
}
