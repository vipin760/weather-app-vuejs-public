<template>
  <div class="flex py-6 px-3 bg-primary-green rounded-md shadow-md">
    <div class="flex flex-col flex-1 gap-2">
      <AnimatedPlaceHolder class="max-w-[50%]" />
      <AnimatedPlaceHolder class="max-w-[40%]" />
    </div>
    <div class="flex flex-col items-end flex-1 gap-2">
      <AnimatedPlaceHolder class="max-w-[50px] w-full" />
      <AnimatedPlaceHolder class="max-w-[75px] w-full" />
    </div>

    <!-- Hourly -->
    <div class="flex flex-col py-12 px-8 items-center">
      <AnimatedPlaceholder class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
    <!-- Weekly -->
    <div class="flex flex-col py-12 px-8 items-center">
      <AnimatedPlaceholder class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceHolder from "./AnimatedPlaceHolder.vue";
</script>
