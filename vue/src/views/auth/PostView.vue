<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-light text-gray-900">LifeFeeder Posts</h1>
      </div>
    </template>
    <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-12">
      <div class="max-w-7xl mx-auto col-span-4">

      </div>
      <div class="max-w-2xl pb-3 sm:pb-3 lg:pb-3 col-span-2">

      </div>
    </div>
  </page-component>
</template>

<script setup>
  import AuthPageComponent from '../../components/AuthPageComponent.vue';
  import { computed, ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import store from "../../store";
  import pageService from "../../services/PageService";

  const router = useRouter();
  const route = useRoute();

  const postLoading = computed(() => store.state.auth.currentPost.loading);

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
    () => store.state.auth.currentPost.data,
    (newVal, oldVal) => {
      model.value = {
        ...JSON.parse(JSON.stringify(newVal)),
        status: !!newVal.status,
      };

      pageService.title.set(model.value.title);
    }
  );

  if (route.params.id) {
    store.dispatch("getAuthPost", route.params.id);
  }

</script>

<style scoped>

</style>
