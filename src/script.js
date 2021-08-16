function reloadDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");


  let forecastHMTL = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHMTL =
      forecastHMTL +
      `<div class="col-2">
      <div class="forecast-time">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="50"
      />
      <div class="forecast-temperature">
        <span class="forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>`;
    }
  });
  forecastHMTL = forecastHMTL + `</div>`;
  forecastElement.innerHTML = forecastHMTL;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "28cb46b69606bec80c014881bb5a9afa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let mainTemperature = Math.round(response.data.main.temp);
  let maxTemperature = Math.round(response.data.main.temp_max);
  let minTemperature = Math.round(response.data.main.temp_min);
  let searchedCity = response.data.name;
  let sky = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);

  celsiusTemperature = response.data.main.temp;

  let displayCity = document.querySelector("#searched-city");
  let displayMainTemperature = document.querySelector("#current-temp");
  let displayMaxTemperature = document.querySelector("#max-temp-searched-city");
  let displayMinTemperature = document.querySelector("#min-temp-searched-city");
  let description = document.querySelector("#sky");
  let displayHumidity = document.querySelector("#humidity");
  let displayWindSpeed = document.querySelector("#wind-speed");
  let displayCurrentDate = document.querySelector("#current-date");
  let displayIcon = document.querySelector("#icon");
  displayCity.innerHTML = `${searchedCity}`;
  displayMainTemperature.innerHTML = `${mainTemperature}`;
  displayMaxTemperature.innerHTML = `Max ${maxTemperature}°C`;
  displayMinTemperature.innerHTML = `Min ${minTemperature}°C`;
  description.innerHTML = `${sky}`;
  displayHumidity.innerHTML = `Humidity: ${humidity}%`;
  displayWindSpeed.innerHTML = `Wind Speed: ${windSpeed}km/h`;
  displayCurrentDate.innerHTML = reloadDate(response.data.dt * 1000);
  displayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#submit-button");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-temperature");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-temperature");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchedCity("Edinburgh");
