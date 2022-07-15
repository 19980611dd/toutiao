<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    type: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        duration: 0,
        // 持续时间，默认 2000，0 表示持续展示不关闭
        forbidClick: true
        // 禁用背景点击
      })
      try {
        const res = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.type === 'c' ? this.articleId : null
        })
        // 关闭弹层
        this.$toast.success('发布评论成功')
        this.$emit('post-success', res.data.data.new_obj)
        this.message = ''
        console.log(res)
      } catch (error) {
        this.$toast.success('发布评论失败')
        console.log(error)
      }
    }
  },
  inject: ['articleId']
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
