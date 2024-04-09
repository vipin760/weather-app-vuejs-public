<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const mapboxAPIKey =
  "pk.eyJ1Ijoic3RlY2g1MzkzIiwiYSI6ImNsdG91Z2Y5ejAxNHoya3NidXpxMjNranUifQ.wwHORAJ7bU3NtSKjX6Y61w";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResult = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch (error) {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>
<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        @input="getSearchResult"
        v-model="searchQuery"
        placeholder="Find your city temperature....."
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-weather-primary shadow-lg text-white w-full py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError">sorry something went wrong please try again...</p>
        <p v-if="!serverError && mapboxSearchResults.length === 0">
          cannot match this keyword please check another...
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>
