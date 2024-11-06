import mongoose from "mongoose";

// let connectdb =process.env.DB-URL
export let connectDb = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://anmolgarg1077:VVSQk26yyeYcCaBY@cluster0.uqp1v.mongodb.net/myNew')
        console.log("DB connected");
        
    } catch (error) {
        console.log("DB error:",error)
    }
}

