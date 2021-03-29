<template>
  <div class="SideMenu">
    <el-menu
      :default-active="active"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="selectMenu"
    >
      <template v-for="(item, m) in parseRoute(routes)">
        <el-submenu :index="item.meta.routeId" :key="'m' + m" v-if="item.children">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            :index="subItem.name"
            v-for="(subItem, n) in parseRoute(item.children)"
            :key="'n' + n"
          >
            {{ subItem.meta.title }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.name" :key="'m' + m">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import routes from '../router/routes';
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
      return this.$route.name;
    },
  },
  methods: {
    parseRoute(route) {
      return route.filter((x) => {
        let name = x.name || x.meta.routeId;
        let nameArr = name.split('.');
        let flag = false;
        if (x.meta.exclude) return false;
        for (let m = 0; m < this.authority.length; m++) {
          let el = this.authority[m];
          let elArr = el.split('.');
          if (el === name || (elArr.length > nameArr.length && el.startsWith(name + '.'))) {
            flag = true;
            break;
          }
        }
        return flag;
      });
    },
    selectMenu(name) {
      this.$router.push({ name });
    },
  },
  created() {},
};
</script>

<style lang="scss">
.SideMenu {
  width: 200px;
  float: left;
  background-color: #f00;
  height: calc(100% - 40px);
  overflow: auto;
  .el-menu {
    height: 100%;
    border-right: none;
  }
}
</style>
