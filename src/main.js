import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import { firebase } from "./services/firebase";

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: h => h(App)
});

firebase.auth().onAuthStateChanged(user => {
  if (user && user.isAnonymous) {
    store.dispatch("setAnonymousUser", user);
  }

  if (user && !user.isAnonymous) {
    store.dispatch("setUser", user);
  }

  if (!user) {
    store.dispatch("setAnonymousUser", null);
    store.dispatch("setUser", null);
  }

  app.$mount("#app");
});
