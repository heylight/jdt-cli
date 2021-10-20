<template>
  <div class="Sidebar">
    <div class="logo"></div>
    <el-menu
      :default-active="defaultActive"
      background-color="#2C2C2D"
      text-color="#fff"
      active-text-color="#fff"
      @select="onSelect"
    >
      <template v-for="(menu, m) in parseMenu(smenu)">
        <el-sub-menu v-if="menu.children" :key="menu" :index="menu.meta.title">
          <template #title>
            <i
              v-if="menu.meta"
              class="iconfont"
              v-html="menu.meta.icon || '&#xe65d;'"
            />
            <span @click="print(menu.children)">{{
              menu.meta ? menu.meta.title : ""
            }}</span>
          </template>
          <!-- <div v-for="item in parseMenu"></div> -->
          <el-menu-item
            v-for="(sub, n) in parseMenu(menu.children)"
            :key="n"
            :index="sub.name"
          >
            {{ sub.meta ? sub.meta.title : "" }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :key="m" :index="menu.name">
          <i
            v-if="menu.meta"
            class="iconfont"
            v-html="menu.meta.icon || '&#xe65d;'"
          />
          <template #title>
            <span>{{ menu.meta ? menu.meta.title : "" }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import routes from "../../router/routes";

export default {
  name: "Sidebar",
  data() {
    return {
      smenu: routes.children,
    };
  },
  computed: {
    defaultActive() {
      return this.parseIndex(this.$route.name);
    },
    authority() {
      return this.$store.state.authority;
    },
  },
  methods: {
    parseMenu(route) {
      const parsedMenu = route.filter((x) => {
        const name = x.name || x.meta.shadowName;
        const nameArr = name.split(".");
        let flag = false;
        if (x.meta.exclude) return false;
        for (let m = 0; m < this.authority.length; m++) {
          const el = this.authority[m];
          const elArr = el.split(".");
          if (
            el === name ||
            (elArr.length > nameArr.length && el.startsWith(`${name}.`))
          ) {
            flag = true;
            break;
          }
        }
        return flag;
      });

      return parsedMenu;
    },
    print(e) {
      console.log(e);
    },
    parseIndex(name) {
      const arr = name.split(".");
      return arr.slice(0, 3).join(".");
    },
    onSelect(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss">
.Sidebar {
  // .logo {
  //   height: 40px;
  //   border-right: 1px solid #e6e6e6;
  //   background-color: #2C2C2D;
  // }
  width: 200px;
  min-width: 200px;
  // height: fle;
  // height: calc(100vh - 40px);
  // height: 100vh;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
  overflow-x: hidden;
  .el-menu {
    // height: calc(100% - 40px);
    height: 100%;
    .iconfont {
      position: relative;
      left: -5px;
    }
    .is-active {
      background: #4762fe !important;
    }
  }
}
</style>
