//  import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOneHotel } from "../Slice/GetOneSlice";

// const BookingPage = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const { HotelOne } = useSelector((state) => state.HotelOne);

//   // ✅ States
//   const [clientName, setClientName] = useState("");
//   const [email, setEmail] = useState("");
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");

//   useEffect(() => {
//     dispatch(fetchOneHotel(id));
//   }, [dispatch, id]);

//   // ✅ Days Calculation
//   let days = 0;

//   if (checkIn && checkOut) {
//     const start = new Date(checkIn);
//     const end = new Date(checkOut);

//     const diff = end - start;

//     days = Math.ceil(diff / (1000 * 60 * 60 * 24));
//   }

//   // ✅ Total Price
//   const total = days * (HotelOne?.price || 0);

//   // ✅ Confirm Booking
//   const handleConfirm = () => {
//     if (!clientName) {
//       alert("Enter Name ❌");
//       return;
//     }

//     if (!email) {
//       alert("Enter Email ❌");
//       return;
//     }

//     if (days <= 0) {
//       alert("Invalid Dates ❌");
//       return;
//     }

//     const bookingData = {
//       clientName,
//       email,
//       hotelName: HotelOne?.name,
//       location: HotelOne?.location,
//       price: HotelOne?.price,
//       checkIn,
//       checkOut,
//       days,
//       total,
//       id: Date.now(),
//     };

//     // 🔥 Get old bookings
//     const oldBookings =
//       JSON.parse(localStorage.getItem("bookings")) || [];

//     // 🔥 Add new booking
//     const updatedBookings = [...oldBookings, bookingData];

//     // 🔥 Save to localStorage
//     localStorage.setItem("bookings", JSON.stringify(updatedBookings));

//     alert(
//       `Booking Confirmed ✅\nName: ${clientName}\nEmail: ${email}\nTotal: ₹${total}`
//     );

//     // 🔥 Reset form
//     setClientName("");
//     setEmail("");
//     setCheckIn("");
//     setCheckOut("");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Booking Page</h1>

//       {/* Hotel Info */}
//       <div>
//         <h2>{HotelOne?.name}</h2>
//         <p>{HotelOne?.location}</p>
//         <p>₹{HotelOne?.price} / night</p>
//       </div>

//       <br />

//       {/* Name */}
//       <label>Name:</label>
//       <input
//         type="text"
//         placeholder="Enter your name"
//         value={clientName}
//         onChange={(e) => setClientName(e.target.value)}
//       />

//       <br /><br />

//       {/* Email */}
//       <label>Email:</label>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <br /><br />

//       {/* Dates */}
//       <label>Check-In:</label>
//       <input
//         type="date"
//         value={checkIn}
//         onChange={(e) => setCheckIn(e.target.value)}
//       />

//       <br /><br />

//       <label>Check-Out:</label>
//       <input
//         type="date"
//         value={checkOut}
//         onChange={(e) => setCheckOut(e.target.value)}
//       />

//       <br /><br />

//       {/* Summary */}
//       <h3>Days: {days}</h3>
//       <h3>Total Price: ₹{total}</h3>

//       <br />

//       {/* Button */}
//       <button onClick={handleConfirm}>
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default BookingPage;

// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOneHotel } from "../Slice/GetOneSlice";

// const BookingPage = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { HotelOne } = useSelector((state) => state.HotelOne);

//   const [clientName, setClientName] = useState("");
//   const [email, setEmail] = useState("");
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [isConfirmed, setIsConfirmed] = useState(false);

//   useEffect(() => {
//     dispatch(fetchOneHotel(id));
//   }, [dispatch, id]);

//   let days = 0;

//   if (checkIn && checkOut) {
//     const start = new Date(checkIn);
//     const end = new Date(checkOut);
//     const diff = end - start;
//     days = Math.ceil(diff / (1000 * 60 * 60 * 24));
//   }

//   const total = days * (HotelOne?.price || 0);

//   const handleConfirm = () => {
//     if (!clientName) return alert("Enter Name ❌");
//     if (!email) return alert("Enter Email ❌");
//     if (days <= 0) return alert("Invalid Dates ❌");

//     const bookingData = {
//       clientName,
//       email,
//       hotelName: HotelOne?.name,
//       location: HotelOne?.location,
//       price: HotelOne?.price,
//       checkIn,
//       checkOut,
//       days,
//       total,
//       id: Date.now(),
//     };

//     const oldBookings =
//       JSON.parse(localStorage.getItem("bookings")) || [];

//     localStorage.setItem(
//       "bookings",
//       JSON.stringify([...oldBookings, bookingData])
//     );

//     setIsConfirmed(true);

//     alert(`Booking Confirmed ✅\nTotal: ₹${total}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">

//       {/* 🔥 Back Button (Perfect Position) */}
//       <div className="w-full max-w-4xl mb-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-200 transition text-gray-700"
//         >
//           ← <span>Back</span>
//         </button>
//       </div>

//       {/* 🔥 Main Card */}
//       <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 grid md:grid-cols-2 gap-6">

//         {/* 🔥 Left - Form */}
//         <div>
//           <h1 className="text-2xl font-bold">{HotelOne?.name}</h1>
//           <p className="text-gray-500 mt-1">📍 {HotelOne?.location}</p>

//           <h2 className="text-xl font-semibold text-green-600 mt-3">
//             ₹{HotelOne?.price}
//             <span className="text-sm text-gray-500"> /night</span>
//           </h2>

//           <div className="mt-6 space-y-3">
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={clientName}
//               onChange={(e) => setClientName(e.target.value)}
//               className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//             />

//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//             />

//             <input
//               type="date"
//               value={checkIn}
//               onChange={(e) => setCheckIn(e.target.value)}
//               className="w-full border p-2 rounded-lg"
//             />

//             <input
//               type="date"
//               value={checkOut}
//               onChange={(e) => setCheckOut(e.target.value)}
//               className="w-full border p-2 rounded-lg"
//             />
//           </div>

//           {/* 🔥 Button */}
//           <button
//             onClick={handleConfirm}
//             disabled={isConfirmed}
//             className={`w-full mt-5 py-2 rounded-xl transition ${
//               isConfirmed
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-black text-white hover:bg-gray-800"
//             }`}
//           >
//             {isConfirmed ? "Booked ✅" : "Confirm Booking"}
//           </button>
//         </div>

//         {/* 🔥 Right - Summary */}
//         {isConfirmed && (
//           <div className="bg-gray-50 rounded-xl p-5 shadow-inner">
//             <h2 className="text-xl font-semibold mb-4">
//               Booking Summary
//             </h2>

//             <div className="space-y-2 text-gray-700">
//               <p><strong>Name:</strong> {clientName}</p>
//               <p><strong>Email:</strong> {email}</p>
//               <p><strong>Check-In:</strong> {checkIn}</p>
//               <p><strong>Check-Out:</strong> {checkOut}</p>
//               <p><strong>Days:</strong> {days}</p>
//             </div>

//             <div className="mt-4 border-t pt-3 flex justify-between items-center">
//               <span className="text-lg font-bold">Total</span>
//               <span className="text-xl font-bold text-green-600">
//                 ₹{total}
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneHotel } from "../Slice/GetOneSlice";

const BookingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { HotelOne } = useSelector((state) => state.HotelOne);

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);

  useEffect(() => {
    dispatch(fetchOneHotel(id));
  }, [dispatch, id]);

  let days = 0;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }

  const total = days * (HotelOne?.price || 0);

  const handleConfirm = () => {
    if (!clientName) return alert("Enter Name ❌");
    if (!email) return alert("Enter Email ❌");
    if (days <= 0) return alert("Invalid Dates ❌");

    const bookingData = {
        id: Date.now(),
      clientName,
      email,
      hotelName: HotelOne?.name,
      location: HotelOne?.location,
      checkIn,
      checkOut,
      days,
      total,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const updatedBookings = [...existingBookings, bookingData];

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setConfirmedData(bookingData);
    setIsConfirmed(true);
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
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
            <h1 className="text-4xl font-bold text-gray-800">Secure Booking</h1>
            <p className="text-xl text-gray-600 mt-1">{HotelOne?.name}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Booking Form */}
          <div className="bg-white/70 backdrop-blur-xl rounded-4xl p-12 shadow-2xl border border-white/50">
            <div className="space-y-2 mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {HotelOne?.name}
              </h2>
              <p className="text-2xl text-gray-600">📍 {HotelOne?.location}</p>
              <div className="text-3xl font-black text-emerald-600 mt-2">
                ₹{HotelOne?.price} <span className="text-lg text-gray-600 font-normal">/night</span>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-6 py-5 text-xl rounded-3xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-xl"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-5 text-xl rounded-3xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-6 py-5 text-xl rounded-3xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all shadow-xl"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-6 py-5 text-xl rounded-3xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all shadow-xl"
                  />
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-2xl font-bold text-gray-700">
                  {days > 0 && `${days} Nights`}
                </p>
                <p className="text-4xl font-black text-emerald-600">
                  ₹{total}
                </p>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={isConfirmed}
                className={`w-full py-6 px-8 rounded-3xl text-xl font-bold shadow-2xl transform transition-all duration-300 group focus:outline-none focus:ring-4 ${
                  isConfirmed
                    ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed shadow-lg"
                    : "bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 hover:shadow-3xl hover:-translate-y-1 text-white shadow-xl group-hover:shadow-emerald-500/25"
                }`}
              >
                {isConfirmed ? (
                  <>
                    <span className="flex items-center gap-2 justify-center">
                      <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Booking Confirmed ✅
                    </span>
                  </>
                ) : (
                  "Confirm & Book Now"
                )}
              </button>
            </form>
          </div>

          {/* Summary */}
          {isConfirmed && confirmedData && (
            <div className="lg:sticky lg:top-20 h-fit bg-white/90 backdrop-blur-xl rounded-4xl p-12 shadow-2xl border border-white/50">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Booking Confirmed!
              </h2>
              <div className="space-y-6 text-lg">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Name</span>
                  <span>{confirmedData.clientName}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Email</span>
                  <span>{confirmedData.email}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Check-in</span>
                  <span>{confirmedData.checkIn}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Check-out</span>
                  <span>{confirmedData.checkOut}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Nights</span>
                  <span className="font-bold">{confirmedData.days}</span>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t-4 border-emerald-200 bg-emerald-50 rounded-3xl p-6">
                <div className="flex justify-between items-center text-3xl font-black">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                    ₹{total}
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-emerald-700 font-medium">Check your History tab or email for details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
