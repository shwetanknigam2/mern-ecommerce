const express = require('express');


const { upload } = require('../../helper/cloudinary.js');
const { handleImageUpload, addproduct, editproduct, deleteproduct, fetchproduct  } = require('../../admincontroller/product.controller.js');


const router = express.Router();

router.post('/upload-image', upload.single('image'), (req, res, next) => {
    console.log('Middleware Debug:', req.file);
    next();
}, handleImageUpload);
router.post('/addproduct',addproduct)
router.get('/fetchproduct',fetchproduct)
router.put('/editproduct/:id',editproduct)
router.delete('/deleteproduct/:id',deleteproduct)

module.exports = router;