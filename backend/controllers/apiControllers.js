import asyncHandler from "express-async-handler"

const getDailyCases = asyncHandler (async (req, res) => {
    res.status(200).json({message: "Backend Challenge 2021 🏅 - Covid Daily Cases"})
})


export default getDailyCases
export {}