const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/School",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
  //  useCreateIndex : true
} ).then (()=>{
    console.log("Connection sccessful")
}).catch ((e)=>{
    console.log(e, "can not Connected")
})