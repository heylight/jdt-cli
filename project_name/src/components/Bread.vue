<template>
  <div :class="['Bread', { not: not === '' }]">
    <div
      v-show="!($slots.default && $slots.default.length)"
      v-for="(item, m) in BreadList"
      :key="m"
      :title="item.title"
      class="Bread-link"
    >
      <span class="Bread-item">{{ item.title | short10 }}</span>
      <span v-if="m !== BreadList.length - 1" class="gang">/</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Bread',
  filters: {
    short10(val) {
      return val.length < 11 ? val : `${val.substr(0, 9)}...`;
    },
  },
  props: {
    not: {
      type: String,
      default: undefined,
    },
    ext: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      BreadList: [],
    };
  },
  watch: {
    $route() {
      this.getTitle();
    },
  },
  created() {
    this.getTitle();
  },
  methods: {
    getTitle() {
      const matchs = this.$route.matched;
      const list = [];
      for (let i = 0; i < matchs.length; i += 1) {
        const item = matchs[i];
        if (i !== 0) {
          list.push({
            title: item.meta.title,
            name: item.name,
            path: item.path,
          });
        }
      }
      if (this.ext) {
        list.push({ title: this.ext });
      }
      this.BreadList = list;
    },
  },
};
</script>

<style lang="scss">
.Bread {
  background-color: #ffffff;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  line-height: 20px;
  margin-bottom: 10px;
  display: flex;
  font-size: 12px;
  &.not {
    box-shadow: none;
    margin-bottom: 0;
  }
  &-item {
    display: inline-block;
    text-decoration: none;
    padding: 0 8px 0 5px;
    text-align: center;
    color: #97a3b4;
    &:last-of-type {
      color: #333;
    }
  }
  .gang {
    color: #97a3b4;
    padding-right: 5px;
  }
}
</style>
