<template>
  <div>
    <van-button class="btn" @click="changeCollected">
      <template #icon>
        <van-icon
          :color="isCollected ? 'red' : ''"
          :name="isCollected ? 'star' : 'star-o'"
          :loading="loading"
        ></van-icon>
      </template>
    </van-button>
  </div>
</template>
<script>
import { addCollect, deleteCollect } from '@/api/article.js'
export default {
  name: 'collectArticle',
  components: {},
  model: {
    prop: 'isCollected',
    event: 'changeCollected'
  },
  props: {
    isCollected: {
      type: Boolean
      // required: true
    },
    artId: {
      type: [String, Number]
    }
  },
  methods: {
    async changeCollected() {
      this.loading = true
      try {
        if (this.isCollected) {
          await deleteCollect(this.artId)
        } else {
          await addCollect(this.artId)
        }
        this.$emit('changeCollected', !this.isCollected)
        this.$toast(this.isCollected ? '取消收藏' : '收藏成功')
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    }
  },
  data() {
    return { loading: false }
  }
}
</script>
<style scoped lang="less">
.btn {
  border: none;
}
</style>
