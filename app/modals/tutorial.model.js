const mongoose = require('mongoose')
const tableSchema = new mongoose.Schema({
   title:String,
   description:String,
   published:String,
   id:String
})

module.exports = tableSchema