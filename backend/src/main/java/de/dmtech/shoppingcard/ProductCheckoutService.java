package de.dmtech.shoppingcard;

import de.dmtech.product.ProductInformation;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Data
public class ProductCheckoutService {

    private final HashMap<ProductInformation, Integer> productStore;

    public ProductCheckoutService() {
        this.productStore = new HashMap<>();
    }

    public void add(ProductInformation productInformation) {
        if (productStore.containsKey(productInformation)) {
            productStore.put(productInformation, productStore.get(productInformation) + 1);
        } else {
            productStore.put(productInformation, 1);
        }

        System.out.println(productInformation);
    }

    public void remove(String dan) {
        this.productStore
                .keySet()
                .stream()
                .filter(information -> information.getDan().equals(dan))
                .findFirst().
                ifPresent(information -> {
                    if (productStore.containsKey(information)) {
                        if (productStore.get(information) > 1) {
                            productStore.put(information, productStore.get(information) - 1);
                        } else {
                            productStore.remove(information);
                        }
                    } else {
                        throw new RuntimeException("Product not found");
                    }
                });
    }

    public ProductCheckoutBill checkoutInformationList() {
        final List<ProductCheckoutInformation> productCheckoutInformationList = new ArrayList<>();

        productStore.forEach((productInformation, count) -> {
            productCheckoutInformationList.add(new ProductCheckoutInformation(
                    count,
                    productInformation.getName(),
                    productInformation.getDan(),
                    count * Double.parseDouble(productInformation.getPrice().getFormattedValue().split(" ")[0].replace(",", "."))
            ));
        });

        return new ProductCheckoutBill(productCheckoutInformationList);
    }
}
