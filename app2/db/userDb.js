import mongoose from "mongoose";

// let connectdb =process.env.DB-URL
 let connectDb = async ()=>{
    try {
        console.log("Db");
      const connectionInstance= 
       await mongoose.connect(`mongodb+srv://anmolgarg1077:VVSQk26yyeYcCaBY@cluster0.uqp1v.mongodb.net/abc`)
        console.log("DB connected");
        console.log(connectionInstance.connection.host);
        
        
    } catch (error) {
        console.log("DB error:",error)
    }
}
export default connectDb;



//  export let connectdbdb = async ()=>{
//     try {
//         await mongoose.connect("")
//         console.log("db connected successfully");
        
//     } catch (error) {
//         console.log(error);
        
//     }
// }