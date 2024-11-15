import mongoose from "mongoose";

 const connectDb =async()=>{
try {
    mongoose.connect(`mongodb+srv://anmolgarg1077:VVSQk26yyeYcCaBY@cluster0.uqp1v.mongodb.net/anmol`)
    console.log("Db connect successfully");
    
} catch (error) {
    console.log(" MongoDb connection Failed ",error);
    
}
}

export default connectDb;