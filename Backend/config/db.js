
const mongoose = require("mongoose")
require('dotenv').config()

mongoose.set('strictQuery',true)
const connecton = mongoose.connect(process.env.MongoURL)




const LoginSchma = mongoose.Schema({

email:{type:String,required:true},
password:{type:String,required:true}

})


const Ascendmodel = mongoose.model("ascendlogindata",LoginSchma)




const todoSchma = mongoose.Schema({
    listNo:{type:String},
    awards: [{
        award: String,
        year: Number,
        
      }],
    id:{type:Number}
})


const todomodel =mongoose.model("todoinfo",todoSchma)




module.exports = {
    connecton,
    Ascendmodel,
    todomodel
}