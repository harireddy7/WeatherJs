// Make Calls to get weather
class Weather {
  constructor(city, state) {
    this.state = state;
    this.city = city;
    this.accessKey = '47ec6c85b1d7f641dcc557463bfafbf6';
  }

  async getWeather() {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${this.accessKey}&query=${this.city},${this.state}`
    );

    const responseData = await response.json();
    const keys = Object.keys(responseData);
    if (keys.includes('current')) {
      return { current: responseData.current, city: this.city, state: this.state };
    }
    return { message: 'Failed to fetch latest weather!' };
  }

  changeLocation(city, state) {
    this.state = state;
    this.city = city;
  }

  static getWeatherIcon(description) {
    let iconClass = 'full_clouds';
    let weatherDescription = description;

    switch (description) {
      case 'Partly Cloudy':
        iconClass = 'partly_cloudy';
        break;

      case 'Haze':
      case 'Overcast':
        iconClass = 'full_clouds';
        break;

      case 'Clear':
        iconClass = 'night';
        break;

      case 'Patchy Light Drizzle':
        iconClass = 'sun_rain_clouds';
        weatherDescription = 'Light Drizzle';
        break;

      case 'Sunny':
        iconClass = 'full_sun';
        break;

      case 'Patchy Rain Possible':
        iconClass = 'cloud_slight_rain';
        weatherDescription = 'Patchy Rain';
        break;

      case 'Light Rain':
      case 'Light Rain, Mist':
        iconClass = 'cloud_slight_rain';
        break;

      case 'Moderate Or Heavy Rain Shower':
      case 'Light Rain With Thunderstorm, Rain With Thunderstorm':
        iconClass = 'rainy';
        weatherDescription = 'Heavy Rain';
        break;

      case 'Thunder':
      case 'Light Rain With Thunderstorm, Rain With Thunderstorm':
        iconClass = 'thunder';
        break;

      default:
        iconClass = 'full_clouds';
        break;
    }

    return { iconClass, weatherDescription };
  }

  static getUVIndex(uvIndex) {
    // <3 => weak
    // >3 & <6 => moderate
    // >= 6 && <8 =>
    if (uvIndex <= 2) {
      return 'Weak';
    } else if (uvIndex <= 7) {
      return 'Moderate';
    } else if (uvIndex <= 10) {
      return 'High';
    } else {
      return 'Extreme';
    }
  }
}
