<template>
  <page-component>
    <template v-slot:header>
      <header>
        <h1 class="text-2xl font-light text-gray-900">{{model.title}}</h1>
      </header>
    </template>
    <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-8 pl-4">
      <div class="max-w-7xl mx-auto col-span-4">
        <div class="flex mb-4">
          <div class="author text-sm text-gray-500 font-bold pr-2">By {{model.user}}</div>
          <div class="text-sm text-gray-500 pr-2">|</div>
          <time class="author text-sm text-gray-500 pr-2">{{model.date}}</time>
        </div>
        <div class="image mb-5">
          <img :src="model.imageUrl" :alt="model.title" class="w-full">
        </div>
        <div v-if="model.text" v-html="model.text" class="text-container px-16"></div>
        <div v-if="!model.text" v-html="model.description" class="text-container px-16"></div>
        <div class="categoeies px-16 pt-8">
          <h2 class="text-gray-600 pb-1 mb-2 border-b border-gray-200">Categories</h2>
          <div v-for="category in model.categories" :key="category.title" class="inline">
            <router-link
              :to="{ name: 'PublicCategoryView', params: { slug: category.slug }}"
              class="text-sm text-gray-600 hover:text-blue-500 py-2 pr-2">
              {{ category.title }}
            </router-link>
          </div>
        </div>
      </div>

      <div class="text col-span-2">
        <h2 class="text-gray-600 pb-1 mb-4 border-b border-gray-200">Popular</h2>
        <div class="pb-6">
          <div v-for="post in likePosts" :key="post.title" class="group relative pb-4">
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
  </page-component>
</template>

<script setup>

import PageComponent from '../../components/PageComponent.vue';
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../../store";
import pageService from "../../services/PageService";

const router = useRouter();
const route = useRoute();

const postLoading = computed(() => store.state.page.currentPost.loading);
const likePosts = computed(() => store.state.page.likePosts.data);

let model = ref({
  guid: "",
  slug: "",
  title: "",
  description: "",
  text: "",
  imageUrl: '',
  date: '',
  user: '',
  categories: [],
});

watch(
  () => store.state.page.currentPost.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };

    pageService.title.set(model.value.title);
  }
);

if (route.params.slug) {
  store.dispatch("getPagePost", route.params.slug);
  store.dispatch("getPageLikePosts");
}

</script>

<style scoped>

</style>
