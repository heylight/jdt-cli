<template>
  <div class="SideMenu">
    <el-menu
      :default-active="active"
      background-color="#2C2C2D"
      text-color="#fff"
      @select="selectMenu"
    >
      <template v-for="(item, m) in parseRoute(routes)">
        <el-submenu :index="'m' + m" :key="'m' + m" v-if="item.children">
          <template slot="title">
            <i :class="item.meta.icon || 'el-icon-menu'"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            :index="subItem.name"
            v-for="(subItem, n) in parseRoute(item.children)"
            :key="'n' + n"
          >
            <span class="subtitle">{{ subItem.meta.title }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.name" :key="'m' + m">
          <i :class="item.meta.icon || 'el-icon-menu'"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import routes from '../router/routes';
import { filterMenu } from '../utils';
export default {
  name: 'SideMenu',
  data() {
    return {
      routes: routes.children,
    };
  },
  computed: {
    authority() {
      return this.$store.state.authority;
    },
    active() {
      let name = this.$route.name || '';
      let arr = name.split('.').slice(0, 3);
      return arr.join('.');
    },
  },
  methods: {
    parseRoute(routes) {
      return filterMenu(routes, this.authority);
    },
    selectMenu(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss">
.SideMenu {
  height: calc(100vh - 40px);
  width: 200px;
  overflow: auto;
  float: left;
  .el-menu {
    height: 100%;
    border-right: none;
    .is-active {
      background-color: #4762fe !important;
      color: #fff !important;
    }
    .subtitle {
      font-size: 12px;
      padding-left: 10px;
    }
    .el-submenu .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
