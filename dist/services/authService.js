"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user }, "f1087ee5a7b3221d715f637a5fcc9bbbd1c8d14b2f0b61ea0fab7f05ff7c9f785e4337f6eb289db485f763657b35845a51a5b499204ad595e24871190e1acd6d", {
        expiresIn: "1h",
    });
    return token;
};
const registerUser = async (username, password, photoUrl) => {
    try {
        console.log("checking");
        const existingUser = await User_1.default.findOne({ username });
        if (existingUser) {
            throw new Error("Username already exists");
        }
        console.log("checked");
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            username,
            password: hashedPassword,
            photoUrl: photoUrl || "",
        });
        console.log(newUser);
        await newUser.save();
        const token = generateToken(newUser);
        return { token };
    }
    catch (error) {
        console.log(error);
        throw new Error("Error occurred while registering user");
    }
};
exports.registerUser = registerUser;
const loginUser = async (username, password) => {
    try {
        const user = await User_1.default.findOne({ username });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = generateToken(user);
        return token;
    }
    catch (error) {
        throw new Error("Invalid username or password");
    }
};
exports.loginUser = loginUser;
