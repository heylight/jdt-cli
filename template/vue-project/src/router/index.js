import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const baseRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About"),
  },
];
function newRouter() {
  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: baseRoutes,
  });
}
const router = newRouter();
router.beforeEach((to, from, next) => {
  if (baseRoutes.find((x) => x.path === to.path)) {
    next();
  } else if (!store.state.userInfo.username) {
    // mock login
    setTimeout(() => {
      // 完成登陆
      store.commit("setState", { userInfo: { username: "xiaoming" } });
      // 设置 受保护的路由
      let list = [
        { path: "/market", component: () => import("../views/Market") },
      ];
      baseRoutes.splice(1, 0, ...list);
      router.matcher = newRouter().matcher;
      next({ ...to, replace: true });
    }, 200);
  } else {
    next();
  }
});
export default router;
