<template>
  <div class="Header">
    <div class="Header-logo">
      <router-link to="/">logo</router-link>
    </div>
    <div class="Header-console">
      <el-dropdown @command="command">
        <span class="el-dropdown-link">
          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="out">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$store.state.userInfo.username;
    },
  },
  methods: {
    loginOut() {
      this.$axios.post('/loginOut').then((res) => {
        if (res.code) {
          this.$router.push({ name: 'login', query: { ReturnUrl: location.pathname } });
        }
      });
    },
    command(cmd) {
      if (cmd == 'out') this.loginOut();
    },
  },
  created() {},
};
</script>

<style lang="scss">
.Header {
  height: 40px;
  line-height: 40px;
  background-color: #212121;
  color: #fff;
  &-logo {
    width: 200px;
    float: left;
    padding-left: 20px;
    a {
      color: #fff;
    }
  }
  &-console {
    margin-left: 200px;
    text-align: right;
    padding-right: 20px;
    .el-dropdown {
      color: #fff;
    }
  }
}
</style>
