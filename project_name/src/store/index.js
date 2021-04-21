import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    routePermission: false, // 是否开启接口控制的路由权限
    authority: [],
  },
  getters: {
    consoleHome(state) {
      const m = state.authority;
      return { name: m.length ? m[0] : 'login' };
    },
  },
  mutations: {
    setState(state, payload = {}) {
      Object.keys(payload).forEach((key) => {
        Vue.set(state, key, payload[key]);
      });
    },
  },
  actions: {
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.axios.get('/getUserInfo').then((res) => {
          if (res.code === 1) {
            commit('setState', {
              userInfo: res.data,
              // 用户有权访问的路由，从后端接口获取
              // 只有添加到authority中的name才可以添加到路由
              // routePermission=true 的时候authority有效
              authority: [
                'main.equipment.group',
                'main.equipment.group.sub-page',
                'main.equipment.device',
                // 'main.equipment.overview',
                // 'main.algorithm',
                // 'main.tasks.tasks',
                // 'main.tasks.events',
                // 'main.authority.users',
                // 'main.authority.authority',
              ],
            });
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    },
  },
  modules: {},
});
