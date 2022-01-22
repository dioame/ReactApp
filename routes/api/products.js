const express = require("express");
const router = express.Router();
const {cloudinary} = require('../../utils/cloudinary');

const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "records"
});


router.get("/", (req,res) => {
    const sql = "SELECT * FROM items";
    db.query(sql, (err,result) => {
        res.send(result);
    });
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
            const sql = "INSERT INTO items(name,price,img) VALUES ('"+name+"','"+price+"','"+img_id+"')";
            db.query(sql, (err,result) => {
                res.send(result);
            });
        }
        
    }catch(error){
        console.error(error);
        res.status(500).json({err:"Something Went Wrong."});
        console.log("Something Went Wrong.");
    }
});


router.put("/", async(req,res) => {
    const id = req.body.id;
    const base64Img = req.body.img;
    const name = req.body.name;
    const price = req.body.price;
  
    try{
        const uploadResponse = await cloudinary.uploader.upload(base64Img,{
            upload_preset: 'ml_default'
        });
        if(uploadResponse){
            const img_id = uploadResponse.public_id;
            const sql = "UPDATE items(name,price,img) set name='"+name+"',price='"+price+"',img='"+img_id+"' WHERE id = "+id+")";
            db.query(sql, (err,result) => {
                res.send(sql);
            });
        }
        
    }catch(error){
        console.error(error);
        res.status(500).json({err:"Something Went Wrong."});
        console.log("Something Went Wrong.");
    }

});

router.delete("/:id", (req,res) => {
    const sql = "DELETE FROM items WHERE id = "+req.params.id+")";
    db.query(sql, (err,result) => {
        res.send(result);
    });
})


module.exports = router;