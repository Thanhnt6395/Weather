<template>
  <div>
    <header class=" bg-black shadow">
      <div class=" flex flex-col sm:flex-row justify-between gap-5 p-3 items-center md:w-[90%] lg:w-[70%] md:m-auto">
        <div class=" text-3xl mx-5 flex gap-2 items-center">
          <font-awesome-icon icon="fa-solid fa-house-tsunami" size="2xl" style="color: #ee3a3a;" />
          <span class=" font-bold ml-2 font-serif text-white">Brand</span>
        </div>
        <div class=" relative mx-5">
          <input type="text" class=" bg-white border-2 border-gray-300 rounded-md text-2xl p-2" placeholder="Location" @change="search">
          <div class=" absolute inset-y-0 right-0 mr-2 flex items-center">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="xl" />
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import store from "../store";


function search(event) {
  let value = event.target.value
  store.dispatch('getCoordinateByAddress', value)
}

</script>