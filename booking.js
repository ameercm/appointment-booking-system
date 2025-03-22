(async function () {
  const apiBaseUrl = "http://localhost:3000";

  // Create UI elements
  const container = document.createElement("div");
  container.style = "padding: 20px; border: 1px solid #ccc; width: 300px;";

  container.innerHTML = `
        <h3>Book an Appointment</h3>
        <label>Name: <input id="name" type="text"></label><br><br>
        <label>Phone: <input id="phone" type="text"></label><br><br>
        <label>Date: <input id="date" type="date"></label><br><br>
        <label>Time Slot: <select id="slots"><option>Select a date first</option></select></label><br><br>
        <button id="bookBtn">Book</button>
        <p id="status"></p>
    `;

  document.body.appendChild(container);

  const dateInput = document.getElementById("date");
  const slotsDropdown = document.getElementById("slots");
  const bookBtn = document.getElementById("bookBtn");
  const statusText = document.getElementById("status");

  // Fetch available slots
  dateInput.addEventListener("change", async () => {
    const date = dateInput.value;
    if (!date) return;

    const response = await fetch(`${apiBaseUrl}/slots?date=${date}`);
    const data = await response.json();

    slotsDropdown.innerHTML = data.availableSlots.length
      ? data.availableSlots
          .map((slot) => `<option value="${slot}">${slot}</option>`)
          .join("")
      : "<option>No slots available</option>";
  });

  // Book an appointment
  bookBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = dateInput.value;
    const time = slotsDropdown.value;

    if (!name || !phone || !date || !time) {
      statusText.innerText = "Please fill all fields.";
      return;
    }

    const response = await fetch(`${apiBaseUrl}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, date, time }),
    });

    const result = await response.json();
    statusText.innerText = result.message || "Error booking appointment";
  });
})();
