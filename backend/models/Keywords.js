const mongoose = require('mongoose');
const { Schema } = mongoose;

const KeywordsSchema = new Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
   },
   title:{
    type:String,
    required:true

   },
   description:{
    type:String,
    required:true
    

   },
   tag:{
    type:String
   },
   date:{
    type:Date,
    default:Date.now

   },
   videos: [{ type: String }],

  });
  module.exports=mongoose.model('Keywords',KeywordsSchema);  