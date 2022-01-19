const express = require("express");
const router = express.Router();
const {cloudinary} = require('../../utils/cloudinary');
// ITEM MODEL
const Item = require("../../models/Product");

router.get("/", (req,res) => {
    Product.find()
    .sort({'_id': -1})
    .then(items => res.json(items))
});

router.post("/", async(req,res) => {
    const base64Img = req.body.img;
    const name = req.body.name;
    const price = req.body.price;
  
    try{
        const uploadResponse = await cloudinary.uploader.upload(base64Img,{
            upload_preset: 'ml_default'
        });
        if(uploadResponse){
            const img_id = uploadResponse.public_id;
            const newProduct = new Product({
                name: name,
                price: price,
                img:img_id
            });
            newProduct.save().then(item => res.json(item));
            console.log("Uploaded.");
        }
        
    }catch(error){
        console.error(error);
        res.status(500).json({err:"Something Went Wrong."});
        console.log("Something Went Wrong.");
    }

});

router.delete("/:id", (req,res) => {
    console.log('OK')
})


module.exports = router;