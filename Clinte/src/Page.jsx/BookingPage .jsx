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
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-300 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* 🔙 Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-600 hover:text-black"
        >
          ← Back
        </button>

        {/* 🔥 Main Card */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {HotelOne?.name}
            </h1>
            <p className="text-gray-500 mt-1">📍 {HotelOne?.location}</p>

            <div className="mt-4 text-2xl font-bold text-green-600">
              ₹{HotelOne?.price}
              <span className="text-sm text-gray-500 ml-1">/night</span>
            </div>

            {/* FORM */}
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="p-3 border rounded-xl"
                />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="p-3 border rounded-xl"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleConfirm}
              disabled={isConfirmed}
              className={`w-full mt-6 py-3 rounded-xl font-semibold transition ${
                isConfirmed
                  ? "bg-gray-400"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isConfirmed ? "Booked ✅" : "Confirm Booking"}
            </button>
          </div>

          {/* RIGHT */}
          {isConfirmed && confirmedData && (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Name</span>
                  <span>{confirmedData.clientName}</span>
                </div>

                <div className="flex justify-between">
                  <span>Email</span>
                  <span>{confirmedData.email}</span>
                </div>

                <div className="flex justify-between">
                  <span>Check-In</span>
                  <span>{confirmedData.checkIn}</span>
                </div>

                <div className="flex justify-between">
                  <span>Check-Out</span>
                  <span>{confirmedData.checkOut}</span>
                </div>

                <div className="flex justify-between">
                  <span>Nights</span>
                  <span>{confirmedData.days}</span>
                </div>
              </div>

              {/* PRICE BOX */}
              <div className="mt-6 bg-gray-100 p-5 rounded-xl">
                <div className="flex justify-between text-gray-600">
                  <span>Price × Nights</span>
                  <span>
                    ₹{HotelOne?.price} × {confirmedData.days}
                  </span>
                </div>

                <div className="border-t mt-3 pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-green-600">₹{confirmedData.total}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
