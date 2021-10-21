import { createStore } from "vuex";

const store = createStore({
  state: {
    userInfo: {},
    authority: [],
    menu: [],
    // serviceHost: '',
    // dataSourceClassifies: {}, // 数据源分类map
    // aiClassifies: {}, // 模型分类map api分类map
    // logicClassifies: {
    //   DECISION: '条件组件',
    //   FORK_JOIN: '并行组件',
    //   EXCLUSIVE_JOIN: '条件聚合',
    //   JOIN: '聚合组件',
    //   START: '开始组件',
    //   END: '结束组件',
    // }, // 逻辑分类map
  },
  mutations: {
    setState(state, payload = {}) {
      Object.keys(payload).forEach((key) => {
        // Vue.set(state, key, payload[key]);
        state[key] = payload[key];
      });
    },
  },
  actions: {
    noUserInfo({ commit }) {
      return new Promise((resolve) => {
        const res = {
          code: 1,
          message: null,
          data: {
            userName: "jiaxingdong",
          },
        };
        commit("setState", {
          userInfo: res.data,
          authority: [
            // 用户只能访问数组中的路由
            "main",
            "main.device",
            "main.device.deviceManage",
            "main.data",
            "main.data.collect",
            "main.data.collectDetail",
          ],
        });
        resolve(res);
      });
    },
  },
  modules: {},
});

export default store;
