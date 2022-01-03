const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Models
const User = require("../models/user.js");

router.post("/", async (req, res) => {
  try {
    
    // Checking if user already exists
      const user = await User.findOne({email : req.body.email}).exec();
      if(!user) return res.status(400).send({msg : "User not yet registered."});

      const isValid = await bcrypt.compare(req.body.password, user.password);
      if(!isValid) return res.status(400).send({msg : "Incorrect password"});

      // generating token
      const token = JWT.sign({email : user.email}, "TOMMY", {expiresIn : '1h'});
      const userObj = {
        token : token,
        user : {
            user_id: user._id,
            name : user.name,
            email : user.email,
        }
      }
      res.send(userObj);

  } catch (error) {
      console.log(error);
  }
});

module.exports = router;
