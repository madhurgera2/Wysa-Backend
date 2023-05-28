import { Request, Response } from "express";
import * as AuthService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, photoUrl } = req.body;
    console.log("hdfmsjcgxjkdvhcxfd")
    const newUser = await AuthService.registerUser(
      username,
      password,
      photoUrl
    );
    console.log("fjdkgslxkjs")
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error occurred while registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await AuthService.loginUser(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: "Invalid username or password" });
  }
};
