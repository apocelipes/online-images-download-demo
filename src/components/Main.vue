<template>
  <el-container style="border: 2px solid black; margin: 0px auto; width: 700px;padding: 15px;">
    <el-aside width="190px">
      <el-skeleton :loading="!images.length" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 170px; height: 240px;" />
        </template>
        <template #default>
          <img :src="images[0]" alt="show a image" width="170" height="240">
        </template>
      </el-skeleton>
      
      <div>
        <el-button type="danger"
                   :disabled="!fetchFinished || beginDownloading"
                   @click="fetchImages"
                   class="button">
          change
        </el-button>
        <br/>
        <el-button v-if="!beginDownloading"
                   type="primary"
                   :disabled="!fetchFinished"
                   class="button"
                   @click="handleDownload">
          download
        </el-button>
        <el-progress v-else
                     :stroke-width="35"
                     :show-text="false"
                     :percentage="downloadPercentage"
                     :indeterminate="inPreparing"
                     class="button">
        </el-progress>
      </div>
    </el-aside>

    <el-container>
      <el-header class="header">
        <p>随机壁纸</p>
      </el-header>
      <el-main class="main">
        <p>
			<!--since Chrome/Edge 88, Firefox 79 and Safari 12.1, target="_blank" default implicitly provides the same rel behavior as setting rel="noopener"-->
			powered by <a href="https://v3.cn.vuejs.org/" style="color: #41b883" target="_blank" rel="noopener">vue3</a>,
			<a href="https://element-plus.org/" style="color: #409eff" target="_blank" rel="noopener">element-plus</a> and
			<a href="https://unsplash.com/" style="color: black" target="_blank" rel="noopener">unsplash</a>
		</p>
      </el-main>
    </el-container>
  </el-container>

  <div class="img-container">
    <div v-for="(url, index) of images" :key="index">
      <img class="img-item" :src="url" loading="lazy" width="96.5" height="136.5"/>
    </div>
    <div class="img-item img-skeleton" v-if="!fetchFinished">
      <el-skeleton animated style="display: inline-block;padding: 0">
        <template #template>
          <el-skeleton-item variant="img" style="width:96.5px;height:136.5px;"></el-skeleton-item>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import useFetchImages from '@/composables/useFetchImages'
import useDownload from '@/composables/useDownload'

export default defineComponent({
  name: 'Main',
  setup() {
    const wallpaperUrl = 'https://source.unsplash.com/random/?nature,city,space,plant'
    const { images, imageSize, fetchFinished, fetchImages } = useFetchImages(wallpaperUrl)
    onMounted(fetchImages)

    const { beginDownloading, inPreparing, downloadPercentage, handleDownload } = useDownload(images)

    return {
      images,
      imageSize,
      fetchFinished,
      fetchImages,
      beginDownloading,
      downloadPercentage,
      inPreparing,
      handleDownload
    }
  }
});
</script>

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

.img-skeleton {
  display: inline-block;
  width: 96.5px;
  height: 136.5px;
}

a {
  text-decoration: none;
  font-size: 36px;
}
</style>
