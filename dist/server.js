"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
require("./db");
const socket_io_1 = require("socket.io");
dotenv.config();
const app = (0, express_1.default)();
const port = 5000;
// const corsOptions = {
//   origin: 'http://127.0.0.1:5500'
// }
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use("/api/auth", authRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// const io = require('socket.io')(server, {cors: {origin: "*"}});
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
io.on('connection', (socket) => {
    console.log('A user connected');
    const delay = Number(socket.handshake.query.delay) || 5000;
    setTimeout(() => {
        socket.emit('message', { image: "https://mms.businesswire.com/media/20220718005028/en/1513845/22/wysa_logo.jpg" });
    }, 0);
    setTimeout(() => {
        socket.emit('message', 'Hi There!');
    }, delay);
    setTimeout(() => {
        socket.emit('message', 'I am Wysa-an AI ChatBot Built by therapists!');
    }, 2 * delay);
    setTimeout(() => {
        socket.emit('message', 'I am here to understand your concerns and connect you with the best resources available to support you!');
    }, 3 * delay);
    setTimeout(() => {
        socket.emit('message', 'Can I help?');
    }, 4 * delay);
    setTimeout(() => {
        socket.emit('message', 'true');
    }, 4 * delay);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
