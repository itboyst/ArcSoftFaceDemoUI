<template>
  <div class="class_face_detect">
    <el-container>
      <el-header>
        <div class="class_title">人脸检测示例</div>
      </el-header>

      <el-main>
        <div class="class_image__lazy">
          <el-image class="image__lazy" fit="contain" :src="state.imageSrc">
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <icon-picture/>
                </el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </el-main>
      <el-footer>

        <div class="class_select">
          <span style="margin-left: 20px;margin-right: 10px">选择下拉照片</span>
          <el-select v-model="state.selectValue" @change="selectChange" placeholder="Select">
            <el-option
                v-for="item in state.imageOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>

        <div class="class_select" style="margin-top: 20px">

          <el-upload
              class="upload-demo"
              :before-upload="beforeUpload"
              accept="image/png, image/jpeg"
              :show-file-list="false"
          >
            <el-button type="primary">上传本地照片检测</el-button>
          </el-upload>

        </div>

      </el-footer>


    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from 'vue'
import axios from '@/utils/axios'

const state = reactive({
  selectValue: 'images/Image1-1.jpg',
  imageSrc: '',
  imageOption: [{
    value: 'images/Image1-1.jpg',
    label: 'Image1-1.jpg',
  },
    {
      value: 'images/Image2-1.jpg',
      label: 'Image2-1.jpg'
    },
    {
      value: 'images/Image3-1.jpg',
      label: 'Image3-1.jpg',
    },]
})

onMounted(() => {
  responseDrawImage(state.selectValue)
})

const selectChange = (value: string) => {
  responseDrawImage(value)
}

const beforeUpload = (file: Blob) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);//读取图像文件 result 为 DataURL, DataURL 可直接 赋值给 img.src
  reader.onload = function (event: any) {
    responseDrawImage(event.target.result)
  }
}

const responseDrawImage = (src: string) => {

  let image = new Image();
  image.src = src;
  image.onload = function () {
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let ctx: any = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height)
    axios.post("/detectFaces", {image: canvas.toDataURL("image/jpeg")})
        .then((response: any) => {
          if (response.code === 0 && response.data.length > 0) {
            response.data.forEach((r: any) => {
              let rect = r.rect;
              let x = rect.left;
              let y = rect.top;
              let w = rect.right - rect.left;
              let h = rect.bottom - rect.top;
              ctx.strokeStyle = "#FF0000";
              ctx.lineWidth = 5;
              ctx.strokeRect(x, y, w, h);
              let gender = '未知'
              if (r.gender === 0) {
                gender = '男'
              } else if (r.gender === 1) {
                gender = '女'
              }

              let liveness = '-';
              if (r.liveness == 1) {
                liveness = '活体'
              } else if (r.liveness == 0) {
                liveness = '非活体'
              }

              let txt = '性别:' + gender + '，年龄:' + r.age + '，' + liveness;
              ctx.fillStyle = "#FF0000";
              ctx.font = "20px Georgia";
              ctx.fillText(txt, x, y - 10);
              console.info("detectSuccess")

            });
          }
          state.imageSrc = canvas.toDataURL("image/jpeg");

        });
  }
}
</script>

<style scoped>

.class_face_detect .class_title {
  font-size: 25px;
  margin-top: 20px;
  margin-left: 20px;
  width: 800px;
  text-align: center;
}

.class_face_detect .class_image__lazy {

  width: 800px;
  height: 500px;
  margin-left: 20px;
  border: 1px solid black;
}

.class_face_detect .image__lazy {
  width: 800px;
  height: 500px;
}

.class_face_detect .class_select {
  margin-left: 20px;
  width: 800px;
  text-align: center;
}

</style>