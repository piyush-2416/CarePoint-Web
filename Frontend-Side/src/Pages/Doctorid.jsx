import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Doctorid() {
  const { id } = useParams(); // URL se product ID lega
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------- Appointment / Calendar state ----------
  const [showBooking, setShowBooking] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  const timeSlots = [
    "9:00 AM",
    "10:30 AM",
    "12:00 PM",
    "2:00 PM",
    "3:30 PM",
    "5:00 PM",
    "6:30 PM",
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    axios
      .get(`http://localhost:5173/api/Doctorid/${id}`) // 👈 Backend se single product fetch
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Product nahi mila!");
        setLoading(false);
      });
  }, [id]);

  // ---------- Calendar helpers ----------
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysArray = [];
    const startWeekday = firstDay.getDay();
    for (let i = 0; i < startWeekday; i++) daysArray.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) daysArray.push(new Date(year, month, d));
    return daysArray;
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSameDate = (a, b) => a && b && a.toDateString() === b.toDateString();

  const isToday = (date) => isSameDate(date, new Date());

  const changeMonth = (offset) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateClick = (date) => {
    if (!date || isPastDate(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setConfirmation(null);
  };

  const handleGetAppointmentClick = () => {
    setShowBooking(true);
    setTimeout(() => {
      document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) return;
    const appt = {
      id: Date.now(),
      date: selectedDate.toDateString(),
      time: selectedTime,
      doctor: product?.name,
    };
    setBookedAppointments((prev) => [...prev, appt]);
    setConfirmation(appt);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Loading state
  if (loading)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

  // Error state
  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "red" }}>{error}</h2>
        <Link to="/" style={{ color: "blue" }}>
          ← Home par wapas jao
        </Link>
      </div>
    );

  // Product nahi mila
  if (!product)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Product nahi mila 😕</h2>
        <Link to="/">← Home par wapas jao</Link>
      </div>
    );

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        {/* Product Card */}
        <div
          className="Doctor-card"
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "30px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "skyblue" }}>Your Appointment</h2>

          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                />
              )}
            </li>
            <li className="doclistsec">
              <h1 style={{ margin: "10px 0", fontSize: "28px", color: "#222" }}>
                {product.name}
              </h1>
              <h2 style={{ color: "skyblue", fontSize: "14px" }}>
                {product.specialization}
              </h2>
              <p style={{ color: "chocolate", fontSize: "14px" }}>
                {product.qualification}
              </p>
              <p style={{ color: "gray", fontSize: "14px" }}>|{product.experience}</p>

              <p style={{ color: "firebrick", fontSize: "14px" }}>
                <span style={{ color: "#0D9488" }}>PatientsTreated</span>{" "}
                {product.patientsTreated}
              </p>

              {product.consultationFee && (
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#059669",
                    fontSize: "21px",
                    margin: "10px 0",
                  }}
                >
                  Fee ₹{product.consultationFee}
                </p>
              )}

              <button
                onClick={handleGetAppointmentClick}
                style={{
                  marginTop: "25px",
                  padding: "14px 35px",
                  backgroundColor: "darkturquoise",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "18px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "100%",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "lightcoral")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "darkturquoise")}
              >
                Get Appointment
              </button>
            </li>
          </ul>
        </div>
      </div><hr/>  
       {/* ---------------- Booking Section ---------------- */}
      {showBooking && (
        <div
          id="booking-section"
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            fontFamily: "sans-serif",
            padding: "0 20px",
          }}
        >
          <h2 style={{ color: "white", textAlign: "center", background:"cornflowerblue", borderRadius:"3rem",padding:"0.5rem" }}>Book Your Appointment</h2>

          {/* Calendar Card */}
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: "14px",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              backgroundColor: "#fff",
            }}
          >
            {/* Month navigation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <button
                onClick={() => changeMonth(-1)}
                style={{
                  border: "none",
                  background: "#f1f5f9",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ‹
              </button>
              <h3 style={{ margin: 0 }}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={() => changeMonth(1)}
                style={{
                  border: "none",
                  background: "#f1f5f9",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ›
              </button>
            </div>

            {/* Weekday headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                fontWeight: "bold",
                color: "#888",
                marginBottom: "8px",
                fontSize: "13px",
              }}
            >
              {weekDays.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "6px",
              }}
            >
              {getDaysInMonth(currentMonth).map((date, i) => {
                const disabled = !date || isPastDate(date);
                const selected = isSameDate(date, selectedDate);
                return (
                  <button
                    key={i}
                    disabled={disabled}
                    onClick={() => handleDateClick(date)}
                    style={{
                      aspectRatio: "1",
                      border: isToday(date) && !selected ? "2px solid darkturquoise" : "1px solid #eee",
                      borderRadius: "8px",
                      background: selected ? "darkturquoise" : disabled ? "transparent" : "#fff",
                      color: selected ? "#fff" : disabled ? "#ccc" : "#222",
                      cursor: disabled ? "default" : "pointer",
                      fontWeight: selected ? "bold" : "normal",
                      fontSize: "14px",
                    }}
                  >
                    {date ? date.getDate() : ""}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          {selectedDate && (
            <div style={{ marginTop: "25px" }}>
              <h3 style={{ marginBottom: "10px" }}>
                Available times — {selectedDate.toDateString()}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "20px",
                      border: "1px solid darkturquoise",
                      background: selectedTime === t ? "darkturquoise" : "#fff",
                      color: selectedTime === t ? "#fff" : "darkturquoise",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Confirm button */}
          {selectedDate && selectedTime && (
        <button
  onClick={() => {
    handleConfirmBooking();

    alert(
      `✅ Appointment confirmed for ${selectedDate.toDateString()} at ${selectedTime}`
    );
  }}
  style={{
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    backgroundColor: "#059669",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Confirm Your Appointment — {selectedDate.toDateString()} at {selectedTime}
</button>
          )}

          {/* Confirmation message */}
          {confirmation && (
            <div
              style={{
                marginTop: "20px",
                padding: "14px",
                borderRadius: "8px",
                background: "#ecfdf5",
                color: "#065f46",
                border: "1px solid #a7f3d0",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              ✅ Appointment confirmed for {confirmation.date} at {confirmation.time}
            </div>
          )}


          {/* Booked appointments list */}
          {bookedAppointments.length > 0 && (
            <div style={{ marginTop: "30px" }}>
              <h3>Your Appointments</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {bookedAppointments.map((a) => (
                  <li
                    key={a.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <span>{a.date}</span>
                    <span style={{ color: "darkturquoise", fontWeight: "bold" }}>{a.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Doctorid;
