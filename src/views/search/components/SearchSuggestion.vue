<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item"
      icon="search"
      @click="handleClick(item)"
    >
      <template #title> <div v-html="highLight(item)"></div></template
    ></van-cell>
  </div>
</template>
<script>
import { debounce } from 'lodash'
import { getSearchSuggestion } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    seachText: String
  },
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {
    seachText: {
      immediate: true,
      handler: debounce(function (value) {
        this.getSearchSuggestion(value)
      }, 500)
    }
  },
  created() {
    console.log()
  },
  mounted() {},
  methods: {
    async getSearchSuggestion(q) {
      const res = await getSearchSuggestion(q)
      this.list = res.data.data.options
      // this.list = res.data.data.options.map((item) => {
      //   const reg = new RegExp(this.seachText, 'gi')
      //   return item.replace(
      //     reg,
      //     `<span style="color:red">${this.seachText}</span>`
      //   )
      // })
      console.log(res)
    },
    handleClick(value) {
      this.$emit('onSearch', value)
    },
    highLight(item) {
      const reg = new RegExp(this.seachText, 'gi')
      return item.replace(
        reg,
        `<span style="color:red">${this.seachText}</span>`
      )
    }
  }
}
</script>
<style scoped lang="less"></style>
