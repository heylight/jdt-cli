<template>
  <div class="p401">
    <div>没有访问权限！</div>
    <div><el-button type="primary" @click="$router.go(-1)">返回上一级</el-button></div>
  </div>
</template>

<script>
export default {
  name: 'p401',
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss">
.p401 {
  font-size: 50px;
  text-align: center;
  padding-top: 50px;
}
</style>
