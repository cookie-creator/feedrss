<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-light text-gray-900">
          {{ route.params.id ? model.title : "Create a post" }}
        </h1>
      </div>
    </template>
    <!--<div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 gap-12">
      <div class="max-w-7xl mx-auto col-span-4">-->



    <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Post</h3>
              <p class="mt-1 text-sm text-gray-600">
                {{ route.params.id ? "Edit this post on FeedHacker" : "Create new post with image" }}
                </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

                  <div class="col-span-6 sm:col-span-3">
                    <label for="title" class="block text-mm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" id="title" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div>
                    <label for="description" class="block text-md font-medium text-gray-700">Short text</label>
                    <div class="mt-1">
                      <editor v-model="model.description" />
                    </div>
                  </div>

                  <div>
                    <label for="text" class="block text-md font-medium text-gray-700">Post text</label>
                    <div class="mt-1">
                      <editor v-model="model.text" />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Post photo
                    </label>
                    <div v-if="model.imageUrl">
                      <div class="mt-1 flex items-center">
                        <img
                          v-if="model.imageUrl"
                          :src="model.imageUrl"
                          :alt="model.title"
                          class="w-64 h-48 object-cover"
                        />
                        <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                        </svg>
                      </span>
                        <button type="button" class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <input type="file" @change="onImageChoose" class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"/>
                          Change
                        </button>
                      </div>
                    </div>

                    <div v-else>
                      <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <div class="flex text-sm text-gray-600">
                            <label for="file-upload" class="text-center cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                              <span>Upload a file</span>
                              <input id="file-upload" @change="onImageChoose" name="file-upload" type="file" class="sr-only" />
                            </label>
                          </div>
                          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      <!--</div>
      <div class="max-w-2xl pb-3 sm:pb-3 lg:pb-3 col-span-2">

      </div>
    </div>
    -->
  </page-component>
</template>

<script setup>

  import PageComponent from '../../components/AuthPageComponent.vue';
  import Editor from '../components/Editor.vue'
  import { computed, ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import store from "../../store";
  import pageService from "../../services/PageService";


  const router = useRouter();
  const route = useRoute();

  const currentPostLoading = computed(() => store.state.auth.currentPost.loading);

  let content = "<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>";

  let model = ref({
    guid: "",
    slug: "",
    title: "",
    description: "",
    text: "",
    imagel: '',
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


  function onImageChoose(ev) {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      // The field to send on backend and apply validations
      model.value.image = reader.result;

      // The field to display here
      model.value.imageUrl = reader.result;
      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  }
</script>

<style scoped>

</style>
