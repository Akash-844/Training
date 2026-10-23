"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let userId;
userId = 101;
userId = "User101";
// userId = true; //throws error because for this type we have only decalred string and numbeer boolean can not be accepted
console.log(userId);
function printuserId(userId) {
    console.log(userId);
}
printuserId(102);
printuserId("User102");
function trackOrder(status) {
    console.log(status);
}
trackOrder("Delivered");
trackOrder("Shipped");
trackOrder("Pending");
function calculateDiscountedPrice(price) {
    let numericPrice;
    if (typeof price === "string") {
        numericPrice = Number(price);
    }
    else {
        numericPrice = price;
    }
    const discountedPrice = numericPrice - numericPrice * 0.1;
    console.log(discountedPrice);
}
calculateDiscountedPrice(100);
calculateDiscountedPrice("200");
//# sourceMappingURL=union-practice.js.map