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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ❤️ My Wishlist
      </h1>

      {wishlistData.length === 0 ? (
        <p className="text-center text-gray-500">
          No items in wishlist
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistData.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <LazyLoadImage
                  effect="blur"
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />

                {/* Rating Badge */}
                <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                  ⭐ {item.rating}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  📍 {item.location}
                </p>

                <p className="text-green-600 font-bold mt-2">
                  ₹{item.price}
                </p>

                {/* Room Info */}
                <div className="text-xs text-gray-600 mt-2 space-y-1">
                  <p>🛏 Type: {item.roomType.type}</p>
                  <p>📏 Size: {item.roomType.size}</p>
                  <p>🚿 Bathrooms: {item.roomType.bathrooms}</p>
                  <p>✅ Available: {item.roomType.available ? "Yes" : "No"}</p>
                </div>

                {/* Button */}
                <button
                  onClick={() =>
                    dispatch(removeWishlist({ _id: item._id }))
                  }
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;