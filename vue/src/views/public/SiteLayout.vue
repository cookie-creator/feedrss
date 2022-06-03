<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex justify-between items-center">
            <div class="flex-shrink-0">
              <router-link :to="{ name: 'HomePage'}" class="">
                <span class="logo">
                  <span class="first">Feed</span>
                  <span class="second">Hacker</span>
                </span>
              </router-link>
            </div>
            <div class="">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name" :to="item.to"
                  active-class="text-blue-500 text-lg"
                  :class="[this.$route.name === item.to.name ? '' : 'text-gray-500 text-lg hover:text-blue-500', 'px-3 py-2 rounded-md text-sm font-medium']">{{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            active-class="bg-gray-900 text-white"
            as="a"
            :class="[this.$route.name === item.to.name ? '' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']">{{ item.name }}
          </router-link>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view></router-view>

    <footer class="">
      <div class="grid justify-center py-3 text-gray-500">
        &copy; 2022 FeedHacker
      </div>
    </footer>
  </div>
</template>

<script>

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';
import {useStore} from 'vuex';
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

const navigation = [
  { name: 'Latest posts', to: {name: 'PublicPosts'}},
  { name: 'Categories', to: {name: 'PublicCategories'}},
]

export default {
  name: "SiteLayout",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    return {
      navigation,
    };
  },
}
</script>

<style scoped>

</style>
