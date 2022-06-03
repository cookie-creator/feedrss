<template>
  <header class="">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 v-if="title" class="text-3xl font-bold text-gray-900">
        {{ title }}
      </h1>
      <slot name="header"></slot>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto pb-4 sm:px-4 lg:px-4 md:px-4 px-4">
      <slot></slot>
      <!-- /End replace -->
    </div>
  </main>
</template>

<script setup>

import '../assets/css/style.css';

const props = defineProps({
  title: String,
});

</script>

<style scoped>

</style>
