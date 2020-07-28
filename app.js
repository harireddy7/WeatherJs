const store = new LocalStorage();
const weather = new Weather();
const ui = new UI();

function getWeatherData() {
  ui.renderSpinner();
  weather
    .getWeather()
    .then(response => {
      ui.hideSpinner();
      // console.log(response);
      if (response && Object.keys(response).includes('current') && response.current) {
        ui.render(response);
      } else {
        ui.renderError(response.message);
      }
    })
    .catch(error => {
      ui.hideSpinner();
      console.log(error);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
  const { city, state } = store.getLocation();
  if (city || state) {
    weather.changeLocation(city, state);
    getWeatherData();
  }
});

// SaveChanges
document.getElementById('btn-save-changes').addEventListener('click', function () {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  store.storeLocation(city, state);
  weather.changeLocation(city, state);

  if (!city && !state) {
    ui.renderError('Please Enter Valid City & State', true);
  } else {
    getWeatherData();
    // Close Modal
    $('#changeLocationBtn').modal('hide');
  }
});
