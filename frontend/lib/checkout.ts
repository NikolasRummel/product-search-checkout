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

