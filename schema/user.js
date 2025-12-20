const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    name:{
        type:String,
        required: true
    },
    college:{
        type:String,
        required: true
    },
    branch:{
        type:String,
        required: true
    },
    year:{
        type:String,
        required: true
    },
    rollno:{
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
    },
    eventsRegistered:[{type:Schema.Types.ObjectId, ref:'Event'}]

},
{ timestamps: true });
let User= mongoose.model('User', userSchema);
module.exports = User;