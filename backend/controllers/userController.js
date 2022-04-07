import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import User from "../models/userModel.js";

dotenv.config();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//@route POST
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(payload);

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

//@route PATCH
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, age } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Provided email is already used!");
  }

  const user = await User.create({
    name,
    email,
    password,
    age,
  });

  if (user) {
    const token = generateToken({ user });

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      age: user.age,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@route DELETE
const deleteUser = asyncHandler(async (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
  }

  const decoded = jwt_decode(token.replace("Bearer ", ""));

  const user = await User.findById(decoded.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: {
      message: `User with id ${decoded.id} was deleted successfully`,
    },
  });
});

//@route PUT
const editUser = asyncHandler(async (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
  }

  const decoded = jwt_decode(token.replace("Bearer ", ""));

  const user = await User.findById(decoded.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { name, email, password, age } = req.body;

  user.name = name ? name : user.name;
  user.email = email ? email : user.email;
  user.password = password ? password : user.password;
  user.age = age ? age : user.age;

  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

export { authUser, registerUser, deleteUser, editUser };
