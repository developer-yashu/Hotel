const express = require('express');
const router = express.Router();

const hotelController=require('../Controller/HotelController');
 
router.post('/hotels',hotelController.addHotel);
router.get('/hotels',hotelController.getHotels);
router.get('/hotelsOne/:id',hotelController.getOneHotels);
router.post('/signup',hotelController.signup);
router.post('/login',hotelController.loginUser);
 





module.exports=router;
