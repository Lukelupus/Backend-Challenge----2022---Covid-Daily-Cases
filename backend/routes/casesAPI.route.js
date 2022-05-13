import express from "express"
import getDailyCases, { getDates, getCount, getCumulative } from "../controllers/apiControllers.js";



const router = express.Router();


router.route("/").get(getDailyCases);
router.route("/cases/:date/count").get(getCount);
router.route("/cases/:date/cumulative").get(getCumulative);
router.route("/dates").get(getDates);

export default router