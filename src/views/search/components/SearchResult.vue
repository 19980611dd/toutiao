<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    seachText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const res = await getSearch({
        page: this.page,
        per_page: this.per_page,
        q: this.seachText
      })
      console.log(res)
      this.list = [...this.list, ...res.data.data.results]
      this.loading = false
      if (res.data.data.results) {
        this.page++
      } else {
        this.finished = true
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  }
}
</script>

<style scoped lang="less"></style>
