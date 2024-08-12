// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User } = require('./models');
const loggerMiddleware = require('./loggermiddleware'); // Import the custom logger middleware

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Apply the logger middleware to send each request log to RabbitMQ
app.use(loggerMiddleware);

// API endpoint to handle login requests
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch the user from the database
    const user = await User.findOne({ where: { username, password } });

    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    // Send a success response if the user is authenticated
    res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'An error occurred' });
  }
});

// API endpoint to handle status requests
app.get('/status', (req, res) => {
  res.status(200).send({ status: 'Server is running' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
