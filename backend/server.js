import express from "express"
import dotenv from "dotenv"
import DailyCases from "./routes/casesAPI.route.js"
import connectDB from "./config/db.js"



dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}))

const port = process.env.PORT || 9000


connectDB();

app.use("/", DailyCases)


app.listen(port, () => {
    console.log(`Port running on port ${port}!`)
})