const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect MongoDB
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));


app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));