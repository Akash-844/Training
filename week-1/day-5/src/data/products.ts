import type { ProductDetails, ElectronicProduct } from "../types/types.js";

export const products: ProductDetails[] = [
  {
    productName: "Mouse",
    price: 800,
    status: "Available",
    description: "Wireless Mouse"
  },
  {
    productName: "Keyboard",
    price: "1500",
    status: "Out of Stock"
  },
  {
    productName: "Headphones",
    price: 2500,
    status: "Available",
    description: "Wireless Bluetooth Headphones"
  },
  {
    productName: "Webcam",
    price: "3200",
    status: "Discontinued",
    description: "HD Webcam"
  },
  {
    productName: "USB Hub",
    price: 1200,
    status: "Available",
    description: "4-Port USB Hub"
  }
];
export const electronicProducts: ElectronicProduct[] = [
  {
    productName: "Laptop",
    price: 50000,
    status: "Available",
    description: "15-inch laptop with 16GB RAM",
    warrantyYears: 2
  },
  {
    productName: "Monitor",
    price: "12000",
    status: "Available",
    description: "24-inch Full HD monitor",
    warrantyYears: 3
  },
  {
    productName: "Smartphone",
    price: 25000,
    status: "Out of Stock",
    description: "5G smartphone with 128GB storage",
    warrantyYears: 1
  },
  {
    productName: "Printer",
    price: "8500",
    status: "Available",
    description: "Wireless all-in-one printer",
    warrantyYears: 2
  },
  {
    productName: "Smart TV",
    price: 35000,
    status: "Discontinued",
    description: "43-inch 4K Smart LED TV",
    warrantyYears: 3
  }
];
