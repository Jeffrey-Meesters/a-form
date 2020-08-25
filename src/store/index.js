import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
      router.push("/questionnaire");
    }
  },
  actions: {
    async setUser({ commit }, payload) {
      return commit("SET_USER", payload);
    }
  }
});

export default store;
