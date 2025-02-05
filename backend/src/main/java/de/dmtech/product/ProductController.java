package de.dmtech.product;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("products")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class ProductController {

    private final ProductSearchService productSearchService;

    @GetMapping
    public ResponseEntity<ProductSearchResponse> getSolutionById(@RequestParam String query) {
        ProductSearchResponse result = productSearchService.searchProduct(query);
        System.out.println(result);
        return ResponseEntity.ok(result);
    }
}
