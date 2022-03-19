import bcrypt from "bcrypt";

const users = [
  {
    name: "Sardor Alijanov",
    age: 22,
    email: "alijanov.sb@gmail.com",
    password: bcrypt.hashSync("12321", 10),
    role: "ADMIN",
  },
  {
    name: "Temp User1",
    age: 18,
    email: "temp.1@gmail.com",
    password: bcrypt.hashSync("12321", 10),
    role: "USER",
  },
  {
    name: "Temp User2",
    age: 32,
    email: "temp.2@gmail.com",
    password: bcrypt.hashSync("12321", 10),
    role: "USER",
  },
];

export default users;
