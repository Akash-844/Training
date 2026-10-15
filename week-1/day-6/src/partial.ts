interface User {
  id: number;
  name: string;
  email: string;
}

type UpdateUser = Partial<User>;

const user: UpdateUser = {
  name: "Akash"
};

interface Bookings {
  Id: number;
  Name: string;
  price: number;
}

function updateBooking(Id: number, updates: Partial<Bookings>): void {
  console.log("Booking ID:", Id);
  console.log("Update:", updates);
}

updateBooking(101, {
  price: 300
});

updateBooking(102, {
  Name: "Kumar"
});
