<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer text-white ml-11 mr-11"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">{{ Math.round(city.weather.main.temp) }}&deg</p>
      <div class="flex gap-2">
        <span class="text-x5">H:{{ city.weather.main.temp_max }}</span>
        <span class="text-x5">L:{{ city.weather.main.temp_min }}</span>
      </div>
    </div>
  </div>
</template>
