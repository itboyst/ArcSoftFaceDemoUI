<template>


  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">照片1</span>
      <el-image :src="state.imageSrc1" fit="contain" class="compare_class_image__lazy">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
      <div class="compare_class_select">
        <span style="margin-right: 10px">选择下拉照片</span>
        <el-select v-model="state.selectValue1" @change="selectChange(1)" placeholder="Select">
          <el-option
              v-for="item in state.imageOption1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>

      <div class="compare_class_select" style="margin-top: 20px">

        <el-upload
            class="upload-demo"
            :before-upload="beforeUpload1"
            accept="image/png, image/jpeg"
        >
          <el-button type="primary">上传本地照片检测</el-button>
        </el-upload>

      </div>
    </div>
    <div class="block">
      <span class="demonstration">照片2</span>
      <el-image :src="state.imageSrc2" fit="contain" class="compare_class_image__lazy">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
      <div class="compare_class_select">
        <span style="margin-right: 10px">选择下拉照片</span>
        <el-select v-model="state.selectValue2" @change="selectChange(2)" placeholder="Select">
          <el-option
              v-for="item in state.imageOption2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>

      <div class="compare_class_select" style="margin-top: 20px">
        <el-upload
            class="upload-demo"
            :before-upload="beforeUpload2"
            accept="image/png, image/jpeg"
        >
          <el-button type="primary">上传本地照片检测</el-button>
        </el-upload>

      </div>
    </div>
  </div>
  <div style="width: 100%;text-align: center;margin-top: 20px;margin-bottom: 20px;font-size: 20px">

    <span>人脸相似度为: {{ state.similar }}</span>

  </div>

</template>

<script lang="ts" setup>
import {onMounted, toRefs, reactive, ref} from 'vue'
import axios from '@/utils/axios'


const state = reactive({
  similar: '0',
  imageSrc1: 'images/Image1-1.jpg',
  imageSrc2: 'images/Image1-2.jpg',
  selectValue1: 'Image1-1.jpg',
  selectValue2: 'Image1-2.jpg',
  imageOption1: [{
    value: 'images/Image1-1.jpg',
    label: 'Image1-1.jpg'
  },
    {
      value: 'images/Image2-1.jpg',
      label: 'Image2-1.jpg'
    },
    {
      value: 'images/Image3-1.jpg',
      label: 'Image3-1.jpg'
    }],
  imageOption2: [{
    value: 'images/Image1-2.jpg',
    label: 'Image1-2.jpg'
  },
    {
      value: 'images/Image2-2.jpg',
      label: 'Image2-2.jpg'
    },
    {
      value: 'images/Image3-2.jpg',
      label: 'Image3-2.jpg',
    },]
})

onMounted(() => {
  responseDrawImage()
})

const selectChange = (value: number) => {
  if (value === 1) {
    state.imageSrc1 = state.selectValue1
  } else if (value === 2) {
    state.imageSrc2 = state.selectValue2
  }
  responseDrawImage()
}

const beforeUpload1 = (file: Blob) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);//读取图像文件 result 为 DataURL, DataURL 可直接 赋值给 img.src
  reader.onload = function (event: any) {
    state.imageSrc1 = event.target.result
    responseDrawImage()
  }
}
const beforeUpload2 = (file: Blob) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);//读取图像文件 result 为 DataURL, DataURL 可直接 赋值给 img.src
  reader.onload = function (event: any) {
    state.imageSrc2 = event.target.result
    responseDrawImage()
  }
}

const responseDrawImage = () => {

  let image1 = new Image();
  image1.src = state.imageSrc1;
  image1.onload = function () {
    let canvas1 = document.createElement('canvas');
    canvas1.width = image1.width;
    canvas1.height = image1.height;
    let ctx1: any = canvas1.getContext("2d");
    ctx1.drawImage(image1, 0, 0, image1.width, image1.height)


    let image2 = new Image();
    image2.src = state.imageSrc2;
    image2.onload = function () {
      let canvas2 = document.createElement('canvas');
      canvas2.width = image2.width;
      canvas2.height = image2.height;
      let ctx2: any = canvas2.getContext("2d");
      ctx2.drawImage(image2, 0, 0, image2.width, image2.height)


      axios.post("/compareFaces",
          {
            image1: canvas1.toDataURL("image/jpeg"),
            image2: canvas2.toDataURL("image/jpeg")
          }
      ).then((response: any) => {
        console.info(response)
        if (response.code === 0) {
          state.similar = response.data
        } else {
          state.similar = response.msg
        }
      });
    }
  }

}
</script>

<style scoped>
.demo-image__placeholder .compare_class_image__lazy {

  width: 100%;
  height: 300px;
  /*margin-left: 20px;*/
  border: 1px solid black;
}

.demo-image__placeholder .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;

  /*border: 1px solid black;*/
}

.demo-image__placeholder .demonstration {
  display: block;
  font-size: 18px;
  margin-bottom: 20px;
}

.demo-image__placeholder .el-image {
  padding: 0 5px;
  max-width: 500px;
  max-height: 500px;
}

.demo-image__placeholder.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.demo-image__placeholder .dot {
  animation: dot 2s infinite steps(3, start);
  overflow: hidden;
}

.compare_class_select {
  margin-top: 20px;
  /*width: 800px;*/
  /*text-align: center;*/
}

</style>