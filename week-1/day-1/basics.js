// Problem 1

let marks = 60;

switch (true) {
  case marks >= 90 && marks <= 100:
    console.log("Grade A");
    break;

  case marks >= 75 && marks <= 89:
    console.log("Grade B");
    break;

  case marks >= 60 && marks <= 74:
    console.log("Grade C");
    break;

  case marks >= 40 && marks <= 59:
    console.log("Grade D");
    break;

  default:
    console.log("Grade F");
}

// Problem 2
let year = 2000;

if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
  console.log(`${year} is a Leap Year`);
} else {
  console.log(`${year} is not a Leap Year`);
}

//Problem 3

for (let i = 0; i <= 20; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else if (i % 3 === 0) {
    console.log("FizzBuzz");
  } else {
    console.log(i);
  }
}

//Problem 4
let number = 17;
let isPrime = true;

for (let i = 2; i < number; i++) {
  if (number % i === 0) {
    isPrime = false;
    break;
  }
}
if (isPrime) {
  console.log("Prime Number");
} else {
  console.log("Not Prime");
}

// Problem 5
let text = "JavaScript";
let reversed = "";

for (let i = text.length - 1; i >= 0; i--) {
  reversed = reversed + text[i];
}
console.log(reversed);

//Problem 6
let text1 = "Javascript";
let count = 0;
let vowels = "";

for (let i = 0; i < text1.length; i++) {
  if (
    text1[i] === "a" ||
    text1[i] === "e" ||
    text1[i] === "i" ||
    text1[i] === "o" ||
    text1[i] === "u"
  ) {
    vowels += text1[i];
    count++;
  }
}

console.log(count);

//problem 7
let arr = [25, 78, 42];
let max = arr[0];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > max) {
    max = arr[i];
  }
}
console.log(max);

//Problem 8

let username = "Akash";
let password = "123456";

if (username === "Akash" && password === "123456") {
  console.log("Login successfull");
} else {
  console.log("Not Successfull");
}
