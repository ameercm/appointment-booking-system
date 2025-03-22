📌 Appointment Booking System
A simple appointment booking system built with Node.js (Express), SQLite, and a reusable frontend plugin.

🚀 Features
✅ View available appointment slots (30-minute intervals from 10 AM - 5 PM, excluding 1-2 PM)
✅ Book appointments (prevents double booking)
✅ API endpoints to fetch and create appointments
✅ Frontend JavaScript plugin to embed on any website

🛠️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/ameercm/appointment-booking-system.git
cd appointment-booking-system

2️⃣ Install Dependencies
npm install

3️⃣ Start the Server
node server.js
The backend will run on http://localhost:3000.

4️⃣ Run the Frontend Plugin
Open the index.html file in a browser.

The UI will load, allowing users to view available slots and book appointments.
Alternatively, start a local HTTP server:
npx http-server .
Then open http://localhost:8080 in a browser.

🔗 API Endpoints

GET	/slots?date=YYYY-MM-DD	Fetch available slots for a given date

POST	/book	Book an appointment

🔹 Booking an Appointment (POST)

Send a JSON request to /book:
{
  "name": "John Doe",
  "phone": "1234567890",
  "date": "2025-03-23",
  "time": "10:30"
}

🖥️ Embedding the Plugin

To use the booking system on any webpage, include this script:
<script src="booking.js"></script>

📂 Project Structure

appointment-booking-system/

│── server.js         # Backend (Node.js, Express, SQLite)

│── booking.js        # Reusable frontend booking plugin

│── index.html        # Demo page for testing the plugin

│── package.json      # Node.js dependencies

│── appointments.db   # SQLite database (auto-created)

│── .gitignore        # Files to exclude from Git

└── README.md         # Project documentation
