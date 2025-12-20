const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    image:{
        url:String,
        filename:String
    },
    lastDate: Date,
    price:{
        type:Number,
        required:true
    },
    prize:[{type:Number,required:true},{type:Number,required:true}],
    hostedBy:{type:Schema.Types.ObjectId, ref:'Host'},
    registeredParticipants:[{type:Schema.Types.ObjectId,ref:'User'}]
});
let Event= mongoose.model('Event', eventSchema);
module.exports=Event;