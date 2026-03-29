import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchhotels } from "../Slice/HotelSlice";
import { useNavigate } from "react-router-dom";
import { removeWishlist, addToWishlist } from "../Slice/wishlistSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Api = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hotels, loading, error } = useSelector((state) => state.hotels);
  const wishlistData = useSelector((state) => state.wishlist.wishlistData);
  console.log("hotels>>>>>>>>>", hotels);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedHotel, setSelectedHotel] = useState("");

  useEffect(() => {
    dispatch(fetchhotels());
  }, [dispatch]);

  const hotelNames = [...new Set(hotels.map((h) => h.name))];

  let filteredHotels = hotels.filter((hotel) => {
    const matchSearch =
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.location.toLowerCase().includes(search.toLowerCase());

    const matchHotel = selectedHotel === "" || hotel.name === selectedHotel;

    return matchSearch && matchHotel;
  });

  if (sort === "low") {
    filteredHotels.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredHotels.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filteredHotels.sort((a, b) => b.rating - a.rating);
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          className="w-124"
        />
      </div>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // wishlist
  const handlewishlist = (hotel) => {
    const view = wishlistData.find((c) => c._id === hotel._id);
    view ? dispatch(removeWishlist(hotel)) : dispatch(addToWishlist(hotel));
  };

  return (
    <div className="p-5">
      {/* 🔍 Search + Sort + History */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* 🔍 Search */}
          <input
            type="text"
            placeholder="🔍 Search hotel..."
            className="border p-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 🔽 Sort */}
          <select
            className="border p-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low">💰 Price Low → High</option>
            <option value="high">💸 Price High → Low</option>
            <option value="rating">⭐ Top Rated</option>
          </select>

          <button
            onClick={() => navigate("/wishlist")}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition"
          >
           🤍  Wishlist ({wishlistData.length})
          </button>

          {/* 📜 History Button */}
          <button
            onClick={() => navigate("/history")}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
          >
            📜 History
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
          >
            Login
          </button>
        </div>
      </div>

      {/* 🏨 Hotel Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* All Button */}
        <button
          onClick={() => setSelectedHotel("")}
          className={`px-4 py-1 rounded-full border transition ${
            selectedHotel === ""
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>

        {/* Dynamic Buttons */}
        {hotelNames.map((name, index) => (
          <button
            key={index}
            onClick={() => setSelectedHotel(name)}
            className={`px-4 py-1 rounded-full border transition ${
              selectedHotel === name
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* 🏨 Hotel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer group"
          >
            {/* Image */}
            <div className="relative">
              <LazyLoadImage
                src={hotel.image}
                effect="blur"
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                onClick={() => navigate(`/hotels/${hotel._id}`)}
              />

              {/* Rating Badge */}
              <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                ⭐ {hotel.rating}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {hotel.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">📍 {hotel.location}</p>

              {/* Price + Button */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-green-600">
                  ₹{hotel.price}
                  <span className="text-sm text-gray-500"> /night</span>
                </span>

                <button
                  onClick={() => handlewishlist(hotel)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition duration-300 ${
                    wishlistData.find((c) => c._id === hotel._id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {wishlistData.find((c) => c._id === hotel._id)
                    ? "Remove"
                    : "Wishlist"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Api;
