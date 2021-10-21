<template>
  <div>
    <div class="main">
      <el-form ref="form" :inline="true" :model="searchForm" class="search">
        <el-form-item label="工件ID" prop="workpieceId">
          <el-input
            style="width:200px"
            :clearable="true"
            v-model="searchForm.workpieceId"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="设备ID" prop="deviceId">
          <el-input
            v-model="searchForm.deviceId"
            style="width:200px"
            :clearable="true"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="采集时间" prop="time">
          <el-date-picker
            type="daterange"
            v-model="searchForm.time"
            style="width:258px"
            range-separator="至"
            :clearable="true"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
      >
        <el-table-column prop="workpieceId" label="工件ID" />
        <el-table-column prop="deviceId" label="设备ID" />
        <!-- <el-table-column prop="tempId" label="模板ID" /> -->
        <el-table-column prop="modifyTime" label="采集时间" />
        <el-table-column prop="ctrl" label="操作">
          <template #default="scope">
            <el-button type="text" @click="toDetail(scope)">查看详情</el-button>
            <el-button type="text" @click="exportItem(scope)">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="(index) => getList(index, true)"
        :current-page="pageNum"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, onUnmounted, onMounted } from "vue";
import { useRouter } from "vue-router";
// eslint-disable-next-line no-unused-vars
import _axios from "@/plugins/axios";
export default {
  name: "Collect",
  // components:{}
  setup() {
    // const form = ref();
    const router = useRouter();
    const searchForm = ref({
      workpieceId: "",
      deviceId: "",
      time: "",
    });

    const tableData = ref([]);
    const loading = ref(false);
    const pageNum = ref(1);
    const pageSize = ref(10);
    const total = ref(tableData.value.length);
    function handleSearch() {
      // _axios.get("/test/api/cms/health/check").then((res) => {
      //   console.log(res);
      // });
      getList();
    }
    function reset() {
      searchForm.value = {
        workpieceId: "",
        deviceId: "",
        time: "",
      };
    }
    // const t = ref(null);
    function getList(index) {
      // if (stopRefresh) clearTimeout(t.value);
      pageNum.value = index || 1;
      const params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        workpieceId: searchForm.value.workpieceId || "",
        deviceId: searchForm.value.deviceId || "",
        startTime: searchForm.value.time[0] || "",
        endTime:
          (searchForm.value.time[1] &&
            searchForm.value.time[1].replace("00:00:00", "23:59:59")) ||
          "",
      };
      // Object.assign(params, this.form);
      loading.value = true;
      _axios.post("/api/qc-cms/data/collect/page", params).then((res) => {
        if (res.code == 1) {
          console.log(res);
          tableData.value = res.data.list;

          pageNum.value = res.data.pageNum;
          total.value = res.data.total;
          // if (
          //   tableData.value.some((x) => [4].includes(x.deviceConnectStatus))
          // ) {
          //   t.value = setTimeout(() => {
          //     getList(pageNum.value, true);
          //   }, 5000);
          // }
        }
        loading.value = false;
      });
    }
    // onUnmounted(() => {
    //   if (t.value !== null) {
    //     clearTimeout(t.value);
    //     t.value = null;
    //   }
    // });
    function toDetail({ row }) {
      // console.log(route);
      router.push(`/data/collectDetail?id=${row.id}`);
    }
    function exportItem({ row }) {
      console.log(row);
    }
    onMounted(() => {
      getList();
    });
    return {
      // form,
      searchForm,
      pageNum,
      pageSize,
      total,
      tableData,
      handleSearch,
      reset,
      getList,
      toDetail,
      exportItem,
      loading,
    };
  },
};
</script>
