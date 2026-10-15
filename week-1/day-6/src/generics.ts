// function getValue<T>(value: T): T {
//   return value;
// }

// getValue<number>(100);
// getValue<string>("Homigo");

//Here we Decalerd two generics T,U which are types
class Pair<T, U> {
  private first: T;
  private second: U;

  constructor(first: T, second: U) {
    this.first = first;
    this.second = second;
  }
  getFirst(): T {
    return this.first;
  }
  getSecond(): U {
    return this.second;
  }
}

const numberPair = new Pair<number, string>(10, "Hello");

console.log(numberPair.getFirst());
console.log(numberPair.getSecond());

interface User {
  id: number;
  name: string;
  email: string;
}

interface Booking {
  id: number;
  name: string;
  email: string;
}

interface Products {
  id: number;
  name: string;
  description: string;
}

const users: User[] = [
  { id: 1, name: "Akash", email: "Akash@gmail.com" },
  { id: 2, name: "Kumar", email: "Kumar@gmail.com" }
];
const bookings: Booking[] = [
  {
    id: 1,
    name: "Bus-ticket",
    email: "bus@gmail.com"
  },
  {
    id: 2,
    name: "abhibus-ticket",
    email: "Abhibus@gmail.com"
  }
];
const products: Products[] = [
  {
    id: 1,
    name: "Camera",
    description: "Camera Is In 100Mega Pixel"
  }
];
function findById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((items) => items.id === id);
}

// function findById1<T extends { id: number }>(
//   e: T[],
//   id: number
// ): T | undefined {
//   return e.find((e) => e.id === id);
// }

function findByName<T extends { name: string }>(
  e: T[],
  name: string
): T | undefined {
  return e.find((e) => e.name === name);
}
const result = findById(users, 1);
const booking = findById(bookings, 2);
const product = findByName(products, "Camera");
console.log(result);
console.log(booking);
console.log(product);
