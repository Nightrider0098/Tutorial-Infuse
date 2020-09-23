const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5400;
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Public')));

const Router = require('./app/routes/tutorial.routes')

app.use("/",Router);


app.listen(port, () => {
    console.log("listening to Signal on port "+port)
})