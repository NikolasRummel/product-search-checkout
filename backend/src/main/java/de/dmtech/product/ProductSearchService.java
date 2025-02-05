package de.dmtech.product;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ProductSearchService {

    private final RestTemplate restTemplate = new RestTemplate();

    public ProductSearchResponse searchProduct(String query) {
        String url = "https://product-search.services.dmtech.com/de/search?query=" + query + "&searchType=product&type=search";
        ResponseEntity<ProductSearchResponse> result = restTemplate.exchange(url, HttpMethod.GET, null, ProductSearchResponse.class);
        return result.getBody();
    }
}

