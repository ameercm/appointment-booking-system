const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database("./appointments.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to SQLite database.");
});

// Create table for appointments
db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    UNIQUE(date, time) -- Prevent double booking
)`);

// Function to generate available slots
const generateSlots = () => {
  const slots = [];
  const startTime = 10;
  const endTime = 17;

  for (let hour = startTime; hour < endTime; hour++) {
    if (hour === 13) continue; // Skip break time (1-2 PM)
    slots.push(`${hour}:00`, `${hour}:30`);
  }
  return slots;
};

// API: Fetch available slots for a given date
app.get("/slots", (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "Date is required" });

  db.all(
    `SELECT time FROM appointments WHERE date = ?`,
    [date],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      const bookedSlots = rows.map((row) => row.time);
      const availableSlots = generateSlots().filter(
        (slot) => !bookedSlots.includes(slot)
      );

      res.json({ date, availableSlots });
    }
  );
});

// API: Book an appointment
app.post("/book", (req, res) => {
  const { name, phone, date, time } = req.body;
  if (!name || !phone || !date || !time)
    return res.status(400).json({ error: "All fields are required" });

  db.run(
    `INSERT INTO appointments (name, phone, date, time) VALUES (?, ?, ?, ?)`,
    [name, phone, date, time],
    function (err) {
      if (err) return res.status(400).json({ error: "Slot already booked" });
      res.json({ message: "Appointment booked successfully", id: this.lastID });
    }
  );
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
