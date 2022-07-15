<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="出错了，点击重试"
    >
      <commentItem
        v-for="item in list"
        :key="item.comm_id"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      ></commentItem>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import commentItem from '@/views/article/components/commentItem.vue'
import { getComments } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    source: {
      type: [String, Number],
      required: true
    },
    list: {
      type: Array
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  components: {
    commentItem
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false,
      limit: 10,
      offset: null,
      error: false // 是否加载结束
    }
  },
  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        this.list.push(...res.data.data.results)
        this.loading = false
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true
        } else {
          this.offset = res.data.data.last_id
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>
