<template>
  <div class="NotFound">
    <div>404 找不到页面！</div>
    <div><el-button type="primary" @click="$router.go(-1)">返回上一级</el-button></div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss">
.NotFound {
  font-size: 50px;
  text-align: center;
  padding-top: 50px;
}
</style>
