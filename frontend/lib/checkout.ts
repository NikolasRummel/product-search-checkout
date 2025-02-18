import {ProductInformation} from "@/lib/productSearch";
import toast from "react-hot-toast";

export interface ProductCheckoutInformation {
    count: number,
    productName: string,
    dan: string
    price: number
}

export interface ProductCheckoutBill {
    productCheckoutInformationList: ProductCheckoutInformation[],
    sum: number
}

export const checkout = async (): Promise<ProductCheckoutBill> => {
    const url = `http://localhost:8080/checkout`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export const deleteProduct = async (dan: string): Promise<void> => {
    const url = `http://localhost:8080/checkout?dan=${dan}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete');
    }
};

export const addProductToCart = async (product: ProductInformation): Promise<void> =>{
    const url = `http://localhost:8080/checkout`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Failed to add product to cart');
    }
};
