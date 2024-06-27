import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "",
    name: "toolbar",
    component: () => import("../components/Toolbar.vue"),
    children: [
      {
        path: "/me",
        name: "me",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Me.vue"),
      },
    ],
  },
  {
    path: "/grade",
    name: "grade",
    component: () => import("../views/Grade.vue"),
  },
  {
    path: "/store",
    name: "store",
    component: () => import("../views/Store.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/warehouse",
    name: "warehouse",
    component: () => import("../views/Warehouse.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/Order.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
