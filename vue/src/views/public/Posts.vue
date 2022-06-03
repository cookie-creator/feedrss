<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-light text-gray-900">LifeFeeder Posts</h1>
      </div>
    </template>

    <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-12">
      <div class="max-w-7xl mx-auto col-span-4">
        <div v-if="posts.loading" class="flex justify-center">Loading...</div>
        <div class="max-w-2xl mx-auto pb-3 sm:pb-3 lg:pb-3 lg:max-w-none">
          <div class="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6 gap-y-5">
            <div v-for="post in posts.data" :key="post.title" class="group relative">
              <div class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img :src="post.imageUrl" :alt="post.title" class="w-full h-full object-center object-cover" />
              </div>
              <h3 class="mt-6 text-sm text-gray-900 pb-2">
                <router-link
                  :to="{ name: 'PublicPost', params: { slug: post.slug }}"
                  class="text-sm text-gray-800 hover:text-blue-500 py-2">
                  <span class="absolute inset-0" />
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </router-link>
              </h3>
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

    <div class="flex justify-center mt-5">
      <nav
        class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >

        <a v-for="(link, i) of posts.links"
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
              i === posts.links.length - 1 ? 'rounded-r-md' : '',
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

const posts = computed(() => store.state.page.posts);
const popularPosts = computed(() => store.state.page.popularPosts.data);
const popularCategories = computed(() => store.state.page.popularCategories.data);

store.dispatch("getPagePosts");
store.dispatch("getPagePopularPosts");
store.dispatch("getPagePopularCategories");

function getForPage(ev, link)
{
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("getPagePosts", { url: link.url });
}

</script>

<style scoped>

</style>
