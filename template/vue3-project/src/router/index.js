import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import MainRoute from "./routes";
import { goLogin } from "../utils";

const routes = [
  {
    path: "/login",
    meta: {
      title: "登录",
    },
    name: "login",
    component: () => import("@/views/Login"),
  },
  MainRoute,
  {
    path: "/401",
    meta: {
      title: "没有访问权限",
    },
    name: "401",
    component: () => import("@/views/Errors/401.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    meta: {
      title: "404",
    },
    name: "404",
    component: () => import("@/views/Errors/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.fullPath == "/") {
    router.push("/device/deviceManage");
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.userInfo.username) {
      store
        .dispatch(
          // process.env.VUE_APP_NO_LOGIN === "yes" ? "noUserInfo" : "getUserInfo"
          "noUserInfo"
        )
        .then((res) => {
          if (res.code === 1) {
            next(store.state.authority.includes(to.name) ? undefined : "/401");
          } else {
            // next({ name: 'login', query: { ReturnUrl: to.fullPath } });
            goLogin();
          }
        });
    } else {
      next(store.state.authority.includes(to.name) ? undefined : "/401");
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  const arr = to.matched.map((x) => x.meta.title).reverse();
  let title = "";
  arr.forEach((name, i) => {
    if (name) {
      title += `${i !== 0 ? "-" : ""}${name}`;
    }
  });
  document.title = title;
});
export default router;
