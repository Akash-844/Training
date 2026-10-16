// A product price can be a number or a string.
export type ProductPrice = number | string;

export type ProductStatus = "Available" | "Out of Stock" | "Discontinued";

//This is the interface it is the strutuer of the object
export interface ProductDetails {
  productName: string;
  price: ProductPrice;
  status: ProductStatus;
  description?: string;
}
//Here We have Used extends to use data in productdetails and add more data in eletronicproducts
export interface ElectronicProduct extends ProductDetails {
  warrantyYears: number;
}
