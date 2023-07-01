<template>
  <div class=" grid grid-flow-row gap-3">
    <div class="" v-if="!isClapse">
      <div class=" grid grid-rows-[2rem auto] gap-2" >
        <div id="days" class=" grid grid-cols-5 gap-2 bg-gray-100 rounded p-2 items-center">
          <span 
            class=" hover:cursor-pointer items-center text-xs md:text-sm xl:text-base" 
            v-for="(label, index) in labelDetails" 
            :key="index" 
            :class="[label === selected ? ' font-bold' : '']" 
            @click="selectDays(label, true)"
          >{{ label }}</span>
          <div class=" flex justify-end">
            <font-awesome-icon icon="fa-solid fa-caret-up" class=" hover:cursor-pointer" @click="isClapse = !isClapse" />
          </div>
        </div>

        <DaysForecastDetails :selected="selected" :dataDetails="dataDetails" :isMetric="isMetric" ></DaysForecastDetails>
      </div>
    </div>
    <div 
      class=" grid grid-cols-7 gap-4 px-2 items-center hover:bg-gray-100 hover:rounded hover:cursor-pointer" 
      v-else 
      v-for="(item, index) of items" 
      :key="index" 
      @click="selectDays(item, false)" 
    >
      <span class=" col-span-2 flex justify-start">{{ item }}</span>
      <div class=" col-span-3 flex gap-3 justify-end items-center">
        <img :src="`https://openweathermap.org/img/wn/${daysForecast[item].icon}@2x.png`" alt="icon" class=" max-w-[20%]">
        <span class="">{{ !isMetric ? (daysForecast[item].temp_max* 9/5 + 32).toFixed() : daysForecast[item].temp_max }}/{{ !isMetric ? (daysForecast[item].temp_min* 9/5 + 32).toFixed() : daysForecast[item].temp_min }} {{ !isMetric ? '°F' : '°C' }}</span>
      </div>
      <div class=" col-span-2 flex justify-between gap-2 items-center">
        <span class=" font-extralight ">{{ daysForecast[item].description }}</span>
        <font-awesome-icon icon="fa-solid fa-caret-down" class=" hover:cursor-pointer" @click="selectDays(item, false)" />
      </div>
    </div>
  </div>
</template>

<script setup>

import { computed, ref, watch } from 'vue'
import store from '../store'
import DaysForecastDetails from './DaysForecastDetails.vue';

defineProps({
  isMetric: Boolean,
})

const daysForecast = computed(() => store.getters.getDaysForecast)
const detailDaysForecast = computed(() => store.getters.getDetailDaysForecast)
const items = ref([])
const isClapse = ref(true)
const selected = ref('')
const labelDetails = ref([])
const dataDetails = ref({})

watch(daysForecast, (newValue, oldValue) => {
  if (Object.keys(newValue).length == 0) return false
  items.value = Object.keys(newValue)
})

function selectDays(value, fromDetail) {
  if (!fromDetail || (fromDetail && selected.value === value)) isClapse.value = !isClapse.value
  selected.value = value
  let idx = detailDaysForecast.value.findIndex(x => x.date === value)
  if (idx === -1) return dataDetails.value = {}
  dataDetails.value = detailDaysForecast.value[idx].data
  labelDetails.value = idx < items.value.length - 3 ? items.value.slice(idx, idx+4) : items.value.slice(items.value.length - 4)
}

</script>