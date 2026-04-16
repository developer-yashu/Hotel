import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWishlist } from '../Slice/wishlistSlice';

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistData = useSelector(
    (state) => state.wishlist.wishlistData
  );

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            ❤️ Wishlist
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Hotels you're thinking about. Ready to book?
          </p>
        </div>

        {wishlistData.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-32 h-32 mx-auto mb-8 rounded-4xl bg-gradient-to-r from-rose-200 to-purple-200 flex items-center justify-center shadow-2xl">
              <span className="text-5xl">💖</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Wishlist is empty</h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
              Start exploring hotels and click the heart to save your favorites!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-8 py-4 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Explore Hotels
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistData.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl hover:shadow-3xl border border-white/50 hover:border-rose-200 transition-all duration-500 hover:-translate-y-3 overflow-hidden cursor-pointer"
              >
                {/* Heart Badge */}
                <div className="absolute top-6 left-6 z-20 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-3 rounded-3xl shadow-2xl font-bold text-lg backdrop-blur-sm">
                  💖 Saved
                </div>

                {/* Rating */}
                <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-2xl">
                  <span className="text-xl font-bold text-yellow-500">⭐ {item.rating}</span>
                </div>

                {/* Image */}
                <div className="relative h-64 overflow-hidden rounded-t-4xl group-hover:scale-[1.02] transition-transform duration-700">
                  <LazyLoadImage
                    effect="blur"
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 relative z-10">
                  <h3 className="text-2xl font-black text-gray-800 mb-3 line-clamp-1 group-hover:text-rose-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">📍 {item.location}</p>
                  
                  <div className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-6">
                    ₹{item.price}
                  </div>

                  {/* Room Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                    <div className="space-y-1">
                      <span className="text-gray-500 font-medium">Type</span>
                      <span className="font-bold">{item.roomType?.type}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gray-500 font-medium">Bathrooms</span>
                      <span className="font-bold">{item.roomType?.bathrooms}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigate(`/hotels/${item._id}`)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 px-6 rounded-3xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() =>
                        dispatch(removeWishlist({ _id: item._id }))
                      }
                      className="p-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
                      title="Remove from wishlist"
                    >
                      <span className="text-xl">✕</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Bar */}
        {wishlistData.length > 0 && (
          <div className="mt-20 grid md:grid-cols-3 gap-6 mb-16 p-8 bg-white/60 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/50">
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">
                {wishlistData.length}
              </div>
              <div className="text-xl font-bold text-gray-800">Total Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-2">
                ₹{wishlistData.reduce((sum, item) => sum + item.price, 0)}
              </div>
              <div className="text-xl font-bold text-gray-800">Avg Nightly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                {wishlistData.reduce((sum, item) => sum + item.rating, 0) / wishlistData.length | 0}
              </div>
              <div className="text-xl font-bold text-gray-800">Avg Rating</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;