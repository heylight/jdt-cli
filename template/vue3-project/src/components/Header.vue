<template>
  <div class="Header">
    <!-- <img src="@/assets/image/logo.png" height="21" width="140" alt="" /> -->
    <div class="Header-right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="dropdown-menu">
            <el-dropdown-item @click="Logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { goLogin } from "../utils";
import { useStore } from "vuex";
import _axios from "@/plugins/axios.js";

export default {
  name: "Header",
  props: ["isNeedLogin"],
  setup(props) {
    const store = useStore();
    console.log(store);
    const userName = computed(() => {
      return store.state.userInfo.userName || "未登录";
    });
    const needLogin = computed(() => {
      return process.env.VUE_APP_NO_LOGIN !== "yes" && props.isNeedLogin;
    });
    function Logout() {
      _axios.post("/api/logout").then((res) => {
        if (res.code === 1) {
          goLogin();
        }
      });
    }
    return {
      userName,
      needLogin,
      Logout,
    };
  },
};
</script>

<style lang="scss">
.Header {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  background-color: #24292e;
  color: #fff;
  display: flex;
  align-items: center;
  &-logo {
    // background-image: url(~@/assets/image/logo.png);
    background-size: 140px 21zpx;
    width: 140px;
    height: 21px;
    // cursor: pointer;
  }
  &-right {
    flex: 1;
    text-align: right;
    .el-dropdown {
      color: #fff;
    }
  }
}
</style>
