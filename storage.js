class LocalStorage {
  constructor() {
    this.defaultValues = {
      city: 'Hyderabad',
      state: 'Telangana'
    };
    this.city = localStorage.getItem('city');
    this.state = localStorage.getItem('state');
  }

  storeLocation(city, state) {
    localStorage.setItem('city', city);
    localStorage.setItem('state', state);
  }

  getLocation() {
    if (!this.city && !this.state) {
      return this.defaultValues;
    }
    return { city: this.city, state: this.state };
  }
}
