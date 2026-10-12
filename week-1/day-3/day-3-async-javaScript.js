//reduce()
const numbers = [10, 20, 30];

const result = numbers.reduce((sum, number) => {
  return sum + number;
}, 0);

console.log(result);

//find
const numbers1 = [10, 15, 25, 30];

const result1 = numbers.find((number) => {
  return number > 20;
});

console.log(result1);
const employees = [
  { name: "Akash", salary: 20000 },
  { name: "Rahul", salary: 30000 },
  { name: "John", salary: 40000 }
];

const result2 = employees.find((employee) => {
  return employee.salary > 25000;
});

console.log(result2);

//some
const employees1 = [
  { name: "Akash", salary: 20000 },
  { name: "Rahul", salary: 30000 }
];

const result3 = employees1.some((employee1) => {
  return employee1.salary > 25000;
});

console.log(result3);
//Async-syncronus

console.log("Start");

setTimeout(() => {
  console.log("A");
}, 0);

setTimeout(() => {
  console.log("B");
}, 1000);

console.log("C");

//Callbacks

function task1(callback) {
  console.log("Task 1");

  setTimeout(() => {
    console.log("Task 1 completed");
    callback();
  }, 1000);
}

function task2() {
  console.log("Task 2");
}

task1(task2);

function downloadData(callback) {
  console.log("Downloading....");
  setTimeout(() => {
    console.log("Downloading Completed");
    callback();
  }, 1000);
}
function showData() {
  console.log("Show Data");
}
downloadData(showData);

//Promises
const dataPromise = new Promise((resolve, reject) => {
  resolve("Data received");
});

dataPromise.then((result) => {
  console.log(result);
});

// Promise .then
Promise.resolve(10)
  .then((number) => {
    return number * 3;
  })
  .then((result) => {
    console.log(result);
  });

//Promise .catch
const errorPromise = new Promise((resolve, reject) => {
  reject("Something went wrong");
});

errorPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

Promise.resolve(10)
  .then((number) => {
    console.log(number);
    return number * 2;
  })
  .then(result);

const userPromise = Promise.resolve("User Loaded");
const orderPromise = Promise.reject("Orders Fails");

Promise.all([userPromise, orderPromise])
  .then((results) => {
    console.log("Success", results);
  })
  .catch((error) => {
    console.log("Error", error);
  });

Promise.allSettled([
  Promise.resolve(50),
  Promise.reject("Failed"),
  Promise.resolve(100)
]).then((result) => {
  console.log(result[0].value);
  console.log(result[1].reason);
  console.log(result[2].value);
});
