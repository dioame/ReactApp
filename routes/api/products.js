const express = require("express");
const router = express.Router();
const {cloudinary} = require('../../utils/cloudinary');
// ITEM MODEL
const Item = require("../../models/Product");

// @route GET api/items
// @desc GET ALL Items
// @access public


router.get("/", (req,res) => {
     
      console.log('OK')
});


// @route POST api/items
// @desc CREATE A Record
// @access public

router.post("/", async(req,res) => {
    console.log('OK')
    const base64Img = req.body.img;
    const name = req.body.name;
    const price = req.body.price;
  
    try{
        const uploadResponse = await cloudinary.uploader.upload(base64Img,{
            upload_preset: 'ml_default'
        });
        console.log(uploadResponse.public_id);
        console.log(!uploadResponse.public_id);
        res.json({msg:"Uploaded"});
    }catch(error){
        console.error(error);
        res.status(500).json({err:"Something Went Wrong."});
    }

});


// @route DELETE api/items/:id
// @desc DELETE A Record
// @access public

router.delete("/:id", (req,res) => {
    console.log('OK')
})


module.exports = router;