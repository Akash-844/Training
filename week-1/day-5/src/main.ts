import { products, electronicProducts } from "./data/products.js";

import { getNumericPrice, getDiscountedPrice } from "./utils/price-utils.js";

console.log("=== Regular Products ===");

for (const product of products) {
  console.log(
    `${product.productName} | Price: ${getNumericPrice(product.price)} | Status: ${product.status}`
  );
}

console.log("\n=== Electronic Products ===");

for (const product of electronicProducts) {
  console.log(
    `${product.productName} | Price: ${getNumericPrice(product.price)} | Warranty: ${product.warrantyYears} years`
  );
}

console.log("\n=== Discounted Prices ===");

for (const product of products) {
  console.log(`${product.productName}: ${getDiscountedPrice(product.price)}`);
}
