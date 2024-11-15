const express = require('express');
const { addCar, getUserCars, viewSpecificCar, updateDetails, deleteCar } = require('../controllers/carController');
const upload = require('../middlewares/multerConfig');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/cars/addcar:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []  # Security definition for Bearer Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Car added successfully
 *       400:
 *         description: Failed to add car
 *       403:
 *         description: Unauthorized - No token provided
 */
router.post('/addcar', verifyToken, upload.array('images', 5), addCar);

/**
 * @swagger
 * /api/cars/mycars:
 *   get:
 *     summary: Get all cars of the logged-in user
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cars
 *       400:
 *         description: Failed to fetch cars
 */
router.get('/mycars', verifyToken, getUserCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: View a specific car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Car details
 *       404:
 *         description: Car not found
 */
router.get('/:carId', verifyToken, viewSpecificCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   patch:
 *     summary: Update a car's details
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the car
 *                 example: "Toyota Prius 2021"
 *               description:
 *                 type: string
 *                 description: Updated description of the car
 *                 example: "A reliable hybrid with excellent mileage"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated array of image URLs
 *                 example: ["https://example.com/image1.jpg", "https://example.com/image3.jpg"]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated tags related to the car
 *                 example: ["hybrid", "new model"]
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 */
router.patch('/:carId', verifyToken, updateDetails);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Car ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */
router.delete('/:carId', verifyToken, deleteCar);

module.exports = router;