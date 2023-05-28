import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel  from "../models/User";
import { User } from "../dto/user.dto";

const generateToken = (user: User) => {
  const token = jwt.sign({ id: user }, "f1087ee5a7b3221d715f637a5fcc9bbbd1c8d14b2f0b61ea0fab7f05ff7c9f785e4337f6eb289db485f763657b35845a51a5b499204ad595e24871190e1acd6d", {
    expiresIn: "1h",
  });
  return token;
};

export const registerUser = async (
  username: string,
  password: string,
  photoUrl: string
) => {
  try {
    console.log("checking")
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      throw new Error("Username already exists");
    }
    console.log("checked")
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      password: hashedPassword,
      photoUrl: photoUrl||"",
    });
    console.log(newUser)
    await newUser.save();

    const token = generateToken(newUser);
    return { token };
  } catch (error) {
    console.log(error)
    throw new Error("Error occurred while registering user");
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken(user);
    return token;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};