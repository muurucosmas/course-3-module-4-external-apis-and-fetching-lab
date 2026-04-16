// Your code here!

const abbrInput = document.querySelector('#state-input');
const btn = document.querySelector('#fetch-alerts');
const alertsDisplay = document.querySelector('#alerts-display');
const errorSection = document.querySelector('#error-message');

btn.addEventListener('click', () => {
	const state = abbrInput.value;

	displayAlerts(state);

	// reset the form
	abbrInput.value = '';
});

function displayAlerts(state) {
	fetch(`https://api.weather.gov/alerts/active?area=${state}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			const title = document.createElement('h2');
			const list = document.createElement('ul');

			// display info
			if (data) {
				const len = data.features.length;
				const features = data.features;
				title.innerHTML = `${data.title}: ${len}`;
				alertsDisplay.append(title);
				features.forEach((feature) => {
					const li = document.createElement('li');
					li.textContent = feature.properties.headline;
					list.append(li);
				});

        
				// add features
				alertsDisplay.append(list);
			}

			errorSection.innerHTML = '';
			errorSection.classList.add('hidden');
		})
		.catch((error) => {
			errorSection.classList.remove('hidden');
			errorSection.append(error.message);
		});
}
/*const input = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
 const alertsDisplay = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

fetchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const stateAbbr = input.value.toUpperCase();
  fetchWeatherAlerts(stateAbbr);
  input.value = "";
});

async function fetchWeatherAlerts(state) {
  try {
   () if(!state || state.trim() === ""){
  showError("Please enter a state code")
  return
}
    const STATE_ABBR = state;
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${STATE_ABBR}`,
    );

    if (!response.ok) {
      throw new Error("network failure");
    }
    const data = await response.json();
    console.log(data)
      clearError();
    displayAlerts(data);
  
  } catch (error) {
    clearAlerts();
    showError(error.message);
  }
}

function displayAlerts(data) {
 
  //alertsDisplay.innerHTML = "";

   const count =  data.features.length;

  const list =document.createElement('ul')
    const title = document.createElement("h2");
    title.textContent = `Weather Alerts: ${count}`;
    alertsDisplay.appendChild(title);
  
 
  if(!data.features || data.features.length === 0){
  return;
}
  data.features.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item.properties.headline;
    list.appendChild(li);
  });
  alertsDisplay.append(list)
}
function showError(message) {
 
  errorDiv.classList.remove("hidden")
  errorDiv.style.display = "block";
  errorDiv.innerText = message;
}

function clearError() {
  errorDiv.classList.add("hidden")
  errorDiv.style.display = "none";
  errorDiv.innerText = "";

}
function clearAlerts() {
alertsDisplay.innerText = "";
}*/