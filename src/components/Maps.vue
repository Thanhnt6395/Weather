<template>
  <div id="map" class="bg-white shadow-md rounded-md">
    
  </div>
</template>

<script setup>
import { computed, watch } from "vue"
import store from '../store'
import gmapsInit from "../utils/gmaps"

const geo = computed(() => store.state.geolocationCoordinates);
let map;

watch(geo, async (newValue, oldValue) => {
  const google = await gmapsInit();
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

  map = new Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: parseFloat(newValue.lat), lng: parseFloat(newValue.lng) },
    mapId: "DEMO_MAP_ID",
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: parseFloat(newValue.lat), lng: parseFloat(newValue.lng) },
    title: "Uluru",
  })

})

</script>