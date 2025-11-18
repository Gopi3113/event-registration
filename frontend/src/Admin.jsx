import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const backendUrl = "https://practical-peace-production.up.railway.app";

  const [attendees, setAttendees] = useState([]);
  const [qrInput, setQrInput] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/attendees`)
      .then(res => setAttendees(res.data));
  }, []);

  const verifyQr = async () => {
    try {
      const res = await axios.post(`${backendUrl}/verify`, { qrId: qrInput });
      setVerifyResult({ success: true, attendee: res.data.attendee });
    } catch {
      setVerifyResult({ success: false });
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Attendee List</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event ID</th>
            <th>QR ID</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.eventId}</td>
              <td>{a.qrId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "40px" }}>Verify QR Code</h3>

      <input 
        placeholder="Enter QR ID" 
        value={qrInput} 
        onChange={(e) => setQrInput(e.target.value)} 
      />

      <button onClick={verifyQr}>Verify</button>

      {verifyResult && (
        <div style={{ marginTop: "20px" }}>
          {verifyResult.success ? (
            <div style={{ color: "green" }}>
              <h4>QR Verified</h4>
              <p>Name: {verifyResult.attendee.name}</p>
              <p>Email: {verifyResult.attendee.email}</p>
            </div>
          ) : (
            <p style={{ color: "red" }}>Invalid QR Code</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
