package de.dmtech.shoppingcard;

import de.dmtech.product.ProductInformation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("checkout")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class ProductCheckoutController {

    @Autowired
    private final ProductCheckoutService productCheckoutService;

    @GetMapping
    public ResponseEntity<ProductCheckoutBill> createBill() {
        ProductCheckoutBill result = productCheckoutService.checkoutInformationList();

        System.out.println(result);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public void addProductToShoppingCart(@RequestBody ProductInformation information) {
        productCheckoutService.add(information);
    }

    @DeleteMapping
    public void deleteProductFromShoppingCart(@RequestParam String dan) {
        System.out.println("removed product from the shopping cart: " + dan);
        productCheckoutService.remove(dan);
    }
}
