import mongoose from "mongoose";
import { UserDAO } from "./src/DAOs/userDAO";
import { LetterDAO } from "./src/DAOs/letterDAO";
import UserModel from "./src/models/User";
import LetterModel from "./src/models/Letter";
require('dotenv').config();

const mongoURI = process.env.DATABASE || "empty string";

async function main() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to DB");

        // DAO instances
        const userDAO = new UserDAO();
        const letterDAO = new LetterDAO();

        // Clear the database
        await UserModel.deleteMany({});
        await LetterModel.deleteMany({});
        console.log("Database cleared");

        // Sample users data
        const usersData = [
            { oauthId: "123456", oauthProvider: "google", email: "user1@example.com", username: "user1" },
            { oauthId: "789012", oauthProvider: "facebook", email: "user2@example.com", username: "user2" },
        ];

        // Sample letters data
        const lettersData = [
            { title: "Birthday Greetings", content: "Happy birthday! Have a fantastic day.", writtenAt: new Date("2023-06-29"), openAt: new Date("2023-06-30") },
            { title: "Personal Reflections", content: "Thinking about life and future goals.", writtenAt: new Date("2023-07-01"), openAt: new Date("2023-07-02") },
        ];

        // Create users
        const createdUsers = await Promise.all(usersData.map(userData => userDAO.create(new UserModel(userData))));
        console.log("Users added:", createdUsers);

        // Create letters
        const createdLetters = await Promise.all(lettersData.map(letterData => {
            const user = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            const newLetter = new LetterModel({ ...letterData, user: user._id });
            return letterDAO.create(newLetter);
        }));
        console.log("Letters added:", createdLetters);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

main();
