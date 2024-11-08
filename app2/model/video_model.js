import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
let videoSchema = mongoose.Schema(
    {
      videoFile:{
        type:String,
        required:true
      },
      thumbnail:{
        type:String,
        required:true
      },
      title:{
        type:String,
        required:true
      },
      description:{
        type:String,
        required:true
      },
      duration:{
        type:Number,
        default:0
      },
      isPublished:{
        type:Boolean,
        default:true
      },
      owner:{
        type:Schema.Types.ObjectId,
        ref:"USer"
      },
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

let videoModel =mongoose.model("video",videoSchema)

export default videoModel;