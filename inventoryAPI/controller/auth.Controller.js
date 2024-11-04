const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { authSchema } = require('../helpers/validateSchema');
const db = require('../models/indexStart');
const User = db.users;

const generateResetToken = (user) => {
     return jwt.sign({ id: user.id }, process.env.RESET_TOKEN_SECRET, { expiresIn: '15m' });
};

const sendResetEmail = async (user, token) => {
     const transporter = nodemailer.createTransport({
          service: 'Gmail', // Use your email provider
          auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS,
          },
     });

     const resetLink = `http://localhost:4001/api/auth/reset-password/${token}`;

     const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: 'Password Reset',
          text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
     };

     try {
          await transporter.sendMail(mailOptions);
     } catch (error) {
          console.error('Error sending reset email:', error);
          throw new Error('Error sending reset email');
     }
};

exports.signup = async (req, res) => {
     try {
          const { error } = authSchema.validate(req.body);
          if (error) {
               console.log('Validation error:', error.details[0].message);
               return res.status(400).json({ message: error.details[0].message });
          }

          const { email, password } = req.body;
          const newUser = await User.create({ email, password });
          res.status(201).json({ message: 'User registered successfully', user: newUser });
     } catch (err) {
          console.error('Error registering user:', err);
          res.status(500).json({ message: 'Error registering user', error: err.message });
     }
};

exports.login = async (req, res) => {
     try {
          const { email, password } = req.body;
          const user = await User.findOne({ where: { email } });

          if (!user || !(await user.comparePassword(password))) {
               return res.status(401).json({ message: 'Invalid email or password' });
          }

          const token = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
          res.json({ message: 'Login successful', token });
     } catch (err) {
          res.status(500).json({ message: 'Error logging in', error: err.message });
     }
};

exports.forgotPassword = async (req, res) => {
     const { email } = req.body;

     try {
          const user = await User.findOne({ where: { email } });

          if (!user) {
               return res.status(404).json({ message: 'User not found' });
          }

          const token = generateResetToken(user); // Use the new function
          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour

          await user.save();

          await sendResetEmail(user, token); // Use the new function
          res.json({ message: 'Password reset link sent to your email' });
     } catch (error) {
          res.status(500).json({ message: 'Error processing request', error: error.message });
     }
};

exports.resetPassword = async (req, res) => {
     const { password } = req.body;
     const { token } = req.params;

     try {
          const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
          const user = await User.findByPk(decoded.id);

          if (!user || user.passwordResetToken !== token || Date.now() > user.passwordResetExpires) {
               return res.status(400).json({ message: 'Invalid or expired token' });
          }

          user.password = await bcrypt.hash(password, 10);
          user.passwordResetToken = null;
          user.passwordResetExpires = null;
          await user.save();

          res.json({ message: 'Password has been reset successfully' });
     } catch (error) {
          res.status(500).json({ message: 'Error resetting password', error: error.message });
     }
};


