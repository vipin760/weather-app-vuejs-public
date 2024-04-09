import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import NotFound from "../components/partials/NotFound.vue";
import { guardMyroute, authGuard } from "../store/routeGuard";
import CityView from "../components/CityView.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/weather/:state/:city",
    name: "cityView",
    component: CityView,
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound,
  },
  { path: "/:pathMatch(.*)*", redirect: "/not-found" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
