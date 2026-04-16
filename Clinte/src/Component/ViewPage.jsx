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
    <div className="pt-20 pb-12 bg-gradient-to-b from-slate-50 to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-white shadow-xl hover:shadow-2xl border border-white/50 transition-all text-gray-800 font-medium"
        >
          ← Back to Hotels
        </button>

        {/* Hero Image + Info */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Main Image */}
          <div className="group relative rounded-3xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm">
            <img
              src={HotelOne?.roomType?.image || '/placeholder-hotel.jpg'}
              alt={HotelOne?.name}
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Rating */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-2xl">
              <span className="text-2xl font-bold text-yellow-500">⭐ {HotelOne?.rating}</span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6 lg:pt-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-black bg-clip-text text-transparent mb-4 leading-tight">
                {HotelOne?.name}
              </h1>
              <p className="text-2xl text-gray-600 flex items-center gap-2">
                📍 {HotelOne?.location}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40">
              <div className="text-4xl font-black bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                ₹{HotelOne?.price}
              </div>
              <p className="text-xl text-gray-700">per night</p>
            </div>

            <button
              onClick={() => navigate(`/booking/${id}`)}
              className="w-full lg:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-6 px-10 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 tracking-wide"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Room Details */}
        <div className="bg-white/70 backdrop-blur-xl rounded-4xl p-12 shadow-2xl border border-white/50">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Room Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:shadow-xl transition-all border border-blue-100 hover:border-blue-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Room Type</h3>
              <p className="text-xl text-gray-700">{HotelOne?.roomType?.type}</p>
            </div>
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:shadow-xl transition-all border border-emerald-100 hover:border-emerald-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Bathrooms</h3>
              <p className="text-xl text-gray-700">{HotelOne?.roomType?.bathrooms}</p>
            </div>
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:shadow-xl transition-all border border-purple-100 hover:border-purple-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h3>
              <p className="text-xl text-gray-700 line-clamp-3">{HotelOne?.roomType?.amenities}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;