import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    anonymous_user: null,
    user: null
  },
  mutations: {
    SET_ANONYMOUS_USER(state, payload) {
      state.anonymous_user = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async setAnonymousUser({ commit }, payload) {
      return commit("SET_ANONYMOUS_USER", payload);
    },
    async setUser({ commit }, payload) {
      return commit("SET_USER", payload);
    }
  }
});

export default store;
