const Hotel = require('../Model/HotelModel');
const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.addHotel = async (req, res) => {
    try {

        const { name, location, price, rating, imageUrl } = req.body;
        if (!(name && location && price && rating && imageUrl)) {
            return res.status(400).json({ message: "All filde are required" })
        }
        const existName = await Hotel.findOne({ name })
        if (existName) {
            return res.status(400).json({ message: "Hotel Name already exists" })
        }
        const addHotel = new Hotel({ name, location, price, rating, imageUrl })
        await addHotel.save();
        res.status(200).json({ message: "Hotel added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add hotel", error: error.message });
    }
};


exports.getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Failed to get hotels", error: error.message });
    }
};

// get one
exports.getOneHotels = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Hotel.findById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(name && email && password)) {
            return res.status(400).json({ message: "All field are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log("Hash:", hashedPassword);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        console.log("isMatch>>>>>>>>", isMatch);

        if (!isMatch) {
            return res.status(404).json({ message: "Password is worng" })
        }
        if (user) {
            res.status(200).json({ message: "Login successful" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
