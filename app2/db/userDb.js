import mongoose from "mongoose";

// let connectdb =process.env.DB-URL
export let connectDb = async ()=>{
    try {
        console.log("Db");
        await mongoose.connect(`mongodb+srv://anmolgarg1077:VVSQk26yyeYcCaBY@cluster0.uqp1v.mongodb.net/`)
        console.log("DB connected");
        
    } catch (error) {
        console.log("DB error:",error)
    }
}

//  export let connectdbdb = async ()=>{
//     try {
//         await mongoose.connect("")
//         console.log("db connected successfully");
        
//     } catch (error) {
//         console.log(error);
        
//     }
// }