<template>
  <div class="Main">
    <Header />
    <SideMenu />
    <router-view class="Main-Con" />
  </div>
</template>

<script>
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';
export default {
  name: 'Main',
  data() {
    return {};
  },
  components: { Header, SideMenu },
  methods: {},
  created() {},
};
</script>

<style lang="scss">
.Main {
  height: 100vh;
  &-Con {
    margin-left: 200px;
    height: calc(100% - 40px);
  }
}
</style>
