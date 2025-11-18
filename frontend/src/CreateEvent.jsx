import { useState } from "react";
import axios from "axios";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const backendUrl = "https://practical-peace-production.up.railway.app";


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backendUrl}/events`, {
        title,
        date,
        description
      });

      setMessage("Event created successfully!");
      setTitle("");
      setDate("");
      setDescription("");

    } catch (error) {
      setMessage("Error creating event");
    }
  };

  return (
    <div>
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>
        <label>Event Title:</label>
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Date:</label>
        <input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Create Event</button>
      </form>

      {message && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}

export default CreateEvent;
