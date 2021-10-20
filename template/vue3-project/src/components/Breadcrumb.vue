<template>
  <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, ind) in name" :key="ind">
      {{ item }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Breadcrumb",
  setup() {
    const route = useRoute();
    const name = computed(() => route.name.split("."));
    return {
      route,
      name,
    };
  },
};
</script>

<style lang="scss">
.bread {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 20px;
}
</style>
