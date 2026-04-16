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
    <div className="pt-20 pb-10 bg-gradient-to-b from-slate-50 to-gray-100 min-h-screen">
      {/* 🔥 Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20 px-5 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-lg">
            Book luxury hotels at unbeatable prices
          </p>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-1 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full bg-transparent border-none p-4 text-lg placeholder-gray-300 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 -mt-10">
        {/* 🔍 Controls */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Sort */}
            <select
              className="border border-gray-200 p-3 rounded-xl w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="low">💰 Price Low → High</option>
              <option value="high">💸 Price High → Low</option>
              <option value="rating">⭐ Top Rated</option>
            </select>

            {/* Quick Links */}
            {/* <div className="flex flex-wrap gap-3 flex-1 justify-center lg:justify-end">
              <button
                onClick={() => navigate("/wishlist")}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                🤍 Wishlist ({wishlistData.length})
              </button>
              <button
                onClick={() => navigate("/history")}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                📜 History
              </button>
            </div> */}
          </div>
        </div>

        {/* 🏨 Filter Chips */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setSelectedHotel("")}
            className={`px-6 py-2 rounded-full border-2 font-medium transition-all ${
              selectedHotel === ""
                ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md"
            }`}
          >
            All Hotels
          </button>
          {hotelNames.slice(0, 6).map((name, index) => (
            <button
              key={index}
              onClick={() => setSelectedHotel(name)}
              className={`px-6 py-2 rounded-full border-2 font-medium transition-all ${
                selectedHotel === name
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* 🏨 Hotel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <LazyLoadImage
                  src={hotel.image}
                  effect="blur"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  onClick={() => navigate(`/hotels/${hotel._id}`)}
                />
                <span className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm text-black text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                  ⭐ {hotel.rating}
                </span>
                <button
                  onClick={() => handlewishlist(hotel)}
                  className={`absolute top-4 left-4 z-20 p-3 rounded-2xl shadow-lg transition-all ${
                    wishlistData.find((c) => c._id === hotel._id)
                      ? "bg-red-500 text-white hover:bg-red-600 scale-110"
                      : "bg-blue-500 text-white hover:bg-blue-600 scale-110"
                  }`}
                  title="Wishlist"
                >
                  ❤️
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {hotel.name}
                </h3>
                <p className="text-gray-600 mb-4">📍 {hotel.location}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    ₹{hotel.price}
                    <span className="text-sm text-gray-500 font-normal ml-1">/night</span>
                  </div>
                  <button
                    onClick={() => navigate(`/hotels/${hotel._id}`)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-xl">
              <span className="text-4xl">🏨</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Hotels Found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );

};

export default Api;
