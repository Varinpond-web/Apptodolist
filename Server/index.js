const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');
const app = express();
require('dotenv').config();

mongoose.connect(
    `mongodb+srv://noppawut:${process.env.MONGODB_PASSWORD}@cluster.pq7vqi4.mongodb.net/mydatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

app.use(express.json());

// Use routes
app.use('/notes', noteRoutes);

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
