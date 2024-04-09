<script setup>
import Nav from "./Nav.vue";
import AsyncCityView from "../components/partials/AsyncCityView.vue";
import CityCardSkeleton from "../components/partials/CityCardSkeleton.vue";
</script>

<template>
  <Nav />
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <CityCardSkeleton />
      </template>
    </Suspense>
  </div>
</template>
