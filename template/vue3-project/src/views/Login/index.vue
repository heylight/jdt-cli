<template>
  <div class="Login">
    <div class="Login-box">
      <div class="Login-box-pannel">
        <h2 class="Login-box-top">登录</h2>
        <el-form label-position="top" label-width="36px" :model="form">
          <el-form-item label="账号">
            <el-input v-model.trim="form.username" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-form>
        <div class="Login-box-btm">
          <el-button type="primary" @click="login">登录</el-button>
          <div class="desc">账号问题请联系管理员，139XXXXXX</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const returnUrl = computed(() => {
      return route.query.returnUrl === "/" ? "" : route.query.returnUrl;
    });
    function login() {
      if (this.form.username === "") {
        this.$message.warning("用户名不能为空!");
        return;
      }
      if (this.form.password === "") {
        this.$message.warning("密码不能为空!");
        return;
      }
      // this.$router.push(this.returnUrl || '/main/service');
      // this.$axios
      //   .post('/api/cms/system/login', {
      //     userName: this.form.username,
      //     password: this.form.password,
      //   })
      new Promise((res) => {
        res({
          code: 1,
        });
      }).then((res) => {
        if (res.code === 1) {
          router.push(this.returnUrl || "/");
        }
      });
    }
    return {
      returnUrl,
      login,
    };
  },
};
</script>

<style lang="scss">
.Login {
  height: 100vh;
  background-color: #fafbfc;
  position: relative;
  color: #333;
  min-width: 1440px;
  &-box {
    width: 440px;
    height: 406px;
    position: absolute;
    // left: 50%;
    left: 880px;
    top: 50%;
    margin-top: -203px;
    // margin-left: -200px;
    &-top {
      text-align: center;
      font-size: 20px;
      margin-bottom: 25px;
    }
    &-pannel {
      width: 440px;
      height: 406px;
      background-color: #fff;
      border: 1px solid #ebebeb;
      border-radius: 3px;
      padding: 40px;
      .el-form-item__label {
        color: #333;
        padding-bottom: 12px;
        line-height: 22px;
        font-size: 16px;
      }
      .el-form-item--small.el-form-item {
        margin-bottom: 24px;
      }
    }
    &-btm {
      text-align: center;
      .el-button {
        width: 100%;
        height: 44px;
        font-size: 16px;
      }
      .desc {
        font-size: 12px;
        margin-top: 24px;
      }
    }
  }
}
</style>
