import mongoose from "mongoose";
import * as dotenv from "dotenv"
dotenv.config();
const API_KEY = process.env.API_KEY;

const connectDb = () => {
    mongoose.connect(API_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((conn) => {
            console.log("Database connection is successfull")
            console.log(`Host name ${conn.connection.host}`)
        })
        .catch((err) => {
            console.log("Database connection is failed");
            console.log(`DB connection error : ${err}`);
            process.exit(1);
        })
}

export default connectDb;




