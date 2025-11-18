import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

function Register() {
  const backendUrl = "http://localhost:5000";

  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventId, setEventId] = useState("");
  const [qrId, setQrId] = useState("");

  useEffect(() => {
    axios.get(`${backendUrl}/events`).then((res) => setEvents(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${backendUrl}/register`, {
      name,
      email,
      eventId,
    });

    setQrId(res.data.attendee.qrId);
  };

  return (
    <div>
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Select Event:</label>
        <select value={eventId} onChange={(e) => setEventId(e.target.value)} required>
          <option value="">Choose event</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>{ev.title}</option>
          ))}
        </select>

        <button>Register</button>
      </form>

      {/* QR Code */}
      {qrId && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Your QR Code</h3>
          <QRCodeSVG value={qrId} size={200} />
        </div>
      )}
    </div>
  );
}

export default Register;
