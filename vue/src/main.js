import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import VoerroTagsInput from '@voerro/vue-tagsinput';
import './index.css'


createApp(App)
    .use(store)
    .use(router)
    .component('tags-input', VoerroTagsInput)
    .mount('#app')
