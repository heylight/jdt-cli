<template>
  <div class="Group">
    <Bread></Bread>
    <el-button type="primary" @click="goSub">点击进入二级页面</el-button>
    <p v-for="i in 100" :key="i">{{ i }}</p>
  </div>
</template>

<script>
export default {
  name: 'Group',
  data() {
    return {};
  },
  methods: {
    goSub() {
      this.$router.push({ name: 'main.equipment.group.sub-page' });
    },
  },
  created() {},
};
</script>

<style lang="scss">
</style>
