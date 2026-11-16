export interface DummyUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const dummyUsers: DummyUser[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    password: "admin123"
  },
  {
    id: "2",
    name: "Sai Akash",
    email: "akash@example.com",
    password: "akash123"
  },
  {
    id: "3",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123"
  }
];
