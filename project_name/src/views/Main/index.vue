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
  height: calc(100vh - 40px);
  &-Con {
    margin-left: 200px;
    height: 100%;
  }
}
</style>
