<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-light text-gray-900">LifeFeeder Posts</h1>

      </div>
      {{categories}}
    </template>
    <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-12">
      <div class="max-w-7xl mx-auto col-span-4">
        <table class="table-auto">
          <thead>
          <tr>
            <th>#id</th>
            <th>text</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="post in posts.data" :key="post.title">
            <td></td>
            <td></td>
            <td>
              <router-link
                :to="{ name: 'PostView', params: { id: post.id }}"
                class="text-sm text-gray-800 hover:text-blue-500 py-2">
                <span class="absolute inset-0" />
                <span class="absolute inset-0" />
                {{ post.title }}
              </router-link>

            </td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>

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

      </div>
      <div class="max-w-2xl pb-3 sm:pb-3 lg:pb-3 col-span-2">
        {{categories}}
      </div>
    </div>
  </page-component>
</template>

<script setup>
  import PageComponent from '../../components/AuthPageComponent.vue';
  import { computed, ref, watch } from "vue";
  import {useRoute, useRouter} from "vue-router";
  import store from "../../store";

  const router = useRouter();
  const route = useRoute();

  const posts = computed(() => store.state.auth.posts);
  const categories = computed(() => store.state.auth.categories);

  store.dispatch("getAuthPosts");
  store.dispatch("getAuthCategories");

</script>

<style scoped>

</style>
