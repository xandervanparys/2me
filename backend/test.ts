import mongoose from "mongoose";

import { UserDAO } from "./src/DAOs/userDAO";
import { LetterDAO } from "./src/DAOs/letterDAO";
import UserModel from "./src/models/User";
import LetterModel from "./src/models/Letter";

const mongoURI =
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";

mongoose
    .connect(mongoURI)
    .then(async () => {
        console.log("connected to db");

        // DAO instances
        const userDAO = new UserDAO();
        const letterDAO = new LetterDAO();

        // Sample users data
        const usersData = [
            {
                oauthId: "123456",
                oauthProvider: "google",
                email: "user1@example.com",
                username: "user1",
            },
            {
                oauthId: "789012",
                oauthProvider: "facebook",
                email: "user2@example.com",
                username: "user2",
            },
        ];

        // Sample letters data
        const lettersData = [
            {
                title: "Birthday Greetings",
                content: "Happy birthday! Have a fantastic day.",
                writtenAt: new Date("2023-06-29"),
                openAt: new Date("2023-06-30"),
            },
            {
                title: "Personal Reflections",
                content: "Thinking about life and future goals.",
                writtenAt: new Date("2023-07-01"),
                openAt: new Date("2023-07-02"),
            },
        ];

        // Create users
        const createdUsers = [];
        for (const userData of usersData) {
            try {
                const newUser = new UserModel({
                    ...userData,
                });
                const createdUser = await userDAO.create(newUser); // Await here
                createdUsers.push(createdUser);
            } catch (error) {
                console.error("Error creating user:", error);
            }
        }

        console.log("Users added:", createdUsers);

        // Create letters
        const createdLetters = [];
        for (const letterData of lettersData) {
            const user = createdUsers[
                Math.floor(Math.random() * createdUsers.length)
                ]; // Assign random user for demo
            const newLetter = new LetterModel({
                ...letterData,
                user: user._id, // Assign user ID to letter
            });
            try {
                const createdLetter = await letterDAO.create(newLetter);
                createdLetters.push(createdLetter);
            } catch (error) {
                console.error("Error creating letter:", error);
            }
        }

        console.log("Letters added:", createdLetters);
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    })
    .finally(() => {
        mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    });
