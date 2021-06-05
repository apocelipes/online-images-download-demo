<template>
  <el-container style="border: 2px solid black; margin: 0px auto; width: 700px;">
    <el-aside width="190px" class="aside">
      <el-skeleton :loading="!images.length" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 170px; height: 240px;" />
        </template>
        <template #default>
          <img :src="images[0]" alt="show a image" width="170" height="240">
        </template>
      </el-skeleton>
      
      <div>
        <el-button type="danger" :disabled="!images.length" @click="fetchImages" class="button">change</el-button>
        <br/>
        <el-button type="primary" :disabled="!images.length" class="button">download</el-button>
      </div>
    </el-aside>

    <el-container>
      <el-header class="header">
        <p>随机壁纸</p>
      </el-header>
      <el-main class="main">
        <p>powered by vue3, element-plus and unsplash</p>
      </el-main>
    </el-container>
  </el-container>

  <div class="img-container">
    <div v-for="(url, index) of images" :key="index">
      <img class="img-item" :src="url" loading="lazy" width="96.5" height="136.5"/>
    </div>
    <div style="display: inline-block;width: 96.5px;height: 136.5px;" class="img-item" v-if="imageSize != images.length">
      <el-skeleton animated style="display: inline-block;padding: 0">
        <template #template>
          <el-skeleton-item variant="img" style="width:96.5px;height:136.5px;"></el-skeleton-item>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import {random} from 'lodash'

function sleep(duration: number) {
  return new Promise((resolve, reject) => {
    if (duration <= 0) {
      reject(`sleep duration less than 0: ${duration}`)
    } else {
      setTimeout(()=>{resolve(duration)}, duration)
    }
  })
}

const wallpaperUrl = 'https://source.unsplash.com/random/?nature,city,space,plant'

export default defineComponent({
  name: 'Main',
  setup() {
    const images = reactive<string[]>([])
    const imageSize = ref(0)
    async function fetchImages() {
      imageSize.value = random(10, 25)
      images.splice(0, images.length)
      for (let i = 0; i < imageSize.value; i++) {
        const resp = await axios.get(wallpaperUrl)
        images.push(resp.request.responseURL)
        console.log(images.length)
        await sleep(random(450, 800))
      }
    }
    onMounted(fetchImages)
    return {
      images,
      imageSize,
      fetchImages
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  background-color: aqua;
  display: flex;
  align-items: center;
  text-align: center;
}

.main {
  display: flex;
  align-items: center;
  text-align: center;
  color: #999999;
}

.aside {
  /*background-color: chartreuse;*/
  padding: 10px;
}

.button {
  display: inline-block;
  margin-top: 5px;
  margin-left: 0;
  margin-right: 0;
  width: 170px;
}

.img-container {
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  padding: 20px;
  margin: 20px auto;
  background-color: #eeeeee;
  border: 1px solid #999999;
}

.img-item {
  border: 1px solid;
  margin: 5px;
}
</style>
