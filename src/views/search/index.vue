<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="seachText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>
    <!-- 搜索结果页面 组件-->
    <SearchResult v-if="isShowResult" :seachText="seachText"></SearchResult>
    <!-- 搜索建议列表 组件-->
    <SearchSuggestion
      v-else-if="seachText"
      :seachText="seachText"
      @onSearch="onSearch"
    ></SearchSuggestion>
    <SearchHistory
      v-else
      :SearchHistory="SearchHistory"
      @deleteAll="deleteAll"
      @onSearch="onSearch"
    ></SearchHistory>
    <!-- 搜索历史界面组件 -->
  </div>
</template>
<script>
import SearchResult from '@/views/search/components/SearchResult'
import SearchSuggestion from '@/views/search/components/SearchSuggestion'
import SearchHistory from '@/views/search/components/SearchHistory'
import { HISTORY } from '@/utils/constants'
import { getLocal, setLocal } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      seachText: '',
      isShowResult: false,
      SearchHistory: getLocal(HISTORY) || []
    }
  },
  computed: {},
  watch: {
    SearchHistory(value) {
      setLocal(HISTORY, value)
    }
  },
  created() {},
  methods: {
    onSearch(value) {
      console.log('搜索')
      this.seachText = value
      this.isShowResult = true
      const index = this.SearchHistory.indexOf(value)
      if (index !== -1) {
        this.SearchHistory.splice(index, 1)
      }
      this.SearchHistory.unshift(value)
    },
    onCancel() {
      console.log('取消')
      this.$router.back()
    },
    deleteAll() {
      this.SearchHistory = []
    }
  }
}
</script>

<style scoped></style>
