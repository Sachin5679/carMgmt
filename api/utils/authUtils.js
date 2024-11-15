const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = (password)=>{
    return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashedPassword)=>{
    return bcrypt.compareSync(password, hashedPassword);
};

const generateToken = (userId)=>{
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { hashPassword, comparePassword, generateToken };