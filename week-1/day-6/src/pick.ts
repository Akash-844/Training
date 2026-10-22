interface User {
  id: number;
  name: string;
  email: string;
}

type UserPreview = Pick<User, "name" | "email">;

const user: UserPreview = {
  name: "Akash",
  email: "akash@gmail.com"
};

console.log(user);
