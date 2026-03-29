import React, { useEffect } from "react";
import { fetchOneHotel } from "../Slice/GetOneSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const ViewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const { id } = useParams();

  const { HotelOne } = useSelector((state) => state.HotelOne);

  useEffect(() => {
    dispatch(fetchOneHotel(id));
  }, [dispatch, id]);

  return (
    <div className="p-5 max-w-6xl mx-auto">

      {/* 🔥 Back Button (FIXED POSITION) */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-200 transition text-gray-700"
        >
          ← <span>Back</span>
        </button>
      </div>

      {/* 🔥 Top Section */}
      <div className="grid md:grid-cols-2 gap-6 items-center">

        {/* Image */}
        <img
          src={HotelOne?.roomType?.image}
          alt={HotelOne?.name}
          className="w-full h-80 object-cover rounded-2xl shadow-md"
        />

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {HotelOne?.name}
          </h1>

          <p className="text-gray-500 mt-2">
            📍 {HotelOne?.location}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <span className="bg-black text-white px-2 py-1 rounded text-sm">
              ⭐ {HotelOne?.rating}
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-green-600 mt-4">
            ₹{HotelOne?.price}
            <span className="text-sm text-gray-500"> /night</span>
          </h2>

          {/* Button */}
          <button
            onClick={() => navigate(`/booking/${id}`)}
            className="mt-6 bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* 🔥 Room Details */}
      <div className="mt-10 bg-gray-100 p-5 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Room Details</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Type</p>
            <p>{HotelOne?.roomType?.type}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Bathrooms</p>
            <p>{HotelOne?.roomType?.bathrooms}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">Amenities</p>
            <p>{HotelOne?.roomType?.amenities}</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ViewPage;