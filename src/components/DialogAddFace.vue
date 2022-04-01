<template>
  <el-dialog
      title="添加人脸"
      v-model="visible"
      width="400px"
      @close="handleClose"
  >
    <el-form :model="ruleForm" ref="formRef" label-width="50px">
      <el-form-item label="图片" prop="url">

        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeUpload"
        >
          <img v-if="ruleForm.url" :src="ruleForm.url" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>

      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {reactive, ref, toRefs} from 'vue'
import axios from '@/utils/axios'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'DialogAddFace',
  components:{
    Plus
  },
  props: {
    reload: Function
  },
  setup(props) {
    const formRef = ref(null)
    const state = reactive({
      visible: false,
      ruleForm: {
        url: '',
        name: ''
      }
    })

    // 上传图片
    const beforeUpload = (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);//读取图像文件 result 为 DataURL, DataURL 可直接 赋值给 img.src
      reader.onload = function (event) {
        state.ruleForm.url=event.target.result
      }
    }
    // 开启弹窗
    const open = () => {
      state.visible = true
    }
    // 关闭弹窗
    const close = () => {
      state.visible = false
    }
    const handleClose = () => {
      formRef.value.resetFields()
    }
    const submitForm = () => {
      axios.post('/faceAdd', {
        name: state.ruleForm.name,
        image: state.ruleForm.url,
      }).then(() => {
        ElMessage.success('添加成功')
        state.visible = false
        if (props.reload) props.reload()
      })

    }
    return {
      ...toRefs(state),
      beforeUpload,
      open,
      close,
      formRef,
      submitForm,
      handleClose
    }
  }
}
</script>

<style>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>