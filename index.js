// index.js
//const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");

fetchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const stateAbbr = input.value.toUpperCase();
  fetchWeatherAlerts(stateAbbr);
  input.value = "";
});

async function fetchWeatherAlerts(state) {
  try {
    if(!state || state.trim() === ""){
  showError("Please enter a state code")
  return
}
    const STATE_ABBR = state;
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${STATE_ABBR}`,
    );

    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
    const data = await response.json();
    clearError();
    displayAlerts(data);
  } catch (error) {
    clearAlerts();
    showError(error.message);
  }
}

function displayAlerts(data) {
  const alertsDisplay = document.getElementById("alerts-display");
  alertsDisplay.innerText = "";
  if (data.title) {
    const div = document.createElement("div");
    div.innerText = data.title;
    alertsDisplay.appendChild(div);
  }
  if(!data.features || data.features.length === 0){
  alertsDisplay.innerText = "No alerts found"
  return
}
  data.features.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item.properties.headline;
    alertsDisplay.appendChild(li);
  });
}
function showError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.style.display = "block";
  errorDiv.innerText = message;
}

function clearError() {
  const errorDiv = document.getElementById("error-message");
  errorDiv.style.display = "none";
  errorDiv.innerText = "";
}
function clearAlerts() {
  document.getElementById("alerts-display").innerText = "";
}