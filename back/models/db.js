const mongoose = require('mongoose');
require('dotenv/config');
require('./product.model');

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    (err) => {
        if (!err) {console.log("MongoDB connection succeeded...")}
        else {console.log("Error in DB connection: ", err )}
});