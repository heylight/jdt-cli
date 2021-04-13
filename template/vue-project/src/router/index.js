import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import routes from './routes';
import Home from '../views/Home';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const baseRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
  },
  routes,
  {
    path: '/401',
    name: '401',
    component: () => import('../views/Errors/401.vue'),
  },
  {
    path: '/*',
    name: '404',
    component: () => import('../views/Errors/404.vue'),
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: baseRoutes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const { authority, routePermission } = store.state;
    let judge = () => {
      if (routePermission) {
        authority.includes(to.name) ? next() : next('/401');
      } else {
        next();
      }
    };
    if (store.state.userInfo.username) {
      judge();
    } else {
      store.dispatch('getUserInfo').then((res) => {
        if (res.code == 1) {
          judge();
        } else {
          next({ name: 'login', query: { ReturnUrl: to.fullPath } });
        }
      });
    }
  } else {
    next();
  }
});
export default router;
