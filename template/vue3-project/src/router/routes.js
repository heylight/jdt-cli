import ViewBox from "../components/ViewBox.vue";

export default {
  path: "/",
  meta: { requiresAuth: true },
  component: () => import("@/views/Main"),
  name: "main",
  children: [
    {
      path: "/device",
      name: "main.device",
      meta: {
        title: "设备管理",
        icon: "&#xe629;",
        shadowName: "main.device",
      },
      component: ViewBox,
      children: [
        {
          path: "deviceManage",
          name: "main.device.deviceManage",
          meta: {
            title: "设备列表",
          },
          component: () => import("@/views/Main/Device"),
        },
      ],
    },
    {
      path: "/data",
      name: "main.data",
      meta: {
        title: "数据管理",
        icon: "&#xe629;",
        shadowName: "main.data",
      },
      component: ViewBox,
      children: [
        {
          path: "collect",
          name: "main.data.collect",
          meta: {
            title: "采集数据",
          },
          component: () => import("@/views/Main/Data/Collect"),
        },
        {
          path: "collectDetail",
          name: "main.data.collectDetail",
          meta: {
            title: "采集数据详情",
            exclude: true,
          },
          component: () => import("@/views/Main/Data/Collect/detail"),
        },
      ],
    },
  ],
};
