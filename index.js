const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

  const APIKey = '4d90a152893122f01facb587064f9524';
  const city = document.querySelector('.search-box input').value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');


      switch (json.weather[0].main) {

        case 'Clear':
          image.src = 'images/clear.png';
          break;

        case 'Rain':
          image.src = 'images/rain.png';
          break;

        case 'Snow':
          image.src = 'images/snow.png';
          break;

        case 'Clouds':
          image.src = 'images/cloud.png';
          break;

        case 'Haze':
          image.src = 'images/mist.png';
          break;

        default:
          image.src = '';
      }


      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      //parseInt(json.main.temp)*9.0/5.0) + 32   <- FAHRENHEIGHT CALCULATION
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
    });


});

// EXAMPLE RESPONSE FROM API
// {
//   "coord": {
//     "lon": 10.5,
//       "lat": 51.5
//   },
//   "weather": [
//     {
//       "id": 500,
//       "main": "Rain",
//       "description": "light rain",
//       "icon": "10n"
//     }
//   ],
//     "base": "stations",
//       "main": {
//     "temp": 13.94,
//       "feels_like": 13.69,
//         "temp_min": 12.25,
//           "temp_max": 14.09,
//             "pressure": 1008,
//               "humidity": 88,
//                 "sea_level": 1008,
//                   "grnd_level": 972
//   },
//   "visibility": 10000,
//     "wind": {
//     "speed": 1.56,
//       "deg": 215,
//         "gust": 2.11
//   },
//   "rain": {
//     "1h": 0.13
//   },
//   "clouds": {
//     "all": 100
//   },
//   "dt": 1682207982,
//     "sys": {
//     "type": 2,
//       "id": 2021121,
//         "country": "DE",
//           "sunrise": 1682222773,
//             "sunset": 1682274373
//   },
//   "timezone": 7200,
//     "id": 2921044,
//       "name": "Germany",
//         "cod": 200
// }
