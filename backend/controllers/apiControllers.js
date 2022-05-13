import asyncHandler from "express-async-handler"
import Cases from "../models/dailyCasesModel.js"
import moment from 'moment';



// Iitial route = GET /
// Access = public

const getDailyCases = asyncHandler (async (req, res) => {
    
    res.status(200).json({message: "Backend Challenge 2021 🏅 - Covid Daily Cases"})
})


//[GET]/cases/:date/count: 
//Listar todos os registros da base de dados no dia selecionado, 
//agrupados por país e separados por variante.
// Acess = public


const getCount = asyncHandler(async (req, res) => {
        
        const cases = await Cases.aggregate(
         [{
              $match: {
                  date : req.params.date,
                }
          }, 
          {
              $group: {
                _id: {
                    location: "$location",
                     },
                count: {
                    $addToSet: {variant: "$variant", cases: "$num_sequences"}
                            }
                      }
                
          },
          {
              $sort:{
                  _id: +1,
                  variantes: +1
              }
          }
         ])

     if(cases.length === 0) {
         res.status(400)
         throw new Error("No case found at this date")
     }
    res.status(200).json(cases)
})

//[GET]/cases/:date/cumulative: Listar todos os registros da base de dados, 
//retornando a soma dos casos registrados de acordo com a data selecionada, 
// agrupados por país e separados por variante.

const getCumulative = asyncHandler(async (req, res) => {
        
    const cases = await Cases.aggregate(
     [{
          $match: {
              date : req.params.date
            }
      }, 
      {
          $group: {
            _id: {
                location: "$location"
                 },
            variantes: {
                $addToSet: "$variant"
                        },
            cumulative: {
                $sum:"$num_sequences_total"
                    }
                  }
            
      },
      {
          $sort:{
              _id: +1,
              variantes: +1
          }
      }
     ])

 if(cases.length === 0) {
     res.status(400)
     throw new Error("No case found at this date")
 }
res.status(200).json(cases)
})

//[GET]/dates: Listar as datas disponíveis no dataset

const getDates = asyncHandler(async (req, res) => {
    
    const dates = await Cases.aggregate(
        [
            {
            
                $group: {
                
                    _id: "$date",
                
                        }
            },
            {
                $sort: {
                    _id:-1
                    }
            }
        ])
    
  
    if(!dates) {
        res.status(400)
        throw new Error("Date not found")
    }
    res.status(200).json(dates)
    
})


export default getDailyCases
export { getCount, getDates, getCumulative }