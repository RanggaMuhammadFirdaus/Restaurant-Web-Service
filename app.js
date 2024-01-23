const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const registrationRouter = require('./router/RegistrationRouter');
const MenuRouter = require('./router/MenuRouter');


const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Restoran', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/registration', registrationRouter);
app.use('/api/users', registrationRouter);
app.use('/api/menus', MenuRouter);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
