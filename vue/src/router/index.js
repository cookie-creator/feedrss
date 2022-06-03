import {createRouter, createWebHistory} from "vue-router";
import AppLayout from "../components/AppLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import NotFound from "../views/NotFound.vue";

import SiteLayout from "../views/public/SiteLayout.vue";
import HomePage from "../views/public/HomePage.vue";
import PublicPosts from "../views/public/Posts.vue";
import PublicPostsView from "../views/public/PostsView.vue";
import PublicCategories from "../views/public/Categories.vue";
import PublicCategoryView from "../views/public/CategoryView.vue";

// Auth
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import PostView from "../views/auth/PostView.vue";
import Posts from "../views/auth/Posts.vue";
import Categories from "../views/auth/Categories.vue";
import store from "../store";


const routes = [
  {
    path: '/app',
    component: AppLayout,
    meta: {requiresAuth: true},
    children: [
      {path: '/app', name: 'Dashboard', component: Dashboard},
      {path: '/app/posts', name: 'Posts', component: Posts},
      {path: '/app/categories', name: 'Categories', component: Categories},
      {path: '/app/post/:id', name: 'PostView', component: PostView},
    ]
  },
  {
    path: '/auth',
    redirect: './login',
    name: 'Auth',
    component: AuthLayout,
    meta: {isGuest: true},
    children: [
      {path: '/login', name: 'Login', component: Login},
      {path: '/register', name: 'Register', component: Register},
    ]
  },
  {
    path: "/",
    name: 'SiteLayout',
    component: SiteLayout,
    children: [
      {path: '/', name: 'HomePage', component: HomePage},
      {path: '/posts', name: 'PublicPosts', component: PublicPosts},
      {path: '/post/:slug', name: 'PublicPost', component: PublicPostsView},

      {path: '/categories', name: 'PublicCategories', component: PublicCategories},
      {path: '/category/:slug', name: 'PublicCategoryView', component: PublicCategoryView},
    ]
  },

  { path: "/:pathMatch(.*)*", name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
