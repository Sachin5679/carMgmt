const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
const app = express();
app.use(cors({
    origin: '*',
  }));
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Management API',
      version: '1.0.0', 
      description: 'This is the API documentation for the Car Management App.',
    },
  },
  apis: ['./routes/*.js'], 
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

sequelize.sync().then(()=>{
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
      });
})

app.get('/', (req, res) => {
    res.send('Welcome to the Car Management API!');
});