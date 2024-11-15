const User = require('../models/user');
const { hashPassword, comparePassword, generateToken } = require('../utils/authUtils');

const register = async(req, res)=>{
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    // console.log(username, password);

    try {
        const newUser = await User.create({username, password_hash:hashedPassword});
        const token = generateToken(newUser.id);
        res.status(201).json({token});
    } catch(err) {
        console.error(err);
        res.status(400).json({error: 'User registration failed'});
    }
};

const login = async(req, res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }});
    if (!user || !comparePassword(password, user.password_hash)){
        return res.status(401).json({error: 'Invalid credentials'});
    }
    const token = generateToken(user.id);
    res.json({ token });
};

module.exports = { register, login };
