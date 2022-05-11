import express from "express"
import getDailyCases from "../controllers/apiControllers.js";



const router = express.Router();


router.route("/").get(getDailyCases);
// router.route("/cases/:date/count").get(getAllByDay);
// router.route("/cases/:date/cumulative").get(getAllBySum);
// router.route("/dates").get(getAvailableDates);

export default router