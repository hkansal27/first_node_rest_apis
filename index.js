const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


const dbConfig = require("./config/database.config")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then(() => {
    console.log("Successfully connection")
}).catch(err => {
    console.log("Could not connect to the database")
    process.exit()
})

app.get("/", (req, res, next) => {
    res.json({ "message": "Successfully server created" })
})

require('./routes/note.routes.js')(app);

app.listen(3000, () => {
    console.log('Server started at Port- 3000')
})