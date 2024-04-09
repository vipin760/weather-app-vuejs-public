<script setup>
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    let requests = [];
    savedCities.value.forEach((city) => {
      const response = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
      );
      requests.push(response);
    });
    const weatherData = await Promise.all(requests);
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};
await getCities();
const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng },
  });
};
</script>

<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>
  <div class="text-center text-sky-400">
    <p v-if="savedCities.length === 0">
    currently not available saved location, search in the field...
  </p>
  </div>
</template>
