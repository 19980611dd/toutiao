<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    v-if="!is_followed"
    size="small"
    icon="plus"
    :loading="isFollowLoading"
    @click="follow"
    >关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    round
    :loading="isFollowLoading"
    size="small"
    @click="follow"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'follow-user',
  data() {
    return {
      isFollowLoading: false
    }
  },
  model: {
    prop: 'is_followed', // 定义属性名
    event: 'update-follow' // 定义事件名
  },
  props: {
    is_followed: {
      type: [Boolean]
    },
    user_id: {
      type: [Number, String, Object],
      required: true
    }
  },

  created() {},

  methods: {
    // 关注用户
    async follow() {
      this.isFollowLoading = true
      try {
        if (this.is_followed) {
          await addFollow(this.user_id)
        } else {
          await deleteFollow(this.user_id)
        }
        this.$emit('update-follow', !this.is_followed)
        this.$notify({
          type: 'success',
          message: this.is_followed ? '关注成功' : '取消关注'
        })
        this.isFollowLoading = false
      } catch (error) {
        console.log(error)
        this.isFollowLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
