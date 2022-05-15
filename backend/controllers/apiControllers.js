import asyncHandler from "express-async-handler"
import Cases from "../models/dailyCasesModel.js"




// Iitial route = GET /
// Access = public

const getDailyCases = asyncHandler(async (req, res) => {

    res.status(200).json({
        message: "Backend Challenge 2021 🏅 - Covid Daily Cases"
    })
})


//[GET]/cases/:date/count: numero de casos diários por variante
// Access = public



const getCount = asyncHandler(async (req, res) => {

    const cases = await Cases.aggregate(
        [{
                $match: {
                    date: req.params.date,
                }
            },
            {
                $group: {
                    _id: "$location",
                    count: {
                        $addToSet: {
                            variant: "$variant",
                            cases: "$num_sequences"
                        }
                    }
                }

            },
            {
                $sort: {
                    _id: +1,
                    count: +1
                }
            }
        ])

    if (cases.length === 0) {
        res.status(400)
        throw new Error("No case found at this date")
    }
    res.status(200).json(cases)
})

//[GET]/cases/:date/cumulative: numero de casos cumulativos
// Access = public

const getCumulative = asyncHandler(async (req, res) => {


    const cases = await Cases.aggregate([

        {
            $match: {
                date: {
                    $lte: req.params.date
                }

            }
        },
        {
            $group: {
                _id: {
                    location: "$location"
                },
                cumulativeCases: {
                    $count: {}
                },
                casesPerVariant: {
                    $addToSet: {
                        variant: "$variant",
                        cumulative: "$num_sequences"
                    }
                }


            }

        },
        {
            $sort: {
                _id: +1,
                Variants: +1
            }
        }
    ])

    if (cases.length === 0) {
        res.status(400)
        throw new Error("No case found at this date")
    }
    res.status(200).json(cases)
})

//[GET]/dates: datas disponíveis no dataset

const getDates = asyncHandler(async (req, res) => {

    const dates = await Cases.aggregate(
        [{

                $group: {

                    _id: "$date",

                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ])


    if (!dates) {
        res.status(400)
        throw new Error("Date not found")
    }
    res.status(200).json(dates)

})


export default getDailyCases
export {
    getCount,
    getDates,
    getCumulative
}