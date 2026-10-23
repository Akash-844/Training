export type ProductPrice = number | string;
export type ProductStatus = "Available" | "Out of Stock" | "Discontinued";
export interface ProductDetails {
    productName: string;
    price: ProductPrice;
    status: ProductStatus;
    description?: string;
}
export interface ElectronicProduct extends ProductDetails {
    warrantyYears: number;
}
//# sourceMappingURL=types.d.ts.map