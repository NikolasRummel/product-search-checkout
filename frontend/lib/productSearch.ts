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

