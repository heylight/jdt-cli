<template>
  <div class="home">
    home
    <div><el-button type="primary" @click="goConsole">控制台</el-button></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goConsole() {
      this.$router.push(this.$store.getters.consoleHome);
    },
  },
  created() {
    this.$store.dispatch('getUserInfo', 'silence');
  },
};
</script>
