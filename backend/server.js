import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage
let events = [];
let attendees = [];

// Test route
app.get("/", (req, res) => {
  res.send("Event Registration Backend is Running...");
});

// Create Event
app.post("/events", (req, res) => {
  const { title, date, description } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Title and Date are required" });
  }

  const newEvent = {
    id: uuidv4(),
    title,
    date,
    description,
  };

  events.push(newEvent);

  res.status(201).json({
    message: "Event created successfully",
    event: newEvent,
  });
});

// Get All Events
app.get("/events", (req, res) => {
  res.json(events);
});

// Register Attendee
app.post("/register", (req, res) => {
  const { name, email, eventId } = req.body;

  if (!name || !email || !eventId) {
    return res.status(400).json({ message: "Name, Email, and Event ID are required" });
  }

  // Check if event exists
  const eventFound = events.find((e) => e.id === eventId);
  if (!eventFound) {
    return res.status(404).json({ message: "Event not found" });
  }

  const qrId = uuidv4(); // unique QR code id

  const newAttendee = {
    id: uuidv4(),
    name,
    email,
    eventId,
    qrId,
  };

  attendees.push(newAttendee);

  res.status(201).json({
    message: "Registration successful",
    attendee: newAttendee,
  });
});

// Get All Attendees (Admin Panel)
app.get("/attendees", (req, res) => {
  res.json(attendees);
});

// Verify QR
app.post("/verify", (req, res) => {
  const { qrId } = req.body;

  if (!qrId) {
    return res.status(400).json({ message: "QR ID is required" });
  }

  const found = attendees.find((a) => a.qrId === qrId);

  if (!found) {
    return res.status(404).json({ message: "QR not valid" });
  }

  res.json({
    message: "QR Verified",
    attendee: found,
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
