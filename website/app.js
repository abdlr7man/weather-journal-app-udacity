/* Global Variables */
const apiKey = "ae78ee01716fffc90c5012cc8126708f";
const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/* Update divs content */
const updateDivContent = (divId, value) => {
  document.getElementById(divId).innerHTML = value;
};

/* Weather data fetcher  */
const weatherDataFetcher = async () => {
  await fetch(
    `${openWeatherUrl}?zip=${zipCodeInput.value}&units=metric&appid=ae78ee01716fffc90c5012cc8126708f`
  )
    .then((response) => response.json())
    .then((serializedResponse) => {
      updateDivContent("date", newDate);
      updateDivContent("temp", Math.round(serializedResponse.main.temp));
      updateDivContent("content", userFeelingInput.value);
    });
};

/* Handlers */
const generateBtnClickHandler = () => {
  if (zipCodeInput.value.length > 0) {
    weatherDataFetcher();
  } else {
    alert("Please enter a zip code!!!");
  }
};

/* DOM elements selectors */
const zipCodeInput = document.getElementById("zip");
const userFeelingInput = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");

/* DOM event listeners */
generateBtn.addEventListener("click", generateBtnClickHandler);
