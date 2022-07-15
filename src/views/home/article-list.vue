<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="出错了，请重新加载"
        ><ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { fetchArticle } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      successText: '',
      refreshLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const res = await fetchArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        console.log(res)
        this.list = [...this.list, ...res.data.data.results]
        this.loading = false
        if (res.data.data.results === 0) {
          this.finished = true
        } else {
          this.timestamp = res.data.data.pre_timestamp
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    },
    async onRefresh() {
      try {
        // 清空列表数据
        const res = await fetchArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        console.log(res)
        this.list = [...res.data.data.results, ...this.list]
        this.refreshLoading = false
        this.successText = '刷新成功,更新了10条数据'
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        // this.onLoad()
      } catch (error) {
        // this.loading = false
        this.refreshLoading = false
        this.$toast('刷新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/.artcile-list {
  height: 79vh;
  overflow: auto;
}
</style>
