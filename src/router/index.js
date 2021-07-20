import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: "common" */ '../views/home.vue')

Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
