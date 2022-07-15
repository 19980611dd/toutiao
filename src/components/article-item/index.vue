<template>
  <div class="article-item">
    <van-cell :title="article.title" :to="`/article/${article.art_id}`">
      <template #default v-if="article.cover.type === 1">
        <van-image class="img" :src="article.cover.images[0]"></van-image>
      </template>
      <template #label>
        <div class="img-container" v-if="article.cover.type === 3">
          <van-image
            class="img-three"
            v-for="(item, index) in article.cover.images"
            :key="index"
            :src="item"
          ></van-image>
        </div>
        <div class="label-container">
          <span>{{ article.aut_name }} </span>
          <span>评论{{ article.comm_count }}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.img {
  width: 200px;
  height: 200px;
}
.img-container {
  display: flex;
  justify-content: space-around;
}
.img-three {
  width: 200px;
  height: 200px;
}
.label-container span {
  margin-right: 20px;
}
</style>
