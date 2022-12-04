import Vue from "vue";
import vueRouter from "vue-router";
import Home from "@/views/Home";
import LayOut from "@/views/Layout";
import Search from "@/views/Search";
import Play from "@/views/Play";
Vue.use(vueRouter);

const routes = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layOut",
    component: LayOut,
    redirect: "/LayOut/Home",
    children: [
      {
        path: "home",
        component: Home,
        meta: {
          title: "首页",
        },
      },
      {
        path: "search",
        component: Search,
        meta: { title: "搜索" },
      },
    ],
  },
  {
    path: "/play",
    component: Play,
  },
];

const router = new vueRouter({
  routes,
});

export default router;
