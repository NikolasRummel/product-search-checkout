package de.dmtech.shoppingcard;

import lombok.Data;

import java.util.List;

@Data
public class ProductCheckoutBill {
    private List<ProductCheckoutInformation> productCheckoutInformationList;
    private double sum;

    public ProductCheckoutBill(List<ProductCheckoutInformation> productCheckoutInformationList) {
        this.productCheckoutInformationList = productCheckoutInformationList;
        this.sum = 0;

        this.createBill();
    }

    private void createBill() {
        for (ProductCheckoutInformation productCheckoutInformation : productCheckoutInformationList) {
            sum += productCheckoutInformation.getPrice();
        }
    }
}
