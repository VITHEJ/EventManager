const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hostSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    college:{
        type:String,
        required: true
    },
    
    phone:{
        type:String,
        required: true
    },
    email:{
       type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    }

}
,
{ timestamps: true })
let Host= mongoose.model('Host', hostSchema);
module.exports = Host;
