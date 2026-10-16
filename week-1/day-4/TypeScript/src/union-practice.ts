let userId: string | number;

userId = 101;
userId = "User101";
// userId = true; //throws error because for this type we have only decalred string and numbeer boolean can not be accepted
console.log(userId);

type UserId = string | number;

function printuserId(userId: UserId) {
  console.log(userId);
}
printuserId(102);
printuserId("User102");

// For literal types we can use only the exact values specifyed.
type OrderStatus = "Pending" | "Shipped" | "Delivered";

function trackOrder(status: OrderStatus) {
  console.log(status);
}
trackOrder("Delivered");
trackOrder("Shipped");
trackOrder("Pending");

type PriceInput = number | string;

function calculateDiscountedPrice(price: PriceInput): void {
  let numericPrice: number;

  if (typeof price === "string") {
    numericPrice = Number(price);
  } else {
    numericPrice = price;
  }

  const discountedPrice = numericPrice - numericPrice * 0.1;

  console.log(discountedPrice);
}

calculateDiscountedPrice(100);
calculateDiscountedPrice("200");
