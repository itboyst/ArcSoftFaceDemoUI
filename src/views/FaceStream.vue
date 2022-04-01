<template>
<!--  <el-table :data="tableData" border style="width: 750px">-->
<!--    <el-table-column type="index" label="序号" width="180px"/>-->
<!--    <el-table-column prop="name" label="姓名" width="180px"/>-->
<!--    <el-table-column-->
<!--        label="注册照"-->
<!--        width="210px">-->
<!--      <template #default="scope">-->
<!--        <img style="width: 180px;height: 60px;object-fit: contain;" :src="scope.row.url" alt="">-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column label="操作" width="180px">-->
<!--      <template #default="scope">-->
<!--        <el-button v-if="scope.$index>1"-->
<!--                   size="small"-->
<!--                   type="danger"-->
<!--                   @click="handleDelete(scope.$index, scope.row)"-->
<!--        >删除-->
<!--        </el-button-->
<!--        >-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--  </el-table>-->

<!--  <div style="width: 750px;align-content: center;  text-align: center; margin-top: 20px">-->
<!--    <el-button type="primary" @click="handleAdd">添加注册照</el-button>-->
<!--  </div>-->

  <div style="width: 640px; margin-top: 20px; ">
    <el-input style="width: 570px" v-model="inputText" placeholder="请输入播放地址:例：E:\FFOutput\06.mp4；rtsp:xxxxx；http://xxx.mp4等"/>
    <el-button style="width: 50px;margin-left: 20px" type="primary" @click="play">播放</el-button>

  </div>

  <div id="mse" style="width: 750px;height: 500px; margin-top: 20px; border: 1px solid black;">

  </div>

  <DialogAddFace ref='addFaceDialog' :reload="submit"/>
</template>

<script >
import {onMounted, onUnmounted, toRefs, reactive, ref} from 'vue'
import axios from '@/utils/axios'
import DialogAddFace from '@/components/DialogAddFace.vue'
import Player from 'xgplayer'
import FlvJsPlayer from 'xgplayer-flv'
import { ElMessage } from 'element-plus'
export default {
  name: 'FaceStream',
  components: {
    DialogAddFace
  },
  setup() {

    const state = reactive({inputText: ''})

    let tableData = ref([]);
    const addFaceDialog = ref(null)

    let player;

    onMounted(() => {

      // axios.post("/getFaceList", {}).then(response => {
      //   if (response.code === 0) {
      //     console.info(response.data)
      //     tableData.value = response.data;
      //   }
      // })

      player = new FlvJsPlayer({
        "id": "mse",
        "url": "stream",
        width: 640,
        height: 500,
        isLive: true,
        playsinline: true,
      });


    })
    onUnmounted(() => {
      player.destroy();
    })

    const play = () => {
      if (state.inputText == '') {
        ElMessage.error('请输入播放地址')
      }else {
        player.destroy();
        player = new FlvJsPlayer({
          "id": "mse",
          "url": 'stream?address=' + encodeURIComponent(state.inputText),
          width: 640,
          height: 500,
          isLive: true,
          autoplay: true,
          playsinline: true,
        });
      }
    }

    const handleDelete = (index, row) => {
      console.log(index, row)
      tableData.value.splice(index, 1)
    }

    const handleAdd = () => {
      addFaceDialog.value.open()
    }

    const submit = () => {
      console.info("xxx")
    }

    return {
      ...toRefs(state),
      handleDelete,
      addFaceDialog,
      tableData,
      handleAdd,
      submit,
      play

    }
  }
}
</script>

<style scoped>

</style>