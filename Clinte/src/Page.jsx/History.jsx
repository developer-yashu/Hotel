import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // 🔥 Load bookings
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  // 🔥 Delete function with alert
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete? ❌");

    if (!confirmDelete) return;

    const updatedBookings = bookings.filter((b) => b.id !== id);

    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // ✅ Success alert
    alert("Booking deleted successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      {/* 🔥 Top Section */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Booking History
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-1 rounded-lg bg-white shadow hover:bg-gray-200 transition"
        >
          ← Back
        </button>
      </div>

      {/* 🔥 Empty State */}
      {bookings.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center w-full max-w-md">
          <p className="text-gray-500 text-lg">
            No bookings yet 😔
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">

          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              {/* Hotel Name */}
              <h2 className="text-xl font-bold text-gray-800">
                {b.hotelName}
              </h2>

              <p className="text-gray-500 text-sm mb-2">
                📍 {b.location}
              </p>

              {/* Details */}
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Check-In:</strong> {b.checkIn}</p>
                <p><strong>Check-Out:</strong> {b.checkOut}</p>
                <p><strong>Days:</strong> {b.days}</p>
              </div>

              {/* Price */}
              <div className="mt-4 border-t pt-3 flex justify-between items-center">
                <span className="text-gray-500 text-sm">Total</span>
                <span className="text-lg font-bold text-green-600">
                  ₹{b.total}
                </span>
              </div>

              {/* Status + Delete */}
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                  Confirmed ✅
                </span>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete ❌
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default History;