const Car = require('../models/car'); 

const addCar = async (req, res) => {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];
    const userId = req.userId;
    console.log(title, description, tags, userId);

    try {
        const newCar = await Car.create({
            title,
            description,
            images,
            tags,
            userId
        });
        return res.status(201).json({
            message: 'Car added successfully',
            car: newCar,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Failed to add car',
            error: err.message,
        });
    }
};



const getUserCars = async (req, res) => {
    const userId = req.userId; 
    try {
      const userCars = await Car.findAll({
        where: { userId },
      });
  
      if (userCars.length === 0) {
        return res.status(404).json({
          message: 'No cars found for this user',
        });
      }
  
      return res.status(200).json({
        message: 'Cars retrieved successfully',
        cars: userCars,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Failed to retrieve cars',
        error: err.message,
      });
    }
  };
  
  const viewSpecificCar = async (req, res) => {
    try {
      const { carId } = req.params; 
  
      
      const car = await Car.findOne({
        where: { id: carId },
      });
  
      if (!car) {
        return res.status(404).json({
          message: 'Car not found',
        });
      }
  
      return res.status(200).json({
        message: 'Car retrieved successfully',
        car,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Failed to retrieve car',
        error: err.message,
      });
    }
  };
  
 
  const updateDetails = async (req, res) => {
    try {
      const { carId } = req.params; 
      const { title, description, tags, userId } = req.body;
      const images = req.files ? req.files.map(file => file.path) : [];
  
      
      const car = await Car.findOne({
        where: { id: carId },
      });
  
      if (!car) {
        return res.status(404).json({
          message: 'Car not found',
        });
      }
  
      
      car.title = title || car.title;
      car.description = description || car.description;
      car.tags = tags || car.tags;
      car.images = images.length ? images : car.images; 
      car.userId = userId || car.userId;
  
      
      await car.save();
  
      return res.status(200).json({
        message: 'Car updated successfully',
        car,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Failed to update car',
        error: err.message,
      });
    }
  };
  
  
  const deleteCar = async (req, res) => {
    try {
      const { carId } = req.params; 
  
      const car = await Car.findOne({
        where: { id: carId },
      });
  
      if (!car) {
        return res.status(404).json({
          message: 'Car not found',
        });
      }
  
      
      await car.destroy();
  
      return res.status(200).json({
        message: 'Car deleted successfully',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Failed to delete car',
        error: err.message,
      });
    }
  };
  
  module.exports = {
    addCar,
    getUserCars,
    viewSpecificCar,
    updateDetails,
    deleteCar,
  };