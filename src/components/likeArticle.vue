<template>
  <van-icon
    @click="onLike"
    :color="value === 1 ? 'red' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
  />
</template>
<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  data() {
    return {}
  },
  model: {
    // prop: 'isLiked',
    event: 'likeArticle'
  },
  props: {
    value: {
      type: Number
      // required: true
    },
    artId: {
      type: [String, Number]
    }
  },

  created() {},

  methods: {
    async onLike() {
      try {
        if (this.value === 1) {
          await deleteLike(this.artId)
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.artId)
          this.$toast.success('点赞成功')
        }
        this.$emit('likeArticle', this.value === 1 ? -1 : 1)
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
