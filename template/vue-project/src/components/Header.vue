<template>
  <div class="Header">
    <div class="Header-logo">logo</div>
    <div class="Header-console">right</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss">
.Header {
  height: 40px;
  line-height: 40px;
  background-color: #3f3f3f;
  color: #fff;
  &-logo {
    width: 200px;
    float: left;
    padding-left: 20px;
  }
  &-console {
    margin-left: 200px;
    text-align: right;
    padding-right: 20px;
  }
}
</style>
