import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    authority: [],
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
          if (res.code == 1) {
            commit('setState', {
              userInfo: { username: 'xiaoming' },
              // 用户有权访问的路由，从后端接口获取
              authority: [
                'main.equipment.group',
                'main.equipment.device',
                'main.equipment.overview',
                'main.algorithm',
                'main.tasks.tasks',
                'main.tasks.events',
                'main.authority.users',
                'main.authority.authority',
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
