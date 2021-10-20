<template>
  <div>
    <div class="baseInfo main">
      <div class="title">基本信息</div>
      <div class="infos">
        <img src="@/assets/image/shape/history.svg" class="logo" />
        <div class="right">
          <div class="row">
            <div class="col">
              <div class="label">工件ID：</div>
              <div class="content">{{ baseInfo.workpieceId }}</div>
            </div>
            <div class="col">
              <div class="label">设备ID：</div>
              <div class="content">{{ baseInfo.deviceId }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="label">工件类型：</div>
              <div class="content">{{ baseInfo.workpieceTypeName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail main">
      <div class="title">数据详情</div>
      <div class="items">
        <div class="item normal" v-for="item in detailInfo" :key="item.id">
          <img
            width="376"
            height="210"
            style="margin:-20px"
            :src="`/pictures${item.thumbnailFilePath}`"
            alt=""
          />
          <div class="item-detail">
            <div class="col">
              <div class="label">图片ID：</div>
              <div class="content">{{ item.fileName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _axios from "@/plugins/axios";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue-demi";
export default {
  setup() {
    const route = useRoute();
    const baseInfo = ref({});
    const detailInfo = ref([]);
    function getDetail() {
      _axios
        .get(`/api/qc-cms/data/collect/detail?id=${route.query.id}`)
        .then((res) => {
          if (res.code == 1) {
            baseInfo.value = res.data.fileGroup;
            detailInfo.value = res.data.fileList;
            console.log(detailInfo.value);
          }
        });
    }
    onMounted(() => {
      getDetail();
    });
    return {
      baseInfo,
      detailInfo,
      getDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 20px;
}
.baseInfo {
  // display: flex;
  .infos {
    display: flex;
    .right {
      display: flex;
      flex: 1;
      margin-left: 40px;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .logo {
    height: 80px;
    width: 80px;
  }
}
.detail {
  .label {
    width: 80px;
  }
  .content {
    line-height: 20px;
    height: 40px;
    word-break: break-all;
  }
  margin-top: 12px;
  .items {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;

    .item {
      // flex: 1;
      height: 394px;
      width: 376px;
      border: 1px solid #cccfd4;
      margin: 0 24px 20px 0;
      padding: 20px;
      &-title {
        font-weight: 500;
        height: 20px;
        line-height: 20px;
        margin: 20px 0 12px 0;
      }
      .col {
        margin-bottom: 12px;
      }
    }
    .normal {
      height: 298px;
      .item-detail {
        margin-top: 20px;
      }
    }
  }
}
</style>
