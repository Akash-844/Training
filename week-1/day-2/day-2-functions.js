//FUNCTIONS
const addNumbers = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
};
console.log(addNumbers(5, 10));

// ARROW FUNCTIONS

const addValues = (firstNumber, secondNumber) => firstNumber + secondNumber;
console.log(addValues(2, 5));

const calculateSquare = (number) => number * number;
console.log(calculateSquare(5));

const checkAdult = (age) => {
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
};

console.log(checkAdult(16));
console.log(checkAdult(20));

// FIND LARGEST NUMBER USING FUNCTIONS

const findLargestNumber = (numbers) => {
  let largestNumber = numbers[0];

  for (let index = 0; index < numbers.length; index++) {
    if (largestNumber < numbers[index]) {
      largestNumber = numbers[index];
    }
  }

  return largestNumber;
};

console.log(findLargestNumber([10, 25, 15]));

// DEFAULT PARAMETERS

const greetUser = (name = "Guest") => {
  console.log("Hello " + name);
};

greetUser();
greetUser("Akash");

const calculatePriceWithTax = (price, tax = 10) => {
  return price + tax;
};

console.log(calculatePriceWithTax(100));
console.log(calculatePriceWithTax(100, 20));

const createEmployeeDetails = (
  employeeName,
  employeeRole = "Developer",
  employeeSalary = 25000
) => {
  return `${employeeName}, ${employeeRole}, ${employeeSalary}`;
};

console.log(createEmployeeDetails("Akash"));
console.log(createEmployeeDetails("Rahul", "Tester", 30000));

// REST PARAMETERS

const countNumbers = (...numbers) => {
  return numbers.length;
};

console.log(countNumbers(10, 20, 30));
console.log(countNumbers(5, 10, 15, 20, 25));

const addAllNumbers = (...numbers) => {
  let total = 0;

  for (let index = 0; index < numbers.length; index++) {
    total += numbers[index];
  }

  return total;
};

console.log(addAllNumbers(10, 20, 30));
console.log(addAllNumbers(5, 10, 15, 20, 25));

// ARRAY DESTRUCTURING

const colorList = ["red", "blue", "green"];

const [firstColor, secondColor, thirdColor] = colorList;

console.log(firstColor);
console.log(secondColor);
console.log(thirdColor);

// OBJECT DESTRUCTURING

const employeeDetails = {
  name: "Akash",
  age: 24,
  role: "Developer"
};

const {
  name: employeeName,
  age: employeeAge,
  role: employeeRole
} = employeeDetails;

console.log(employeeName, employeeAge, employeeRole);

const testerDetails = {
  name: "Rahul",
  age: 28,
  role: "Tester",
  salary: 30000
};

const {
  name: testerName,
  role: testerRole,
  salary: testerSalary
} = testerDetails;

console.log(testerName, testerRole, testerSalary);

// NESTED DESTRUCTURING

const developerDetails = {
  name: "Akash",
  age: 24,
  job: {
    role: "Developer",
    salary: 30000
  }
};

const {
  name: developerName,
  job: { role: developerRole, salary: developerSalary }
} = developerDetails;

console.log(developerName, developerRole, developerSalary);

// SPREAD OPERATOR

const fruitList = ["Apple", "Banana", "Mango"];

const updatedFruitList = [...fruitList, "Orange"];

console.log(updatedFruitList);

const frontendTechnologies = ["HTML", "CSS", "JavaScript"];

const backendTechnologies = ["Node.js", "Express"];

const fullStackTechnologies = [...frontendTechnologies, ...backendTechnologies];

console.log(fullStackTechnologies);

// MAP

const numberList = [2, 4, 6, 8];

const multipliedNumbers = numberList.map((number) => {
  return number * 3;
});

console.log(numberList);
console.log(multipliedNumbers);

const employeeSalaryList = [
  { name: "Akash", salary: 20000 },
  { name: "Rahul", salary: 30000 },
  { name: "John", salary: 25000 }
];

const employeeNames = employeeSalaryList.map((employee) => {
  return employee.name;
});

console.log(employeeNames);

const employeesWithBonus = employeeSalaryList.map((employee) => {
  return {
    ...employee,
    bonus: employee.salary * 0.1
  };
});

console.log(employeesWithBonus);

// FILTER

const salaryNumbers = [10, 15, 20, 25, 30, 35];

const numbersGreaterThanTwenty = salaryNumbers.filter((number) => {
  return number > 20;
});

console.log(numbersGreaterThanTwenty);

//ASSIGNMENT-2

const employees = [
  {
    id: 1,
    name: "Rahul",
    department: "IT",
    salary: 60000,
    age: 25
  },
  {
    id: 2,
    name: "Priya",
    department: "HR",
    salary: 45000,
    age: 28
  },
  {
    id: 3,
    name: "Arjun",
    department: "Finance",
    salary: 70000,
    age: 30
  },
  {
    id: 4,
    name: "Sneha",
    department: "IT",
    salary: 80000,
    age: 27
  },
  {
    id: 5,
    name: "Kiran",
    department: "Sales",
    salary: 50000,
    age: 26
  },
  {
    id: 6,
    name: "Ananya",
    department: "Marketing",
    salary: 55000,
    age: 24
  },
  {
    id: 7,
    name: "Vikram",
    department: "IT",
    salary: 90000,
    age: 32
  },
  {
    id: 8,
    name: "Meena",
    department: "HR",
    salary: 52000,
    age: 29
  },
  {
    id: 9,
    name: "Rohit",
    department: "Finance",
    salary: 75000,
    age: 31
  },
  {
    id: 10,
    name: "Divya",
    department: "Sales",
    salary: 65000,
    age: 27
  }
];

// FIND EMPLOYEE BY NAME
const searchedEmployee = employees.find(
  //fin method will searches for employee named rahul first it will enter into employee object goes through every varibale
  // called name and it will find name called rahul
  (employee) => employee.name === "Rahul"
);
console.log(searchedEmployee);

// TOP 3 EARNERS
const topThreeEarners = [...employees]
  //here we are using spread operator because we get whole data of employee object
  .sort((firstEmployee, secondEmployee) => {
    //sort will arragne the order according to salary it will check current employee salary and previous emplyee by that we get data in sorted order
    return secondEmployee.salary - firstEmployee.salary;
  });

console.log(topThreeEarners);

// IT EMPLOYEES
const itEmployees = employees.filter(
  //here we use filter to get employee details which are matching stricly with department IT
  (employee) => employee.department === "IT"
);

console.log(itEmployees);

// TOTAL SALARY
const totalEmployeeSalary = employees.reduce((totalSalary, employee) => {
  return totalSalary + employee.salary;
}, 0);

// GROUP EMPLOYEES BY DEPARTMENT
const employeesByDepartment = employees.reduce((departmentGroups, employee) => {
  if (!departmentGroups[employee.department]) {
    departmentGroups[employee.department] = [];
  }

  departmentGroups[employee.department].push(employee);

  return departmentGroups;
}, {});

console.log(employeesByDepartment);

console.log(totalEmployeeSalary);
