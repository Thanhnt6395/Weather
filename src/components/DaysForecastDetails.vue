<template>
  <div class=" w-full max-h-[400px] p-3" v-if="Object.keys(dataDetails).length > 0">
    <div class="grid grid-rows-[1rem, 5fr] gap-1">
      <div class="row-span-2 grid grid-cols-4 gap-2">
        <img :src="`https://openweathermap.org/img/wn/${dataDetails.icon}@2x.png`" alt="icon" class="">
        <div class="col-span-3 m-auto flex flex-col gap-1">
          <span class=" text-2xl first-letter:capitalize">{{ dataDetails.description }}</span>
          <span class=" text-sm">
            The high will be {{ !isMetric ? (dataDetails.temp_max* 9/5 + 32).toFixed() : dataDetails.temp_max.toFixed() }}{{ !isMetric ? '°F' : '°C'}}, 
            the low will be {{ !isMetric ? (dataDetails.temp_min* 9/5 + 32).toFixed() : dataDetails.temp_min.toFixed() }}{{ !isMetric ? '°F' : '°C'}}.
          </span>
        </div>
      </div>
      <div class=" pl-2 border-l-2 border-l-red-500">
        <div class=" grid grid-cols-2 gap-3">
          <div class=" flex flex-row gap-1 items-center">
            <span>Wind:</span>
            <span>{{ !isMetric ? (dataDetails.wind*2.24).toFixed() : dataDetails.wind }} {{ !isMetric ? 'mph' : 'm/s' }}</span>
          </div>
          <div class=" flex flex-row gap-1 items-center">
            <span>Humidity:</span>
            <span>{{ dataDetails.humidity }}%</span>
          </div>
        </div>

        <div class=" grid grid-cols-2 gap-3">
          <div class=" flex flex-row gap-1 items-center">
            <span>Cloud:</span>
            <span>{{ dataDetails.clouds }}%</span>
          </div>
          <div class=" flex flex-row gap-1 items-center">
            <span>Visibility:</span>
            <span>{{ (dataDetails.visibility/1000).toFixed(1) }} km</span>
          </div>
        </div>

        <div class=" grid grid-cols-2 gap-3" v-if="dataDetails.main.includes('Rain') && dataDetails.rain > 0">
          <div class=" flex flex-row gap-1 items-center">
            <span>Rain:</span>
            <span>{{ dataDetails.rain }}mm ({{ dataDetails.pop*100 }}%)</span>
          </div>
          <div class=" flex flex-row gap-1 items-center"></div>
        </div>

        <div class=" grid grid-cols-2 gap-3" v-if="dataDetails.main.includes('Snow') && dataDetails.snow > 0">
          <div class=" flex flex-row gap-1 items-center">
            <span>Snow:</span>
            <span>{{ dataDetails.snow }}mm</span>
          </div>
          <div class=" flex flex-row gap-1 items-center"></div>
        </div>
      </div>

      <div class=" flex justify-between gap-2">
        <div class=" grid grid-rows-3">
          <span></span>
          <span class=" uppercase font-light text-gray-500 text-xs md:text-sm xl:text-base">temperature</span>
          <span class=" uppercase font-light text-gray-500 text-xs md:text-sm xl:text-base">feels like</span>
        </div>
        <div class=" grid grid-rows-3" v-for="(value, key, index) in dataDetails.dayPeriod" :key="index">
          <span class=" text-xs md:text-sm xl:text-base text-center">{{ key }}</span>
          <span class=" text-xs md:text-sm xl:text-base text-center">{{ !isMetric ? (value.temp* 9/5 + 32).toFixed() : value.temp.toFixed() }}{{ !isMetric ? '°F' : '°C'}}</span>
          <span class=" text-xs md:text-sm xl:text-base text-center">{{ !isMetric ? (value.feel_like* 9/5 + 32).toFixed() : value.feel_like.toFixed() }}{{ !isMetric ? '°F' : '°C'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  selected: String,
  dataDetails: Object,
  isMetric: Boolean
})


</script>