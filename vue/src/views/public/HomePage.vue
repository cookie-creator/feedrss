<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-light text-gray-900">Most recent</h1>
      </div>
    </template>
    <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-10">
      <div class="max-w-7xl mx-auto col-span-4">
        <div v-if="newPosts.loading" class="flex justify-center">Loading...</div>
        <div class="max-w-2xl mx-auto pb-3 sm:pb-3 lg:pb-3 lg:max-w-none">

          <div class="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6 gap-y-5">
            <div v-for="post in newPosts" :key="post.title" class="group relative">
              <div class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img :src="post.imageUrl" :alt="post.title" class="w-full h-full object-center object-cover" />
              </div>
              <h3 class="mt-6 text-sm text-gray-900 pb-1">
                <router-link
                  :to="{ name: 'PublicPost', params: { slug: post.slug }}"
                  class="text-sm text-gray-800 hover:text-blue-500 py-2">
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </router-link>
              </h3>
              <p class="text-gray-400 text-sm mb-3">{{ post.date }}</p>
              <p v-html="post.description" class="text-sm text-gray-500 "></p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-2xl pb-3 sm:pb-3 lg:pb-3 col-span-2">
        <h2 class="text-gray-600 pb-1 mb-4 border-b border-gray-200">Popular</h2>
        <div class="pb-6">
          <div v-for="post in popularPosts" :key="post.title" class="group relative pb-4">
            <div class="relative w-full h-40 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-40 lg:aspect-w-1 lg:aspect-h-1">
              <img :src="post.imageUrl" :alt="post.title" class="w-full h-full object-center object-cover" />
            </div>
            <h3 class="mt-2 text-sm text-gray-900 pb-2">
              <router-link
                :to="{ name: 'PublicPost', params: { slug: post.slug }}"
                class="text-sm text-gray-600 hover:text-blue-500 py-2">
                <span class="absolute inset-0" />
                {{ post.title }}
              </router-link>
            </h3>
          </div>
        </div>

        <h2 class="text-gray-600 pb-1 mb-4 border-b border-gray-200">Popular categories</h2>
        <div v-for="category in popularCategories" :key="category.title" class="group relative pb-1">
          <router-link
            :to="{ name: 'PublicCategoryView', params: { slug: category.slug }}"
            class="text-sm text-gray-600 hover:text-blue-500 py-2">
            {{ category.title }}
          </router-link>
        </div>
      </div>
    </div>
  </page-component>
</template>

<script setup>

import PageComponent from '../../components/PageComponent.vue';
import { computed, ref } from "vue";
import store from "../../store";
import pageService from "../../services/PageService";

const newPosts = computed(() => store.state.page.newPosts.data);
const popularPosts = computed(() => store.state.page.popularPosts.data);
const popularCategories = computed(() => store.state.page.popularCategories.data);

store.dispatch("getPageNewPosts");
store.dispatch("getPagePopularPosts");
store.dispatch("getPagePopularCategories");

pageService.title.set('Feed hacker');

</script>

<style scoped>

</style>
