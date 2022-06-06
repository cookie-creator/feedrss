<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-light text-gray-900">LifeFeeder Posts</h1>

        <tags-input element-id="tags"
                    v-model="selectedTags"
                    :existing-tags="categoriesMutated"
                    :typeahead="true"></tags-input>
      </div>

      {{selectedTags}}
      <router-link
        :to="{ name: 'PostCreate'}"
        class="py-2 px-3 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add new Post
      </router-link>
    </template>
    <div>
      <div >
        <div v-for="post in posts.data" :key="post.title">

          <div class="flex justify-between py-2 px-2 hover:bg-gray-100">

            <div>
            <router-link
              :to="{ name: 'PostView', params: { id: post.id }}"
              class="text-sm text-gray-800 hover:text-blue-500 py-2">
              {{ post.title }}
            </router-link>
            </div>

            <div>
            <button
              v-if="post.id"
              type="button"
              @click="deletePost(post.id)"
              class="
              w-100 py-2 px-3 text-white bg-red-500 hover:bg-red-890 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
            </div>
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
  const selectedTags = [];

  const posts = computed(() => store.state.auth.posts);
  const categories = computed(() => store.state.auth.categories);
  const categoriesMutated = computed(() => store.state.auth.categoriesMutated.data);

  store.dispatch("getAuthPosts");
  store.dispatch("getAuthCategories");

  function deletePost(post)
  {
    if (confirm('Are you sure you want to delete this post?'))
    {
      store.dispatch("deleteAuthPost", post.id).then(() => {
        store.dispatch("getAuthPosts");
      });
    }
  }

</script>

<style scoped>

</style>
