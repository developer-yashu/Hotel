const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

const PORT = 1010;

mongoose.connect("mongodb://127.0.0.1:27017/react")
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

 

const hotelRouter=require('./Router/HotelRouter');
app.use('/api',hotelRouter);


 
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});