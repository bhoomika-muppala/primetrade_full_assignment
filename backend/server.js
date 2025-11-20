require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes')); // Notes CRUD routes (protected)
app.use("/api/tasks", require("./routes/taskRoutes"));
// after existing requires
app.use('/api/tasks', require('./routes/tasks'));



// health check
app.get('/', (req, res) => res.send({ status: 'ok', message: 'Primetrade backend is running' }));

// simple error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
