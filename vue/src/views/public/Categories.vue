<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-light text-gray-900">Categories</h1>
      </div>
    </template>
    <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-10 pl-5">
      <div class="max-w-7xl mx-auto col-span-4">
        <div class="max-w-2xl mx-auto pb-3 sm:pb-3 lg:pb-3 lg:max-w-none">
          <div class="lg:space-y-0 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 md:grid-cols-5 lg:gap-x-6 space-y-1 gap-2">
            <div v-for="category in categories.data" :key="category.title" class="group relative">
              <router-link
                :to="{ name: 'PublicCategoryView', params: { slug: category.slug }}"
                class="text-sm text-gray-600 hover:text-blue-500 block w-full h-full hover:bg-gray-100 py-2 px-2">
                {{ category.title }}
              </router-link>
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
      </div>
    </div>

    <div class="flex justify-center mt-5">
      <nav
        class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
        <a
          v-for="(link, i) of categories.links"
          :key="i"
          :disabled="!link.url"
          href="#"
          @click="getForPage($event, link)"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
          :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === categories.links.length - 1 ? 'rounded-r-md' : '',
            ]"
          v-html="link.label"
        >
        </a>
      </nav>
    </div>
  </page-component>
</template>

<script setup>

import PageComponent from '../../components/PageComponent.vue';
import { computed, ref } from "vue";
import store from "../../store";
import pageService from "../../services/PageService";

const categories = computed(() => store.state.page.categories);
const popularPosts = computed(() => store.state.page.popularPosts.data);

store.dispatch("getPageCategories");
store.dispatch("getPagePopularPosts");

function getForPage(ev, link)
{
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("getPageCategories", { url: link.url });
}

</script>

<style scoped>

</style>
