const express = require('express');
const User = require('../models/users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '!@#$%wasikaran^&*()'


router.post('/signup', [
   body('name', 'name must be atleast 4 words').isLength({min: 4}),
   body('email', 'invalid email').isEmail(),
   body('password', 'password must be atleast 4 words').isLength({min: 4})
], async (req, res) =>{

    let success = false;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
    return res.status(400).json({ success, errors: errors.array() });
    }
    const { name , email, password} = req.body;
    try{
     let existingUser = await User.findOne({email})
     if (existingUser){
            return res.status(400).json({ success, error: 'email is already exists' });
     }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    

    const data = {
        user:{
            id: user.id
        }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.status(201).json({success, authToken})
} catch (error) {
    console.error("CreateUser Error:", error.message);
    return res.status(500).send({ success, error: "Internal Server Error" });
  }

})

router.post('/login', [
    body('email', 'invalid email').isEmail(),
    body('password', 'passowrd is requires').exists()
], async (req, res) => {
   let success = false
   const errors = validationResult(req)
   if (!errors.isEmpty()){
    return res.status(400).json({success, error: errors.array()})
   }

   const {email, password} = req.body;
   try{
    let existingUser = await User.findOne({email})
    if(!existingUser){
            return res.status(400).json({success, error: "invalid email or password"})
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password)
    if (!passwordMatch){
        return res.status(400).json({success , error: "password does not match"})
    }

    const data = {
      user: {
        id: existingUser.id
      }
    };

    const authToken =  jwt.sign(data, JWT_SECRET)
    success = true
    return res.json({success, authToken})
   }
    catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
})

router.post('/getuser', fetchuser, async (req, res) => {
try {
   let userID = req.user.id
   const user = await User.findById(userID).select("-password")
   res.send(user)
}
catch (error) {
  console.error("Login Error:", error.message);
  return res.status(500).send("Internal Server Error");
}
})

module.exports = router;