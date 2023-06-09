import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from "./Routes/users.js"
import { recipesRouter } from "./Routes/recipes.js"
import * as dotenv from 'dotenv'
const app = express()
const port = 3000
import connectDb from "../config/dbconnects.js"

// const { connectDb } = require("../config/dbconnects.js");

connectDb();

const API_KEY = process.env.API_KEY;

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);


// mongoose.connect(API_KEY);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})