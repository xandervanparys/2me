import mongoose from "mongoose";
import UserModel from "./src/models/User";
import LetterModel from "./src/models/Letter";
require('dotenv').config();

const mongoURI = process.env.DATABASE || "empty string";

async function main() {
    try {
        console.log("connecting to db");
        await mongoose.connect(mongoURI);
        console.log("connected to db");

        await UserModel.deleteMany({});
        await LetterModel.deleteMany({});
        console.log("database cleared");
    } catch (error){
        console.error("Error: ", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from Database");
    }
}

main();