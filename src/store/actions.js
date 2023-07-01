import gmapsInit from '../utils/gmaps';
import axiosClient from '../utils/axiosClient';

export function getCurrentGeolocationCoordinates({ commit }) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      commit('setGeolocationCoordinates', {lat: lat.toFixed(2), lng: long.toFixed(2)})
    },
    (Error) => {
      console.log(Error.message)
    }
  );
}

export async function getCoordinateByAddress({ commit }, address) {
  try {
    const google = await gmapsInit();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status !== 'OK' || !results[0]) {
        throw new Error(status);
      }

      console.log({results})
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();
      console.log({lat, lng})
      commit('setGeolocationCoordinates', {lat: lat.toFixed(2), lng: lng.toFixed(2)})
    })
  } catch (error) {
    console.log(error.message)
  }
  
}

export async function getAddressByCoordinate({ commit }, location) {
  try {
    const google = await gmapsInit();
    const geocoder = new google.maps.Geocoder();
    await geocoder.geocode({ location: location }, (results, status) => {
      if (status !== 'OK' || !results[0]) {
        throw new Error(status);
      }

      let address = results[0].formatted_address.split(', ')
      if (address.length > 3) commit('setAddress', address.slice(-3).join(', '))
      else if (address.length > 2) commit('setAddress', address.slice(-2).join(', '))
      else commit('setAddress', address.join(', '))
    })
  } catch (error) {
    console.log(error.message)
  }
  
}

export function getCurrentWeather({ commit }, location) {
  const key_api = import.meta.env.VITE_WEATHER_API_KEY
  axiosClient.get(`weather?lat=${location.lat}&lon=${location.lng}&units=metric&appid=${key_api}`)
    .then(({ data }) => {
      commit('setCurrentWeather', data)
    })
    .catch((error) => {
      console.log(error.message)
    })
}

export function getDataFiveDays({ commit }, location) {
  const key_api = import.meta.env.VITE_WEATHER_API_KEY
  axiosClient.get(`forecast?lat=${location.lat}&lon=${location.lng}&units=metric&appid=${key_api}`)
    .then(({ data }) => {
      commit('setDataFiveDays', data)
    })
    .catch((error) => {
      console.log(error.message)
    })
}
