import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import cors from "cors";
import helmet from 'helmet'
require("./db");
import { Server } from "socket.io";
dotenv.config();
const app = express();
const port = 5000;
// const corsOptions = {
//   origin: 'http://127.0.0.1:5500'
// }
app.use(express.json());

app.use(cors());
app.use(helmet())

app.use("/api/auth", authRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const server=app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// const io = require('socket.io')(server, {cors: {origin: "*"}});
const io = new Server(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
  console.log('A user connected');

  const delay = Number(socket.handshake.query.delay) || 5000;
  setTimeout(() => {
    socket.emit('message', {image:"https://mms.businesswire.com/media/20220718005028/en/1513845/22/wysa_logo.jpg"});
  }, 0);
  setTimeout(() => {
    socket.emit('message', 'Hi There!');
  }, delay);
  setTimeout(() => {
    socket.emit('message', 'I am Wysa-an AI ChatBot Built by therapists!');
  }, 2*delay);
  setTimeout(() => {
    socket.emit('message', 'I am here to understand your concerns and connect you with the best resources available to support you!');
  }, 3*delay);
  setTimeout(() => {
    socket.emit('message', 'Can I help?');
  }, 4*delay);
  setTimeout(() => {
    socket.emit('message', 'true');
  }, 4*delay);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
