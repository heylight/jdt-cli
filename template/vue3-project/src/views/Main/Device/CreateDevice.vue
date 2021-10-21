<template>
  <el-dialog
    :title="title"
    :model-value="visible"
    width="500px"
    @close="handleCancel"
    @open="open"
  >
    <el-form
      label-position="right"
      label-width="110px"
      ref="createFormRef"
      :rules="rule"
      :model="createForm"
    >
      <el-form-item label="设备名称" prop="deviceName">
        <!-- element+的input的maxlength有bug 暂替 -->
        <div class="el-input el-input--small">
          <input
            class="el-input__inner"
            maxlength="50"
            style="width:346px"
            v-model.trim="createForm.deviceName"
          />
        </div>
        <!-- <el-input
          :maxlength="50"
          show-word-limit
          style="width:346px"
          :clearable="true"
          v-model.trim="createForm.deviceName"
        ></el-input> -->
      </el-form-item>
      <el-form-item label="设备类型" prop="deviceType">
        <el-select
          style="width:346px"
          v-model="createForm.deviceType"
          :disabled="!isCreate"
        >
          <el-option
            v-for="item in deviceTypeList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备ID" prop="deviceId">
        <el-input
          maxlength="100"
          show-word-limit
          style="width:346px"
          :clearable="isCreate"
          v-model="createForm.deviceId"
          @input="inputId"
          :disabled="!isCreate"
          :controls="false"
        />
        <!-- -->
      </el-form-item>
      <el-form-item label="通讯URL地址" prop="notifyUrl">
        <el-input
          maxlength="500"
          show-word-limit
          style="width:346px"
          :clearable="true"
          v-model.trim="createForm.notifyUrl"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSave">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { deepCopy } from "@/utils";
import { ElMessage } from "element-plus";
import _axios from "@/plugins/axios";
const checkDeviceName = (rule, value, callback) => {
  const reg = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  if (value) {
    if (reg.test(value)) {
      callback(new Error("不能输入特殊字符"));
    }
  }
  callback();
};
export default {
  name: "CreateDevice",
  props: ["rowData"],
  emits: ["getList"],
  setup(props, context) {
    const createFormRef = ref({});
    const isCreate = computed(() => {
      if (props.rowData.deviceId) {
        return false;
      }
      return true;
    });
    const title = computed(() => {
      if (isCreate.value) return "注册设备";
      return "编辑设备";
    });
    const visible = ref(false);
    const createForm = ref({
      deviceName: "",
      deviceType: 1,
      // ip: "",
      deviceId: "",
      notifyUrl: "",
    });
    const rule = ref({
      deviceName: [
        { required: true, message: "请输入设备名称", trigger: "blur" },
        { validator: checkDeviceName, trigger: "blur" },
      ],
      deviceType: [
        { required: true, message: "请选择设备类型", trigger: "change" },
      ],
      deviceId: [{ required: true, message: "请输入设备ID", trigger: "blur" }],
      notifyUrl: [
        { required: true, message: "请输入通讯URL地址", trigger: "blur" },
      ],
    });
    function open() {
      if (!isCreate.value) {
        createForm.value = deepCopy(props.rowData);
        console.log(createForm.value);
      }
    }
    function inputId(e) {
      createForm.value = {
        ...createForm.value,
        deviceId: e
          .replace(/[a-zA-z]/g, "")
          .replace(/[\u4e00-\u9fa5]/g, "")
          .replace(
            /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/gim,
            ""
          )
          .replace(/\s/g, "")
          .trim(),
      };
    }
    const deviceTypeList = ref([]);
    function getDeviceTypeList() {
      _axios.get("/api/qc-cms/device/type").then((res) => {
        if (res.code == 1) {
          const arr = Object.entries(res.data).map((item) => {
            return {
              label: item[1],
              value: +item[0],
            };
          });
          deviceTypeList.value = arr;
        }
      });
    }
    function handleSave() {
      createFormRef.value.validate((valid) => {
        if (valid) {
          if (isCreate.value) {
            const params = {
              ...createForm.value,
            };
            _axios.post("/api/qc-cms/device/create", params).then((res) => {
              if (res.code == 1) {
                ElMessage.success("创建成功");
                visible.value = false;
                context.emit("getList");
              }
            });
          } else {
            const params = {
              ...createForm.value,
            };
            _axios.post("/api/qc-cms/device/edit", params).then((res) => {
              if (res.code == 1) {
                ElMessage.success("编辑成功");
                visible.value = false;
                context.emit("getList");
              }
            });
          }
        }
      });
      context.emit("getList", 1, true);
    }
    function handleCancel() {
      createForm.value = {
        deviceName: "",
        deviceType: 1,
        deviceIp: "",
        deviceId: "",
        notifyUrl: "",
      };
      visible.value = false;
      context.emit("getList", 1);
    }
    onMounted(() => {
      getDeviceTypeList();
    });
    return {
      isCreate,
      title,
      createForm,
      createFormRef,
      rule,
      deviceTypeList,
      getDeviceTypeList,
      inputId,
      handleSave,
      handleCancel,
      visible,
      open,
    };
  },
};
</script>

<style lang="scss">
.el-input-number .el-input__inner {
  text-align: unset !important;
}
</style>
