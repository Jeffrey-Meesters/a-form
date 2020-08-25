import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/SignIn.vue")
  },
  {
    path: "/questionnaire",
    name: "questionnaire",
    component: () =>
      import(
        /* webpackChunkName: "questionnaire" */ "../views/Questionnaire.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
