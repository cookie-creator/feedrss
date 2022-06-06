import {createStore} from "vuex";
import axiosClient from "../axios";
import pageService from "../services/PageService"

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("token"),
        },

        imageBasicUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,

        // Auth
        auth: {
          test: {
            loading: false,
            links: [],
            data: []
          },
          posts: {
            loading: false,
            links: [],
            data: []
          },
          currentPost: {
            data: {},
            loading: false,
          },
          categories: {
            loading: false,
            links: [],
            data: []
          },
          categoriesMutated: {
            loading: false,
            data: []
          },
          currentCategory: {
            data: {},
            loading: false,
          },
        },

        page: {
          posts: {
            loading: false,
            links: [],
            data: []
          },
          currentPost: {
            loading: false,
            data: []
          },
          categoryPosts: {
            loading: false,
            links: [],
            data: []
          },
          newPosts: {
            loading: false,
            data: []
          },
          popularPosts: {
            loading: false,
            data: []
          },
          likePosts: {
            loading: false,
            data: []
          },
          popularCategories: {
            loading: false,
            data: []
          },

          categories: {
            loading: false,
            data: []
          },
          currentCategory: {
            data: {},
            loading: false,
          },
        },

        posts: {
          loading: false,
          links: [],
          data: []
        },
        currentPost: {
          data: {},
          loading: false,
        },
        categories: {
          loading: false,
          links: [],
          data: []
        },
        currentCategory: {
          data: {},
          loading: false,
        },
    },
    getters: {},
    actions: {

      register({commit}, user) {
        return axiosClient.post('/auth/register', user)
          .then(({data}) => {
            commit('setUser', data.user);
            commit('setToken', data.token)
            return data;
          })
      },
      login({commit}, user) {
        return axiosClient.post('/auth/login', user)
          .then(({data}) => {
            commit('setToken', data.access_token)
            return data;
          })
      },
      logout({commit}) {
        return axiosClient.post('/auth/logout')
          .then(response => {
            commit('logout')
            return response;
          })
      },

      /* User */
      getUser({commit}) {
        return axiosClient.post('/auth/me')
          .then(res => {
            commit('setUser', res.data)
          })
      },

      /**
       * Post for clients
       * */

      getPagePosts({ commit }, {url = null} = {})
      {
        commit('setPagePostsLoading', true)
        url = url || "/posts";
        return axiosClient.get(url).then((res) => {
          commit('setPagePostsLoading', false)
          commit("setPagePosts", res.data);
          return res;
        });
      },
      getPagePost({ commit }, id) {
        commit("setPageCurrentPostLoading", true);
        return axiosClient
          .get(`/post/${id}`)
          .then((res) => {
            commit("setPageCurrentPost", res.data);
            commit("setPageCurrentPostLoading", false);
            return res;
          })
          .catch((err) => {
            commit("setPageCurrentPostLoading", false);
            throw err;
          });
      },
      getPageNewPosts({ commit }, {url = null} = {})
      {
        commit('setPageNewPostsLoading', true)
        url = url || "/posts/new";
        return axiosClient.get(url).then((res) => {
          console.log(res.data);
          commit('setPageNewPostsLoading', false)
          commit("setPageNewPosts", res.data);
          return res;
        });
      },
      getPagePopularPosts({ commit }, {url = null} = {})
      {
        commit('setPagePopularPostsLoading', true)
        url = url || "/posts/popular";
        return axiosClient.get(url).then((res) => {
          commit('setPagePopularPostsLoading', false)
          commit("setPagePopularPosts", res.data);
          return res;
        });
      },
      getPageLikePosts({ commit }, {url = null} = {})
      {
        commit('setPageLikePostsLoading', true)
        url = url || "/posts/like";
        return axiosClient.get(url).then((res) => {
          commit('setPageLikePostsLoading', false)
          commit("setPageLikePosts", res.data);
          return res;
        });
      },

      getPageCategories({ commit }, {url = null} = {})
      {
        commit('setPageCategoriesLoading', true)
        url = url || "/categories";
        return axiosClient.get(url).then((res) => {
          commit('setPageCategoriesLoading', false)
          commit("setPageCategories", res.data);
          return res;
        });
      },
      getPageCategory({ commit }, slug) {
        commit("setPageCurrentCategoryLoading", true);
        return axiosClient
          .get(`/category/${slug}`)
          .then((res) => {
            commit("setPageCurrentCategory", res.data);
            commit("setPageCurrentCategoryLoading", false);
            return res;
          })
          .catch((err) => {
            commit("setPageCurrentCategoryLoading", false);
            throw err;
          });
      },
      getPageCategoryPosts({ commit }, slug) {
        commit("setPageCategoryPostsLoading", true);
        return axiosClient
          .get(`/category/${slug}/posts`)
          .then((res) => {
            commit("setPageCategoryPosts", res.data);
            commit("setPageCategoryPostsLoading", false);
            return res;
          })
          .catch((err) => {
            commit("setPageCategoryPostsLoading", false);
            throw err;
          });
      },


      getPagePopularCategories({ commit }, {url = null} = {})
      {
        commit('setPagePopularCategoriesLoading', true)
        url = url || "/categories/popular";
        return axiosClient.get(url).then((res) => {
          commit('setPagePopularCategoriesLoading', false)
          commit("setPagePopularCategories", res.data);
          return res;
        });
      },

      /* Auth posts */
      getAuthPosts({ commit }, {url = null} = {})
      {
        commit('setAuthPostsLoading', true)
        url = url || "/auth/posts";
        return axiosClient.get(url).then((res) => {
          commit('setAuthPostsLoading', false)
          commit("setAuthPosts", res.data);
          return res;
        })
      },
      getAuthCategories({ commit }, {url = null} = {})
      {
        commit('setAuthCategoriesLoading', true)
        url = url || "/auth/categories";
        return axiosClient.get(url).then((res) => {
          commit('setAuthCategoriesLoading', false)
          commit("setAuthCategories", res.data);
          return res;
        })
      },
      getAuthCategoriesForFilter({ commit }, {url = null} = {})
      {
        commit('setAuthCategoriesLoading', true)
        url = url || "/auth/categories";
        return axiosClient.get(url).then((res) => {
          commit('setAuthCategoriesLoading', false)
          commit("setAuthCategoriesMutate", res.data);
          return res;
        })
      },
      getAuthPost({ commit }, id) {
        commit("setCurrentPostLoading", true);
        return axiosClient
          .get(`/auth/posts/${id}`)
          .then((res) => {
            commit("setAuthCurrentPost", res.data);
            commit("setAuthCurrentPostLoading", false);
            return res;
          })
          .catch((err) => {
            commit("setAuthCurrentPostLoading", false);
            throw err;
          });
      },
      saveAuthPost({ commit, dispatch }, post)
      {
        let response;
        if (post.id) {
          response = axiosClient
            .put(`/auth/posts/${post.id}`, post)
            .then((res) => {
              commit('setCurrentPost', res.data)
              return res;
            });
        } else {
          response = axiosClient.post("/auth/posts", post).then((res) => {
            commit('setAuthCurrentPost', res.data)
            return res;
          });
        }

        return response;
      },
      deleteAuthPost({ dispatch }, id)
      {
        return axiosClient.delete(`/auth/posts/${id}`).then((res) => {
          dispatch('getAuthPosts')
          return res;
        });
      },


    },

    mutations: {
      logout: (state) => {
        state.user.token = null;
        state.user.data = {};
        sessionStorage.removeItem("token");
      },
      setUser: (state, user) => {
        state.user.data = user;
      },
      setToken: (state, token) => {
        state.user.token = token;
        sessionStorage.setItem('token', token);
      },
      dashboardLoading: (state, loading) => {
        state.dashboard.loading = loading;
      },
      setDashboardData: (state, data) => {
        state.dashboard.data = data
      },

      setPageCurrentPostLoading: (state, loading) => {
        state.page.currentPost.loading = loading;
      },
      setPageCurrentPost: (state, posts) => {
        state.page.currentPost.data = posts.data[0];
      },
      setCategoriesLoading: (state, loading) => {
        state.categories.loading = loading;
      },
      setCategories: (state, categories) => {
        state.categories.links = categories.meta.links;
        state.categories.data = categories.data;
      },
      setPageCategoryPostsLoading: (state, loading) => {
        state.page.categoryPosts.loading = loading;
      },
      setPageCategoryPosts: (state, posts) => {
        state.page.categoryPosts.data = posts.data;
      },

      setPagePostsLoading: (state, loading) => {
        state.page.newPosts.loading = loading;
      },
      setPagePosts: (state, posts) => {
        state.page.posts.links = posts.meta.links;
        state.page.posts.data = posts.data;
      },
      setPageNewPostsLoading: (state, loading) => {
        state.page.newPosts.loading = loading;
      },
      setPageNewPosts: (state, posts) => {
        state.page.newPosts.data = posts.data;
      },
      setPagePopularPostsLoading: (state, loading) => {
        state.page.popularPosts.loading = loading;
      },
      setPagePopularPosts: (state, posts) => {
        state.page.popularPosts.data = posts.data;
      },
      setPageLikePostsLoading: (state, loading) => {
        state.page.likePosts.loading = loading;
      },
      setPageLikePosts: (state, posts) => {
        state.page.likePosts.data = posts.data;
      },

      setPagePopularCategoriesLoading: (state, loading) => {
        state.page.popularPosts.loading = loading;
      },
      setPagePopularCategories: (state, categories) => {
        state.page.popularCategories.data = categories.data;
      },
      setPageCurrentCategoryLoading: (state, loading) => {
        state.page.currentCategory.loading = loading;
      },
      setPageCurrentCategory: (state, categories) => {
        state.page.currentCategory.data = categories.data[0];
      },
      setPageCategoriesLoading: (state, loading) => {
        state.page.categories.loading = loading;
      },
      setPageCategories: (state, categories) => {
        state.page.categories.links = categories.meta.links;
        state.page.categories.data = categories.data;
      },

      /**
       *
       * */
      /*setAuthPostsLoading: (state, loading) => {
        state.auth.posts.loading = loading;
      },
      setAuthPosts: (state, posts) => {
        state.auth.posts.links = posts.meta.links;
        state.auth.posts.data = posts.data;
      },*/
      setAuthCategoriesLoading: (state, loading) => {
        state.auth.categories.loading = loading;
      },
      setAuthCategories: (state, categories) => {
        state.auth.categories.data = categories.data;
        state.auth.categoriesMutated.data = [];
        categories.data.forEach(function(item, index, array) {
          state.auth.categoriesMutated.data.push(
            {
              'key' : item.slug,
              'value' : item.title
            })
        });
      },


      /* Auth posts */
      setAuthPostsLoading: (state, loading) => {
        state.auth.posts.loading = loading;
      },
      setAuthPosts: (state, posts) => {
        state.auth.posts.links = posts.meta.links;
        state.auth.posts.data = posts.data;
      },
      setAuthCurrentPostLoading: (state, loading) => {
        state.auth.currentPost.loading = loading;
      },
      setAuthCurrentPost: (state, post) => {
        state.auth.currentPost.data = post.data;
      },

      notify: (state, {message, type}) => {
        state.notification.show = true;
        state.notification.type = type;
        state.notification.message = message;
        setTimeout(() => {
          state.notification.show = false;
        }, 3000)
      },
    },
    modules: {}
})

export default store
