<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeleteStatus">
          <van-tag class="btn" type="danger" @click="deleteAll"
            >全部删除</van-tag
          >
          <van-tag class="btn" type="success" @click="isDeleteStatus = false"
            >完成</van-tag
          >
        </template>
        <van-icon
          v-else
          name="delete"
          @click="isDeleteStatus = true"
        ></van-icon>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in SearchHistory"
      :key="index"
      :title="item"
      @click="clickHistoryItem"
    >
      <template #default v-if="isDeleteStatus">
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell>
    <!-- <van-cell title="我是历史记录">
      <template #default>
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell> -->
  </div>
</template>
<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    SearchHistory: {
      type: Array
    }
  },
  data() {
    return {
      isDeleteStatus: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    deleteAll() {
      this.$emit('deleteAll')
    },
    clickHistoryItem(item, index) {
      if (this.isDeleteStatus) {
        this.SearchHistory.splice(index, 1)
      } else {
        this.$emit('onSearch', item)
      }
    }
  }
}
</script>
<style scoped lang="less">
.van-tag {
  margin-right: 5px;
}
</style>
