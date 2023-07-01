<template>
  <div class=" h-auto lg:max-h-[600px]">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import Chart from 'chart.js/auto';
import store from "../store";

const isMetric = defineProps({
  isMetric: Boolean,
  required: true,
})
const dataFiveDays = computed(() => store.getters.getHourlyData)
const dataTemp = ref([])
var myChart;

watch(dataFiveDays, (newValue, oldValue) => {
  if (myChart) myChart.destroy()
  const canvas = document.getElementById('canvas')
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    console.log({ctx})
    const labels = newValue.map((row) => {
      let date = new Date(row.dt_txt)
      if (date.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric", second: "numeric", hour12: false}) === '24:00:00') return date.toLocaleDateString("en-US", {month: 'short', day: 'numeric'})
      return date.toLocaleString("en-US", {hour: '2-digit', hour12: true})
    })
    dataTemp.value = newValue.map(row => row.main.temp)

    myChart = new Chart(
      ctx,
      {
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature',
              type: 'line',
              data: dataTemp.value,
              yAxisID: 'y',
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4
            },
            {
              label: 'Precipitation',
              type: 'bar',
              data: newValue.map((row) => {
                if (!row.rain) return 0
                return row.rain['3h'].toFixed(1)
              }),
              fill: false,
              yAxisID: 'y1',
            },
          ]
        },
        options: {
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          scales: {
            y: {
              ticks: {
                callback: function(value, index, ticks) {
                  return value + '°';
                }
              },
              display: true,
              position: 'left',
            },
            y1: {
              ticks: {
                callback: function(value, index, ticks) {
                  return value + ' mm/h';
                }
              },
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            }
          },
        }
      }
    );
  }
})


watch(isMetric, (newValue, oldValue) => {
  if (!newValue.isMetric) {
    myChart.data.datasets[0].data = dataTemp.value.map(x => (x * 9/5 + 32).toFixed())
  } else myChart.data.datasets[0].data = dataTemp.value
  myChart.update()
})

</script>

<style scoped>
canvas{
  width: 100%!important;
  height: 250px!important;
}

@media screen and (min-width: 1024px) {
  canvas{
    height: 350px!important;
  }
}
</style>