export function setGeolocationCoordinates(state, geo) {
  state.geolocationCoordinates = geo || {}
}

export function setAddress(state, address) {
  state.address = address || ''
}

export function setCurrentWeather(state, data) {
  state.currentWeather = data || {}
}

export function setDataFiveDays(state, data) {
  state.dataFiveDays = data || {}
}
