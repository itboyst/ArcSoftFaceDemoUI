<template>
  <div class="class_face_recognition">
    <el-container>
      <el-header>
        <div class="class_title">人脸识别示例</div>
      </el-header>

      <el-main>
        <div class="class_image__lazy">
          <el-image class="image__lazy" fit="contain" :src="imageSrc">
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
          <el-select v-model="selectValue" @change="selectChange" placeholder="Select">
            <el-option
                v-for="item in imageOption"
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
          >
            <el-button type="primary">上传本地照片检测</el-button>
          </el-upload>

        </div>

      </el-footer>


    </el-container>
  </div>
</template>

<script>
import {onMounted, toRefs, reactive} from 'vue'
import axios from '@/utils/axios'

export default {
  name: 'FaceRecognition',
  setup() {
    const state = reactive({
      selectValue: 'images/zhaoyang.jpg',
      imageSrc: '',
      imageOption: [{
        value: 'images/zhaoyang.jpg',
        label: '赵丽颖&杨紫',
      }]
    })

    onMounted(() => {
      responseDrawImage(state.selectValue)
    })

    const selectChange = (value) => {
      responseDrawImage(value)
    }

    const beforeUpload = (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);//读取图像文件 result 为 DataURL, DataURL 可直接 赋值给 img.src
      reader.onload = function (event) {
        responseDrawImage(event.target.result)
      }
    }

    const responseDrawImage = (src) => {

      let image = new Image();
      image.src = src;
      image.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height)
        axios.post("/faceRecognition", {image: canvas.toDataURL("image/jpeg")})
            .then(response => {
              if (response.code === 0 && response.data.length > 0) {
                response.data.forEach(r => {
                  let rect = r.rect;
                  let x = rect.left;
                  let y = rect.top;
                  let w = rect.right - rect.left;
                  let h = rect.bottom - rect.top;
                  ctx.strokeStyle = "#FF0000";
                  ctx.lineWidth = 5;
                  ctx.strokeRect(x, y, w, h);
                  ctx.fillStyle = "#FF0000";
                  ctx.font = "30px Georgia";
                  ctx.fillText(r.name == undefined ? '未知' : r.name, x, y - 10);

                });
              }
              state.imageSrc = canvas.toDataURL("image/jpeg");

            });
      }
    }

    return {
      ...toRefs(state),
      beforeUpload,
      selectChange

    }
  }
}
</script>

<style scoped>

.class_face_recognition .class_title {
  font-size: 25px;
  margin-top: 20px;
  margin-left: 20px;
  width: 800px;
  text-align: center;
}

.class_face_recognition .class_image__lazy {

  width: 800px;
  height: 500px;
  margin-left: 20px;
  border: 1px solid black;
}

.class_face_recognition .image__lazy {
  width: 800px;
  height: 500px;
}

.class_face_recognition .class_select {
  margin-left: 20px;
  width: 800px;
  text-align: center;
}

</style>