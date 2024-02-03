const weather_element = document.getElementById("weather");
const temperature_main_element = document.getElementById("temperature-main");
const weather_description_element = document.getElementById("weather-description");
const weather_icon_element = document.getElementById("icon");
const temperature_element = document.getElementById("temperature");
const humidity_element = document.getElementById("humidity");
const wind_speed_element = document.getElementById("wind-speed");
const country_element = document.getElementById("country");
const town_element = document.getElementById("city");
const weatherIcon_element = document.getElementById("wicon");



// Fetching Data for OpenWeatherMap API
const API_KEY = "bd437de9b986811a510f617c4f7f0d92";

const urlParams = new URLSearchParams(window.location.search);
var city =  urlParams.get("city");

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&q=${city}&units=metric`;

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      alert("Enter a valid city name!");
      return;
    }
    console.log("response:", response.json);
    return response.json();
  })
  .then((data) => {
    console.log("Weather Data:", data);

    var weather = data.weather[0].main;
    console.log('weather:', data.weather[0].main);
    
// Call the function with the weather description
setWeatherBackground(weather);

    const weather_description =  data.weather[0].description;
    const weather_icon = data.weather[0].icon;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const wind_speed = data.wind.speed;
    const town = data.name;
    const country = data.sys.country;

    weather_element.textContent = weather;
    country_element.textContent = country;
    town_element.textContent = town;
    temperature_main_element.textContent =`${temperature}°C`;
    weather_description_element.textContent = weather_description;
    humidity_element.textContent = `${humidity}%`;
    wind_speed_element.textContent = `${wind_speed}m/s`;
    temperature_element.textContent =`${temperature}°C`;

    
    weather_icon_element.src =  `https://openweathermap.org/img/wn/${weather_icon}@2x.png`;
    
  });

  
// Dynamic Background for any city current weather

const background_element = document.getElementById("background");

var background = new Array();
background[0] = "url('./images/clear.gif')";
background[1] = "url('./images/clouds.gif')";
background[2] = "url('./images/rain.gif')";
background[3] = "url('./images/snow.gif')";
background[4] = "url('./images/fog.gif')";
background[5] = "url('./images/night.gif')";
background[6] = "url('./images/thunderstorm.gif')";
background[7] = "url('./images/haze.gif')";
background[8] = "url('./images/mist.gif')";


// Function to set background based on weather description
function setWeatherBackground(weather) {
  var weatherIndex;

  switch (weather.toLowerCase()) {
    case "clear":
      weatherIndex = 0;
      break;
    case "clouds":
      weatherIndex = 1;
      break;
    case "rain":
      weatherIndex = 2;
      break;
    case "snow":
      weatherIndex = 3;
      break;
    case "fog":
      weatherIndex = 4;
      break;
    case "night":
      weatherIndex = 5;
      break;
    case "thunderstorm":
      weatherIndex = 6;
      break;
    case "haze":
      weatherIndex = 7;
      break;
    case "mist":
      weatherIndex = 8;
      break;
    default:
// Use a default background or handle unknown weather descriptions
      weatherIndex = 0;
  }

// Set the background image directly using style property
  background_element.style.backgroundImage = background[weatherIndex];
}

// Example usage:
const weatherData = { main: "Clear" }; // Replace this with your actual weather data
setWeatherBackground(weatherData.main.toLowerCase());


// 3 days weather forecast
// Function to format the date to show the next three days
function getNextThreeDays() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const nextThreeDays = [];

  for (let i = 1; i <= 5; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    const dayOfWeek = daysOfWeek[nextDay.getDay()];
    nextThreeDays.push(dayOfWeek);
  }

  return nextThreeDays;
}

// Function to update HTML with forecast data
async function updateWeatherForecast() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    const nextThreeDays = getNextThreeDays();

// Iterate through each day
    for (let i = 0; i < 5; i++) {
      const dayElement = document.getElementById(`day${i + 1}`);
      const iconElement = document.getElementById(`wicon${i + 1}`);
      const temperatureElement = document.getElementById(`temperature${i + 1}`);

// Updating HTML with forecast data
      dayElement.innerText = nextThreeDays[i];
      iconElement.src = `https://openweathermap.org/img/wn/${data.list[i * 8].weather[0].icon}.png`;
      temperatureElement.innerText = `${Math.round(data.list[i * 8].main.temp)}°C`;
    }

    console.log("Weather data updated successfully!");
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Execute the function to update weather forecast
updateWeatherForecast();

