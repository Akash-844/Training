// Converts the price into a number if it is stored as a string
export function getNumericPrice(price) {
    return typeof price === "string" ? Number(price) : price;
}
const price = getNumericPrice(product.price);
const finalPrice = price * 1.18;
console.log(finalPrice);
export function getDiscountedPrice(price) {
    const numericPrice = getNumericPrice(price);
    return numericPrice * 0.9;
}
export function getDiscountedAmount(price) {
    const numericPrice = getNumericPrice(price);
    return numericPrice * 0.1;
}
export function getPriceWithGST(price) {
    const numericPrice = getNumericPrice(price);
    return numericPrice * 1.18;
}
//# sourceMappingURL=price-utils.js.map