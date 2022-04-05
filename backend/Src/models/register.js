const mongoose = require("mongoose");

const formate = new mongoose.Schema({
  FirstName : {
      type   :String,
     required : true
    },
  LastName : String,
  Email : {
      type: String,
      require : true,
      unique : true
  },
  Age: Number,
  Department: String,
  gender : String, 
 password: String,

  


})

const Classroom = new mongoose.model("students",formate)


module.exports = Classroom;