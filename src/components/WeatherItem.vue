<template>
  <div class=" bg-white shadow-md w-fit p-3 rounded-md">
    <h2 class=" text-red-400">{{ today }}</h2>
    <h1 class="mb-1 font-bold text-xl">{{ address }}</h1>
    <div class=" w-full max-h-[300px] p-3" v-if="weather.main">
      <div class="grid grid-rows-[1rem, 5fr] gap-1">
        <div class="row-span-2 grid grid-cols-5 gap-2">
          <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt="icon" class=" col-span-2">
          <div class="col-span-3 m-auto">
            <span class=" text-2xl">
              {{ !isMetric ? (weather.main.temp * 9/5 + 32).toFixed() : weather.main.temp.toFixed() }} {{ !isMetric ? '°F' : '°C' }}
            </span>
          </div>
        </div>
        <div class="flex items-center w-full font-semibold">
          <span class="">
            Feel likes {{ !isMetric ? (weather.main.feels_like * 9/5 + 32).toFixed() : weather.main.feels_like.toFixed() }} {{ !isMetric ? '°F' : '°C' }}. {{ weather.weather[0].description }}
          </span>
        </div>
        <div class=" pl-2 border-l-2 border-l-red-500">
          <div class=" grid grid-cols-2 gap-3">
            <div class=" flex flex-row gap-1 items-center">
              <span>Wind:</span>
              <span>{{ !isMetric ? (weather.wind.speed*2.24).toFixed(1) : weather.wind.speed.toFixed(1) }} {{ !isMetric ? 'mph' : 'm/s' }}</span>
            </div>
            <div class=" flex flex-row gap-1 items-center">
              <span>Humidity:</span>
              <span>{{ weather.main.humidity }}%</span>
            </div>
          </div>
          <div class=" grid grid-cols-2 gap-3">
            <div class=" flex flex-row gap-1 items-center">
              <span>UV:</span>
              <span>{{ weather.sys.type }}</span>
            </div>
            <div class=" flex flex-row gap-1 items-center">
              <span>Visibility:</span>
              <span>{{ (weather.visibility/1000).toFixed(1) }} km</span>
            </div>
          </div>
        </div>  
        
      </div>
    </div>
  </div>
  
</template>

<script setup>

defineProps({
  address: String,
  location: Object,
  weather: Object,
  isMetric: Boolean,
})

const date = new Date()
const today = new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit"}).format(date)

</script>