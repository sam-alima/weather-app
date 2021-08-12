let now = new Date();

function reloadDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];

  let formattedDate = `${day}, ${hour}:${minutes}`;
  return formattedDate;
}
let currentTime = document.querySelector("#current-date");
currentTime.innerHTML = reloadDate(now);
//
function showTemperature(response) {
  console.log(response.data);
  let mainTemperature = Math.round(response.data.main.temp);
  let maxTemperature = Math.round(response.data.main.temp_max);
  let minTemperature = Math.round(response.data.main.temp_min);
  let searchedCity = response.data.name;
  let sky = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let displayCity = document.querySelector("#searched-city");
  let displayMainTemperature = document.querySelector("#current-temp");
  let displayMaxTemperature = document.querySelector("#max-temp-searched-city");
  let displayMinTemperature = document.querySelector("#min-temp-searched-city");
  let description = document.querySelector("#sky");
  let displayHumidity = document.querySelector("#humidity");
  let displayWindSpeed = document.querySelector("#wind-speed");
  displayCity.innerHTML = `${searchedCity}`;
  displayMainTemperature.innerHTML = `${mainTemperature}`;
  displayMaxTemperature.innerHTML = `Max ${maxTemperature}°C`;
  displayMinTemperature.innerHTML = `Min ${minTemperature}°C`;
  description.innerHTML = `${sky}`;
  displayHumidity.innerHTML = `Humidity: ${humidity}%`;
  displayWindSpeed.innerHTML = `Wind Speed: ${windSpeed}km/h`;
}

function searchedCity(city) {
  let apiKey = "28cb46b69606bec80c014881bb5a9afa";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchedCity(city);
}
let form = document.querySelector("#submit-button");
form.addEventListener("submit", handleSubmit);

searchedCity("Edinburgh");

//
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "28cb46b69606bec80c014881bb5a9afa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
