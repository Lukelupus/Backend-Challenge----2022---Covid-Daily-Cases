import asyncHandler from "express-async-handler"
import Cases from "../models/dailyCasesModel.js"
import moment from 'moment';



// Iitial route = GET /
// Access = public

const getDailyCases = asyncHandler (async (req, res) => {
   
    res.status(200).json({message: "Backend Challenge 2021 🏅 - Covid Daily Cases"})
})


// Country route = /cases/:date/count
// Acess = public


const getCountryCases = asyncHandler(async (req, res) => {
    const cases = await Cases.find(req.params.date)
    res.status(200).json(cases)
})


const getAvailableDates = asyncHandler(async (req, res) => {
    const dates = await Cases.find({date: {$exists: true}}, {_id:0, location:0, variant:0, num_sequences:0, perc_sequences:0, num_sequences_total:0})
    const displayDates = moment(JSON.stringify(dates)).format()
    if(!dates) {
        res.status(400)
        throw new Error("Date not found")
    }
    res.status(200).json(displayDates)
})


export default getDailyCases
export { getCountryCases, getAvailableDates }