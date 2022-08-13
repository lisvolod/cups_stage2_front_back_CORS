const {Router} = require("express");
const router = Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
require("dotenv/config");

// const path = require("path");
// const fs = require("fs");

router.post("/", (req, res) => {
    // const publicDir = path.join(__dirname, "../", "public", "img");
    
    //Конфігуруємо formidable  у відповідності до 
    const form = formidable({
        multiples: true,                    //Вказуємо, що буде прилітати форма з кількома полями
        // uploadDir: publicDir,               //Вказуємо каталок, куди будемо поміщати завантажені файли
        keepExtensions: true,               //Вказуємо, що потрібно зберігати розширення
        // filename: function (name, ext, part, form) {return part.originalFilename} //Залишаємо старе ім'я файла
    });
    
    form.parse(req, async (err, fields, files) => {
        
        if (err) {
          console.log("Error parsing the files");
          return res.status(400).json({
            status: "Fail",
            message: "There was an error parsing the files",
            error: err,
          });
        }
        const { productName, productVolume, productMaterial } = fields;
        const { productImage } = files;
       

        const getImagePath = productImage.filepath;
        console.log(getImagePath);
        
        cloudinary.uploader.upload(getImagePath, (err, image) => {
            if (err) { console.warn(err); }
            
            // Формуємо об'єкт для запису в БД
            const productInfo = {
                productName,                // Аналогічно до синтаксису productName: productName,
                productVolume,
                productMaterial,
                productImage: image.url
            }
        
            // Перевіряємо чи строрювати новий рекорд в БД, чи оновити наявний
            if (fields.productId == "") {
                Product(productInfo).save(err => {
                    if (err) console.log(err);
                    res.sendStatus(200);
                })
            }
            else { // Перевірити чи працює оновлення
                Product.findByIdAndUpdate(fields.productId, productInfo, (err, data) => {
                    if (err) console.log(err)
                    res.send(data.json());
                })
            }
        })
           
            
        // console.log(imgUrl);
        //Зберігаємо файл в каталог public/img
        // let filepath = file.productImage.filepath;
        // let newpath = path.join(__dirname, "../", "public", "img", file.productImage.originalFilename);
        //Перевіряємо чи існує каталог public/img, якщо відсутній - то створюємо
        
        // if (!fs.existsSync(publicDir)) fs.mkdir(publicDir, {recursive: true} , (error) => {
        //     if(error){
        //       console.log('Folder creation error ', error)
        //     } else {
        //       console.log('New folder has been created.')
        //     }
        //   })

        // fs.rename(filepath, newpath, (err) => {
        //     if (err) console.log(err);
        //     // res.send(`File ${file.productImage.originalFilename} uploaded seccessfully`)
        // })
        
        
        
       
                
    });
     
});

module.exports = router;