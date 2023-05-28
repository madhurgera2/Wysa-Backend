"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect('mongodb+srv://madhurgera2:EODnsgJUE3UA6wOO@cluster0.ajjzvs1.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log('Connection successful');
})
    .catch((error) => {
    console.log('Connection error:', error);
});
mongoose_1.default.connection;
