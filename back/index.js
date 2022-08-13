const express = require('express');
const cors = require('cors');
require('./models/db.js') ;
const formidable = require("formidable");

const app = express();
// const urlencodedParser = express.urlencoded({extended: true});
const jsonParser = express.json();

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500/']
}));

// app.post('/', urlencodedParser, (req, res) => {
//     if (!req.body) {
//         return res.sendStatus(400);
//     }
//     console.log(req.body);
//     res.send(req.body);
// })

const productController = require("./controllers/productController")
app.use("/product", productController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})