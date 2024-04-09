<template>
  <div class="flex flex-col flex-1 items-center">
    <!--banners start-->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>You are presently previewing local weather data for this city. The "+" button enables you to store this weather data. !</p>
    </div>
    <!--banners end-->
    <!--weather api overview start-->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-2xl">{{ route.params.city }}</h1>
      <p class="text-sm mb-2">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">{{ Math.round((weatherData.current.temp - 32)* (5/9)) }}&deg</p>
      <p>Feels Like {{ Math.round((weatherData.current.feels_like - 32) * (5/9)) }}&deg</p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <!--weather api overview end-->

    <hr class="border border-white border-opacity-10 w-full" />

    <!-- hourly weather start-->
    <div class="max-width-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
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
        <h2 class="mb-4">10 day forcast</h2>
        <div class="flex items-center" v-for="day in weatherData.daily" :key="day.dt">
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
    <div
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const getWeatherData = async () => {
  try {
    // const weatherData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=15c292d01e5721fcc39b60343c423696&units=imperial`);
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (error) {
    this.$toast.error(`${error.response.data.message}`);
  }
};
const weatherData = await getWeatherData();
const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({ name: "Home" });
};
</script>

<style lang="scss" scoped></style>
