const multer = require('multer');
const express = require('express');
const router = express.Router();
const verifyToken = require('./authMiddleware');
const carController = require('../controllers/carController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ dest: 'uploads/' });

// POST route to add a car
// router.post('/api/cars/addcar', verifyToken, upload.array('images'), carController.addCar);

module.exports = upload;
