"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//If we add any other properties it it wll throw error
const employee1 = {
    name: "Akash",
    employeeId: 101,
    department: "IT"
    //salary=20000 error becasue the propetie havent decalared in employee interface
};
console.log(employee1.name);
const User1 = {
    name: "Akash",
    email: "Email@gmail.com",
    phone: "1234567890"
};
const User2 = {
    name: "Sai",
    email: "Email2@gamil.com"
};
console.log(User1.email);
console.log(User2.name);
const manager1 = {
    name: "Priya",
    employeeId: 201,
    teamSize: 5
};
console.log(manager1.name, manager1.teamSize);
const product1 = {
    productName: "Laptop",
    price: 50000,
    status: "Available"
};
console.log(product1.productName, product1.price, product1.status);
function formateUserId(userId) {
    if (typeof userId === "string") {
        return userId.toUpperCase();
    }
    else {
        return userId * 10;
    }
}
console.log(formateUserId("usr101"));
console.log(formateUserId(101));
//# sourceMappingURL=interface.js.map