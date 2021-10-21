<template>
  <div>
    <div class="main">
      <div class="top">
        <el-button style="height:32px" type="primary" @click="createDevice">
          注册设备
        </el-button>

        <el-form ref="form" :inline="true" :model="searchForm" class="search">
          <el-form-item label="设备状态" prop="status">
            <el-select style="width:150px" v-model="searchForm.status">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称" prop="deviceName">
            <el-input
              style="width:220px"
              :clearable="true"
              v-model="searchForm.deviceName"
            />
          </el-form-item>
          <el-form-item>
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.2)"
      >
        <el-table-column prop="deviceId" label="设备ID" />
        <el-table-column prop="deviceName" label="设备名称" />
        <el-table-column prop="deviceTypeDesc" label="设备类型" />
        <el-table-column prop="deviceConnectStatusDesc" label="设备状态" />
        <el-table-column prop="deviceIp" label="IP地址" />
        <el-table-column prop="registerTime" label="注册时间" />
        <el-table-column prop="disableTime" label="禁用时间" />
        <el-table-column prop="inUse" label="启用">
          <template #default="scope">
            <el-switch
              :before-change="editStatus(scope)"
              v-model="scope.row.inUse"
            ></el-switch>
            <!-- @change="editStatus" -->
          </template>
        </el-table-column>
        <el-table-column prop="ctrl" label="操作">
          <template #default="scope">
            <el-button
              type="text"
              :disabled="scope.row.deviceConnectStatus == 1"
              @click="editItem(scope)"
              >修改</el-button
            >
            <el-button
              type="text"
              :disabled="scope.row.deviceConnectStatus == 1"
              @click="deleteItem(scope)"
              >删除</el-button
            >
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
    <CreateDevice ref="createDeviceRef" :rowData="rowData" @getList="getList" />
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import CreateDevice from "./CreateDevice.vue";
import _axios from "@/plugins/axios";
import { ElMessage } from "element-plus";

export default {
  name: "Device",
  components: { CreateDevice },
  setup() {
    const loading = ref(false);
    const searchForm = ref({
      deviceName: "",
      deviceStatus: "",
    });
    const rowData = ref({});
    const statusList = ref([
      { label: "全部", value: "" },
      { label: "在线", value: 1 },
      { label: "离线", value: 2 },
      { label: "异常", value: 3 },
      { label: "连接中", value: 4 },
    ]);
    function getStatusList() {
      _axios.get("/api/qc-cms/device/connectStatus").then((res) => {
        if (res.code == 1) {
          const arr = Object.entries(res.data).map((item) => {
            return { label: item[1], value: item[0] };
          });
          statusList.value = [{ label: "全部", value: "" }, ...arr];
        }
      });
    }
    const tableData = ref([]);
    const pageNum = ref(1);
    const pageSize = ref(10);
    const total = ref(tableData.value.length);
    function handleSearch() {
      getList();
    }
    function reset() {
      searchForm.value = { deviceName: "", deviceStatus: "" };
    }
    const t = ref(null);
    // let t = null;
    function getList(index, stopRefresh) {
      if (stopRefresh) clearTimeout(t.value);
      pageNum.value = index || 1;
      const params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        name: searchForm.value.deviceName || "",
        status: searchForm.value.status || "",
      };

      // Object.assign(params, this.form);
      loading.value = true;
      _axios.post("/api/qc-cms/device/page", params).then((res) => {
        if (res.code == 1) {
          tableData.value = res.data.list;
          loading.value = false;
          pageNum.value = res.data.pageNum;
          total.value = res.data.total;
          if (
            tableData.value.some((x) => [4].includes(x.deviceConnectStatus))
          ) {
            t.value = setTimeout(() => {
              getList(pageNum.value, true);
            }, 5000);
          }
        }
      });
    }
    onUnmounted(() => {
      if (t.value !== null) {
        clearTimeout(t.value);
        t.value = null;
      }
    });
    function editStatus({ row }) {
      return function() {
        return new Promise((resolve, reject) => {
          _axios
            .get(`/api/qc-cms/device/control?id=${row.id}&inUse=${!row.inUse}`)
            .then((res) => {
              if (res.code == 1) {
                getList();
                resolve(true);
              } else {
                getList();
                reject(false);
              }
            })
            .catch(() => {
              getList();
              reject(false);
            });
        });
      };
    }

    const createDeviceRef = ref(null);
    function createDevice() {
      rowData.value = {};
      createDeviceRef.value.visible = true;
    }
    function editItem({ row }) {
      rowData.value = row;
      createDeviceRef.value.visible = true;
    }
    function deleteItem({ row }) {
      _axios.delete(`/api/qc-cms/device?id=${row.id}`).then((res) => {
        if (res.code === 1) {
          ElMessage.success("删除成功");
          getList();
        }
      });
    }
    onMounted(() => {
      getList();
      getStatusList();
    });

    return {
      // form,
      searchForm,
      statusList,
      getStatusList,
      tableData,
      handleSearch,
      reset,
      getList,
      pageSize,
      pageNum,
      total,
      createDeviceRef,
      createDevice,
      editItem,
      deleteItem,
      rowData,
      editStatus,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
}
</style>
