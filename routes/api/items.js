const express = require("express");
const router = express.Router();

// ITEM MODEL
const Item = require("../../models/Item");

// @route GET api/items
// @desc GET ALL Items
// @access public

router.get("/", (req,res) => {
        Item.find()
        .sort({date:-1})
        .then(items => res.json(items))
});


// @route POST api/items
// @desc CREATE A Record
// @access public

router.post("/", (req,res) => {
        const newItem = new Item({
                name: req.body.name,
                category: req.body.category,
        });

        newItem.save().then(item => res.json(item));
});


// @route DELETE api/items/:id
// @desc DELETE A Record
// @access public

router.delete("/:id", (req,res) => {
      Item.findById(req.params.id)
      .then(item => item.remove().then(()=>res.json({"success":true})))
      .catch(err => res.status(404).json({"success":false}));
})


module.exports = router;