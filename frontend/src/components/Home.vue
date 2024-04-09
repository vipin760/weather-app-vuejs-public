<script setup>
import Nav from "./Nav.vue";
import SearchLocation from "../components/partials/SearchLocation.vue";
import CityList from "../components/partials/CityList.vue";
////////////////////////////////////////
import axios from "axios";
import { ref } from "vue";
const error = ref(null);
const latitude = ref(null);
const longitude = ref(null);
const weatherInfo = ref(null);
const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
      getWeatherData(latitude.value, longitude.value);
    },
    (err) => {
      error.value = err.message;
    }
  );
};
const getWeatherData = async (lat, lng) => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );
    console.log("weatherData",weatherData);
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    weatherInfo.value = weatherData.data;
  } catch (error) {
    this.$toast.error(`${error.response.data.message}`);
  }
};
////////////////////////////////////
</script>
<template>
  <Nav />
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <SearchLocation />

    <!-- saved cities start -->
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <p class="text-center m-3">Loading.....</p>
        </template>
      </Suspense>
    </div>
    <!-- saved cities end -->
    <div class="text-center m-5">
      <button
        class="text-white shadow-lg bg-black p-2 hover:weather-secondary rounded"
        @click="getCurrentLocation"
      >
        Check Weather Now
      </button>
    </div>

    <div v-if="weatherInfo">
      <!-- Display weather information -->
      <div class="flex flex-col items-center text-white py-12">
        <p class="text-sm mb-2">
          {{
            new Date(weatherInfo.currentTime).toLocaleDateString("en-us", {
              weekday: "short",
              day: "2-digit",
              month: "long",
            })
          }}
          <span class="m-3">
            {{
              new Date(weatherInfo.currentTime).toLocaleTimeString("en-us", {
                timeStyle: "short",
              })
            }}
          </span>
        </p>
        <p class="text-8xl mb-8">{{ Math.round((weatherInfo.current.temp - 32) * (5/9)) }}&deg</p>
        <p>Feels Like {{ Math.round((weatherInfo.current.feels_like - 32) * (5/9)) }}&deg</p>
        <p class="capitalize">
          {{ weatherInfo.current.weather[0].description }}
        </p>
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>
      <hr class="border border-white border-opacity-10 w-full" />
      <!-- hourly weather start-->
      <div class="max-width-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">Hourly Weather</h2>
          <div class="flex gap-10 overflow-x-scroll">
            <div
              v-for="hourData in weatherInfo.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-4 items-center"
            >
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                    hour: "numeric",
                  })
                }}
              </p>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                alt=""
              />
              <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
            </div>
          </div>
        </div>
      </div>
      <!-- hourly weather end-->
      <hr class="border border-white border-opacity-10 w-full" />
      <!-- weakly weather start-->
      <div class="max-width-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">7 day forcast</h2>
          <div class="flex items-center" v-for="day in weatherInfo.daily" :key="day.dt">
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString("en-us", {
                  weekday: "long",
                })
              }}
            </p>
            <img
              class="w-[50px] h-[50px]"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt=""
            />

            <div class="flex gap-2 flex-1 justify-end">
              <p>High:{{ Math.round(day.temp.max) }}&deg;</p>
              <p>Low:{{ Math.round(day.temp.min) }}&deg;</p>
            </div>
          </div>
        </div>
      </div>
      <!-- weakly weather end-->
    </div>
    <div v-else class="text-white text-center m-4">
      <!-- Show message when weather info is not available -->
      <p>No weather information available.</p>
    </div>
    <!-- Display error if any -->
    <div v-if="error" class="text-white text-center m-4">{{ error }}</div>
  </div>
</template>
