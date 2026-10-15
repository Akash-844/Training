// cosnt employee {
//     name:"Rahul",
//     employeeId:101,
//     department: "IT"
// }
// Throws Error becuase if we have another employee the names may be mistamtch to over come we use interfaces
interface Employee {
  name: string;
  employeeId: number;
  department: string;
}

//If we add any other properties it it wll throw error
const employee1: Employee = {
  name: "Akash",
  employeeId: 101,
  department: "IT"
  //sakary=20000 error becasue the propetie havent decalared in employee interface
};
console.log(employee1.name);

interface User {
  name: string;
  email: string;
  phone?: string;
  // Here We Are Using Optional ? without It if we create another object then it will show error
  //Add ? after phone to make it optional.
}

const User1: User = {
  name: "Akash",
  email: "Email@gmail.com",
  phone: "1234567890"
};

const User2: User = {
  name: "Sai",
  email: "Email2@gamil.com"
};

console.log(User1.email);
console.log(User2.name);

interface Employee1 {
  name: string;
  employeeId: number;
}

// Here It Inharits the properties from the employee1 object and usses in manager object
interface Manager extends Employee1 {
  teamSize: number;
}

const manager1: Manager = {
  name: "Priya",
  employeeId: 201,
  teamSize: 5
};
console.log(manager1.name, manager1.teamSize);

type Product = {
  productName: string;
  price: number;
  status: ProductStatus;
};

type ProductStatus = "Available" | "Out Of Stock";

const product1: Product = {
  productName: "Laptop",
  price: 50000,
  status: "Available"
};

console.log(product1.productName, product1.price, product1.status);

function formateUserId(userId: string | number) {
  if (typeof userId === "string") {
    return userId.toUpperCase();
  } else {
    return userId * 10;
  }
}

console.log(formateUserId("usr101"));
console.log(formateUserId(101));
