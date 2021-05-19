const mongoose = require('mongoose')
const mongoDbUrl = require('../config/mongodb.config.js')

mongoose.connect(mongoDbUrl.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
})