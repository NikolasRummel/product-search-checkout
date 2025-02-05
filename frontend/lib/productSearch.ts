export interface ProductPrice {
    formattedValue: string;
}

export interface ProductInformation {
    gtin: string;
    dan: string;
    name: string;
    brandName: string;
    price: ProductPrice;
    categoryNames: string[];
    imageUrlTemplates: string[];
    relativeProductUrl: string;
}

export interface ProductSearchResponse {
    products: ProductInformation[];
    count: number;
}

export const searchProduct = async (query: string): Promise<ProductSearchResponse> => {
    const url = `http://localhost:8080/products?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};
