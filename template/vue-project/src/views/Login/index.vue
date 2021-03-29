<template>
  <div class="Login">
    <el-form ref="form" :model="form">
      <el-form-item label="账号">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  computed: {
    returnUrl() {
      return this.$route.query.ReturnUrl || '';
    },
  },
  methods: {
    login() {
      this.$axios.post('login', this.form).then((res) => {
        if (res.code == 1) {
          this.$router.push(this.returnUrl || '/main');
        }
      });
    },
  },
  created() {},
};
</script>

<style lang="scss">
.Login {
  height: 100vh;
  background-color: #dcdcdc;
  text-align: center;
  padding-top: 30px;
  .el-form {
    display: inline-block;
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }
}
</style>
