import express from "express"
import dotenv from "dotenv"
import DailyCases from "./routes/casesAPI.route.js"
import connectDB from "./config/db.js"



dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}))

const PORT = process.env.PORT || 9000


connectDB();

app.use("/api", DailyCases)


app.listen(PORT, () => {
    console.log("Port running on port " + PORT + "!")
})