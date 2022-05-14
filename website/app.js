/* Global Variables */
const apiKey = "ae78ee01716fffc90c5012cc8126708f";
const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

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
    })
    .then((dataToCache) => {
      return postDataToServer(dataToCache);
    });
};

const getServerData = async () => {
  try {
    const response = await fetch("/data");
    const data = await response.json();

    const divData = document.getElementById("server-data");
    divData.innerHTML = JSON.stringify(data.date);
  }  catch (error) {
    alert(error);
  }
}


const postDataToServer = async (dataToSend) => {
  try {
    const req = await fetch("/data", {
      method: "POST",

      body: JSON.stringify({cache: dataToSend}),
      credentials: 'same-origin',
      headers: {
            'Content-Type': 'application/json',
        },

    });

    const responseData = await req.json();
  } catch (error) {
    alert(error);
  }
}
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
