import mongoose from "mongoose"

const dailyCasesSchema = mongoose.Schema({
    location: {type: String},
    date: {type: Date},
    variant: {type: String},
    num_sequences: {type: Number},
    perc_sequences: {type: Number},
    num_sequences_total: {type: Number},

})


export default mongoose.model('Cases', dailyCasesSchema);
