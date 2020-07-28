// Show UI

class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.description = document.getElementById('w-desc');
    this.temp = document.getElementById('w-temp');
    this.icon = document.getElementById('w-icon');

    this.humidity = document.getElementById('w-humidity');
    this.feelslike = document.getElementById('w-feels-like');
    this.pressure = document.getElementById('w-pressure');
    this.uvIndex = document.getElementById('w-uv-index');
    this.wind = document.getElementById('w-wind');
    this.precip = document.getElementById('w-precip');
  }

  render(weatherInfo) {
    this.hideSpinner();

    const { current, city, state } = weatherInfo;
    const {
      weather_descriptions = [],
      temperature,
      weather_icons,
      humidity,
      pressure,
      feelslike,
      uv_index,
      wind_speed,
      precip
    } = current || {};

    const { iconClass, weatherDescription } = Weather.getWeatherIcon(weather_descriptions[0]);

    // Main content
    this.location.innerHTML = `<span class="text-capital">${city || ''}${city && state ? ', ' : ''}${state}</span>`;

    // add icon
    this.icon.classList.add(iconClass);

    this.description.textContent = weatherDescription;
    this.temp.innerHTML = `${temperature}&deg;c`;

    // Parameters
    this.humidity.firstElementChild.innerHTML = `
		<div>${humidity}<span class="unit"> %</span></div>
	`;
    this.humidity.lastElementChild.textContent = 'Relative Humidity';

    this.feelslike.firstElementChild.innerHTML = `${feelslike}&deg;c`;
    this.feelslike.lastElementChild.textContent = 'Feels Like';

    this.pressure.firstElementChild.innerHTML = `
		<div>${pressure}<span class="unit"> hpa</span></div>
	`;
    this.pressure.lastElementChild.textContent = 'Pressure';

    this.uvIndex.firstElementChild.textContent = Weather.getUVIndex(uv_index);
    this.uvIndex.lastElementChild.textContent = 'UV Index';

    this.wind.firstElementChild.innerHTML = `
			<div>${wind_speed}<span class="unit"> km/h</span></div>
		`;
    this.wind.lastElementChild.textContent = 'Wind';

    this.precip.firstElementChild.textContent = `${precip}`;
    this.precip.lastElementChild.textContent = 'precipitation';
  }

  renderSpinner() {
    document.getElementById('w-spinner').style.display = 'block';
    document.getElementById('w-content').style.display = 'none';
  }

  hideSpinner() {
    document.getElementById('w-spinner').style.display = 'none';
    document.getElementById('w-content').style.display = 'block';
  }

  renderError(message, onModal = false) {
    // Clear Previous Timeouts
    const errMsg = document.getElementById('alert-error');
    if (errMsg) {
      errMsg.remove();
    }

    const errorEl = document.createElement('div');
    errorEl.classList = 'alert alert-danger text-center mx-auto p-2 mb-2 rounded';
    errorEl.id = 'alert-error';
    errorEl.textContent = message;

    let parentEl, refEl;
    if (onModal) {
      parentEl = document.getElementsByClassName('modal-content')[0];
      refEl = document.getElementsByClassName('modal-footer')[0];
    } else {
      parentEl = document.getElementsByClassName('row')[0];
      refEl = document.getElementById('w-content');
    }

    parentEl.insertBefore(errorEl, refEl);

    setTimeout(() => {
      errorEl.remove();
    }, 2000);
  }
}
