import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/AnonymousSignIn.vue")
  },
  {
    path: "/signin",
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/SignIn.vue")
  },
  {
    path: "/questionnaire",
    name: "questionnaire",
    component: () =>
      import(
        /* webpackChunkName: "questionnaire" */ "../views/Questionnaire.vue"
      )
  },
  {
    path: "/thanks",
    name: "thanks",
    component: () =>
      import(/* webpackChunkName: "thanks" */ "../views/Thanks.vue")
  },
  {
    path: "/results",
    name: "results",
    component: () =>
      import(/* webpackChunkName: "results" */ "../views/Results.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
