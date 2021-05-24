const { Mongoose } = require("mongoose")

var mongoose =  require('mongoose');

const spotifySchema = mongoose.Schema({
    Name: {
        type:String,
        require: true,
        unique: true
    },
    Token: {
        type:String,
        require:true
    },
    date:{
      type:Date,
      default: Date.now
    }
})

module.exports = mongoose.model('Categories', spotifySchema);