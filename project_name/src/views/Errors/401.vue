<template>
  <div class="P401">
    <p>没有权限</p>
    <router-link to="/">首页</router-link>
    <p>
      <router-link to="/login">登陆</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'P401',
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss">
.P401 {
  width: 100%;
}
</style>
