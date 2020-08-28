const AWS = require("aws-sdk");
const User = require("../models/user");
const expressJwt = require('express-jwt')
const { registerEmailParams, forgotEmailParams } = require("../helpers/email");
const jwt = require("jsonwebtoken");
const shortid = require('shortid')

// TODO:
// Esta config puede removerse porque con solo llamar
// la env variable con estos nombres AWS sdk las toma
/* AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
}); */

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exist in databas
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email taken",
      });
    }

    // Generate token with user email and pass
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "10m",
      }
    );

    const params = registerEmailParams(email, token);

    const sendEmailOnRegister = ses.sendEmail(params).promise();

    sendEmailOnRegister
      .then((data) => {
        console.log("email submitted", data);
        res.json({
          message: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
        });
      })
      .catch((err) => {
        console.log("ses email on register", err);
        res.json({
          message: `We could not verify your email, please try again`,
        });
      });
  });
};

// Activate user after token
exports.registerActivate = (req, res) => {
  const { token } = req.body;
  
  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
    if (err) {
      return res.status(401).json({
        error: 'Expired link. Try again'
      })
    }

    const { name, email, password } = jwt.decode(token)
    const username = shortid.generate();

    User.findOne({email}).exec((err, user) => {
      if (user) {
        return res.status(401).json({
          error: 'Email is taken'
        })
      }
    })

    const newUser = new User({username, name, email, password})
    newUser.save((err, result) => {
      if (err) {
        return res.status(401).json({
          error: 'Error saving user in DB'
        })
      }

      return res.json({
        message: 'Registration success. Please Login'
      })
    })

  })
}


exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({email}).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email doesnt exist. Please register'
      })
    }

    // Authenticate with user scrhema
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and pass do not match'
      }) 
    }

    const { _id, name, email, role } = user
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {expiresIn: '7d'})

    return res.json({
      token,
      user: { _id, name, email, role }
    })
  })
}

exports.requireSigin = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id
  User.findOne({_id: authUserId}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        user: 'User not found'
      })
    }

    req.profile = user

    next()
  })
}

exports.adminMiddleware = (req, res, next) => {
  const authUserId = req.user._id
  User.findOne({_id: authUserId}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        user: 'User not found'
      })
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        user: 'Admin resource. Access denied'
      })
    }

    req.profile = user

    next()
  })
}

exports.forgotPassord = (req, res) => {
  const {email} = req.body;

  //check if user exists with that email
  User.findOne({email}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        user: 'User with that email doesnt exist'
      })
    }

    // Generate token and email to user
    const token = jwt.sign({ name: user.name }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' })
    // Send Email
    const params = forgotEmailParams(email, token);

    // Populate db > user > reset link

    return user.updateOne({resetPasswordLink: token}, (err, success) => {
      if(err) {
        return res.status(400).json({
          user: 'Password reset fail. Try later'
        })
      }

      const sendEmail = ses.sendEmail(params).promise()
      sendEmail
        .then((data) => {
          console.log('ses reset success', data)
          return res.json({
            message: `Email has been sent to ${email}`
          })
        })
        .catch((err) => {
          console.log('ses reset fail', err)
          return res.json({
            message: `We couldnt verify your email`
          })
        })
    })


  })
}

exports.resetPassword = (req, res) => {
  
}