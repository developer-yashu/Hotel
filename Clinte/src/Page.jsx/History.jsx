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
    <div className="pt-20 pb-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-3xl hover:bg-white shadow-xl hover:shadow-2xl border border-white/50 transition-all text-gray-800 font-semibold"
          >
            ← Back
          </button>
          <div className="flex-1">
            <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Your Bookings
            </h1>
            <p className="text-2xl text-gray-600 mt-2">Manage your reservations</p>
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-32 h-32 mx-auto mb-8 rounded-4xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-2xl">
              <span className="text-5xl">📋</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">No bookings yet</h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Your booking history will appear here. Start by booking your first hotel!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="group bg-white/80 backdrop-blur-xl rounded-4xl p-8 shadow-2xl hover:shadow-3xl border border-white/50 hover:border-blue-200 transition-all duration-500 hover:-translate-y-3 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 rounded-4xl" />
                
                {/* Badge */}
                <div className="absolute top-6 right-6 bg-emerald-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-2xl shadow-2xl font-bold text-sm">
                  Confirmed ✅
                </div>

                {/* Hotel Name */}
                <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-3 relative z-10 line-clamp-1 group-hover:text-blue-900 transition-colors">
                  {b.hotelName}
                </h2>

                <p className="text-lg text-gray-600 mb-6 relative z-10">
                  📍 {b.location}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-8 relative z-10">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Check-in</span>
                    <span className="font-bold text-xl">{b.checkIn}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Check-out</span>
                    <span className="font-bold text-xl">{b.checkOut}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Nights</span>
                    <span className="font-bold text-xl text-blue-600">{b.days}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="relative z-10 mb-8">
                  <div className="flex items-center gap-2 text-4xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-1">
                    ₹{b.total}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                </div>

                {/* Actions */}
                <div className="relative z-10 flex gap-3 pt-6 border-t-2 border-gray-100">
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-6 rounded-3xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {bookings.length > 0 && (
          <div className="mt-20 grid md:grid-cols-4 gap-6 mb-20">
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-4xl shadow-2xl text-center border border-white/50">
              <div className="text-4xl font-black text-emerald-600 mb-2">{bookings.length}</div>
              <div className="text-xl font-bold text-gray-800">Total Bookings</div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-4xl shadow-2xl text-center border border-white/50">
              <div className="text-4xl font-black text-blue-600 mb-2">{bookings.reduce((sum, b) => sum + b.days, 0)}</div>
              <div className="text-xl font-bold text-gray-800">Nights Stayed</div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-4xl shadow-2xl text-center border border-white/50">
              <div className="text-4xl font-black text-purple-600 mb-2">₹{bookings.reduce((sum, b) => sum + b.total, 0).toLocaleString()}</div>
              <div className="text-xl font-bold text-gray-800">Total Spent</div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-4xl shadow-2xl text-center border border-white/50 md:col-span-1">
              <div className="text-2xl font-bold text-emerald-600 mb-2">All Confirmed</div>
              <div className="text-sm text-gray-600">100% Success Rate</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;