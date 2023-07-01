<template>
  <div class=" p-5 bg-gray-100">
    <div class=" flex flex-col gap-2 xl:w-[70%] md:m-auto">
      <div class=" flex justify-start gap-1">
        <button 
          class=" w-fit p-2 rounded-md" 
          :class="[isMetric ? 'bg-white shadow-md' : 'bg-gray-200 text-white']" 
          @click="isMetric = !isMetric" 
        >
          Metric: °C, m/s
        </button>
        <button 
          class=" w-fit p-2 rounded-md" 
          :class="[!isMetric ? 'bg-white shadow-md' : 'bg-gray-200 text-white']" 
          @click="isMetric = !isMetric" 
        >
          Imperial: °F, mph
        </button>
      </div>
      <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-3 gap-3">
        <WeatherItem :address="address" :location="geo" :weather="weather" :isMetric="isMetric" ></WeatherItem>
        <Maps class=" col-span-2"></Maps>
      </div>
      <div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-4 bg-white rounded shadow">
        <div class=" col-span-2 md:row-span-1 p-5">
          <span class=" font-semibold">Hourly forecast</span>
          <DrawCanvas :isMetric="isMetric" ></DrawCanvas>
        </div>
        <div class=" col-span-2 md:row-span-1 p-5">
          <span class=" font-semibold">5-day forecast</span>
          <DaysForecast :isMetric="isMetric" ></DaysForecast>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import store from '../store'
import WeatherItem from '../components/WeatherItem.vue';
import Maps from '../components/Maps.vue';
import DrawCanvas from '../components/DrawCanvas.vue';
import DaysForecast from '../components/DaysForecast.vue';

const geo = computed(() => store.state.geolocationCoordinates);
const address = computed(() => store.state.address)
const weather = computed(() => store.state.currentWeather)
const isMetric = ref(true)

onMounted(async () => {
  await store.dispatch('getCurrentGeolocationCoordinates')
})

watch(geo, (newValue, oldValue) => {
  if (Object.keys(newValue).length == 0) return false
  store.dispatch('getAddressByCoordinate', {lat: parseFloat(newValue.lat), lng: parseFloat(newValue.lng)})
  store.dispatch('getCurrentWeather', {lat: parseFloat(newValue.lat).toFixed(2), lng: parseFloat(newValue.lng).toFixed(2)})
  store.dispatch('getDataFiveDays', {lat: parseFloat(newValue.lat).toFixed(2), lng: parseFloat(newValue.lng).toFixed(2)})
})

</script>