<template>
  <page-component>
    <template v-slot:header>
      <header>
        <h1 class="text-2xl font-light text-gray-900">{{model.title}}</h1>
      </header>
    </template>

    <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-8 pl-4">
      <div class="max-w-7xl mx-auto col-span-4">
        <div class="max-w-2xl mx-auto pb-3 sm:pb-3 lg:pb-3 lg:max-w-none">
          <div class="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-6 gap-y-5">
            <div v-for="post in categoryPosts" :key="post.title" class="group relative">
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

      <div class="text col-span-2">
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

  const popularPosts = computed(() => store.state.page.popularPosts.data);
  const categoryPosts = computed(() => store.state.page.categoryPosts.data);

  let model = ref({
    title: "",
    slug: "",
  });

  watch(
    () => store.state.page.currentCategory.data,
    (newVal, oldVal) => {
      model.value = {
        ...JSON.parse(JSON.stringify(newVal)),
        status: !!newVal.status,
      };

      pageService.title.set(model.value.title);
    }
  );

  if (route.params.slug) {
    store.dispatch("getPageCategory", route.params.slug);
    store.dispatch("getPagePopularPosts");
    store.dispatch("getPageCategoryPosts", route.params.slug);
  }

</script>

<style scoped>

</style>
