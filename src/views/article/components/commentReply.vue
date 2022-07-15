<template>
  <div class="comment-reply">
    <van-nav-bar title="回复" @click-left="$emit('close')">
      <template #left>
        <van-icon color="white" name="cross"></van-icon>
      </template>
    </van-nav-bar>
    <commentItem :comment="currentComment"></commentItem>
    <van-cell :border="false" title="评论回复"></van-cell>
    <commentList
      type="c"
      :list="list"
      :source="currentComment.com_id"
    ></commentList>
    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      评论回复评论回复
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>
<script>
import commentList from '@/views/article/components/commentList.vue'
import commentItem from '@/views/article/components/commentItem.vue'
export default {
  name: 'commentReply',
  components: {
    commentItem,
    commentList
  },
  props: {
    currentComment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      isPostShow: false // 弹框是否显示
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less">
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
