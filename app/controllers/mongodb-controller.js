const url = require('../config/db.config')

let mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });

//var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
module.exports = mongoose
