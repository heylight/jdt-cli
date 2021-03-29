import ViewBox from '../components/ViewBox.vue';
export default {
  path: '/main',
  meta: {
    requiresAuth: true,
    routeId: 'main',
  },
  redirect: '/main/equipment/group',
  component: () => import('../views/Main'),
  children: [
    {
      path: 'equipment',
      meta: {
        title: '视频设备管理',
        routeId: 'main.equipment',
      },
      component: ViewBox,
      children: [
        {
          path: 'group',
          name: 'main.equipment.group',
          meta: {
            title: '设备组管理',
            exclude: false, // 是否在菜单中显示
          },
          component: () => import('../views/Main/Equipment/Group'),
        },
        {
          path: 'device',
          name: 'main.equipment.device',
          meta: {
            title: '设备管理',
          },
          component: () => import('../views/Main/Equipment/Device'),
        },
        {
          path: 'overview',
          name: 'main.equipment.overview',
          meta: {
            title: '设备预览',
          },
          component: () => import('../views/Main/Equipment/Overview'),
        },
      ],
    },
    {
      path: 'algorithm',
      name: 'main.algorithm',
      meta: {
        title: '算法管理',
      },
      component: () => import('../views/Main/Algorithm'),
    },
    {
      path: 'tasks',
      meta: {
        title: '任务管理',
        routeId: 'main.tasks',
      },
      component: ViewBox,
      children: [
        {
          path: 'tasks',
          name: 'main.tasks.tasks',
          meta: {
            title: '任务管理',
          },
          component: () => import('../views/Main/Tasks/Tasks'),
        },
        {
          path: 'events',
          name: 'main.tasks.events',
          meta: {
            title: '任务管理',
          },
          component: () => import('../views/Main/Tasks/Events'),
        },
      ],
    },
    {
      path: 'authority',
      meta: {
        title: '权限管理',
        routeId: 'main.authority',
      },
      component: ViewBox,
      children: [
        {
          path: 'users',
          name: 'main.authority.users',
          meta: { title: '用户管理' },
          component: () => import('../views/Main/Authority/Users'),
        },
        {
          path: 'authority',
          name: 'main.authority.authority',
          meta: { title: '权限管理' },
          component: () => import('../views/Main/Authority/Authority'),
        },
      ],
    },
  ],
};