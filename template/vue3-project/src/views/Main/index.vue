<template>
  <!-- <div class="Main">
    <SideMenu />
    <div class="Main-Layout">
      <Header :isNeedLogin="false" /><Breadcrumb />
      <router-view class="Main-view" />
    </div>
  </div> -->
  <div class="Main">
    <Header :isNeedLogin="true" />
    <div class="Main-Layout">
      <SideMenu />
      <div class="Main-Contnet">
        <Breadcrumb /><router-view class="Main-Contnet-view" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SideMenu from "./SideMenu";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "Main",
  data() {
    return {};
  },
  components: {
    Header,
    SideMenu,
    Breadcrumb,
  },
};
</script>

<style lang="scss">
// .Main {
//   min-width: 1500px;
//   display: flex;
//   &-Layout {
//     display: flex;
//     flex-direction: column;
//     flex: 1;
//   }
//   &-view {
//     flex: 1;
//     height: calc(100vh - 40px);
//     overflow-y: auto;
//     padding: 20px;
//     background: #f5f7f8;
//   }
// }
.Main {
  min-width: 1500px;
  &-Layout {
    display: flex;
  }
  &-Contnet {
    flex: 1;
    display: flex;
    flex-direction: column;
    &-view {
      // flex: 1;
      height: calc(100vh - 80px);
      overflow-y: auto;
      padding: 12px;
      background: #f5f7f8;
      .main {
        padding: 20px;
        background: #fff;
      }
    }
  }
  .search {
    // padding: 20px;
    background: #fff;
    .bottom-btn {
      margin-bottom: 0;
    }
  }
}
</style>
