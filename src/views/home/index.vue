<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #title>
        <van-button
          icon="search"
          block
          class="search-btn"
          size="small"
          type="info"
          round
          to="/search"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tab标签页 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab v-for="item in userHeaderInfo" :key="item.id" :title="item.name">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn">
          <i class="toutiao toutiao-gengduo" @click="showPopup = true"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 弹层结构 -->
    <van-popup
      close-icon-position="top-left"
      closeable
      style="height: 90%"
      position="bottom"
      v-model="showPopup"
    >
      <channeledit
        :userHeaderInfo="userHeaderInfo"
        :active="active"
        @changeAcitve="changeAcitve"
      ></channeledit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './article-list.vue'
import channeledit from '@/views/home/components/channeledit'
import { getLocal } from '@/utils/storage'
import USERCHANNEL from '@/utils/constants'
export default {
  name: 'HomePage',
  components: {
    ArticleList: ArticleList,
    channeledit: channeledit
  },
  props: {},
  data() {
    return {
      active: 0,
      userHeaderInfo: [],
      showPopup: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserChannels()
  },
  mounted() {},
  methods: {
    // 获取头部文章标题
    async getUserChannels() {
      const res = await getUserChannels()
      console.log(res)
      this.userHeaderInfo = res.data.data.channels
    },
    changeAcitve(index, state) {
      this.active = index
      this.showPopup = state
    },
    // 获取用户数据
    async handleGetUserChannel() {
      try {
        const token = this.$store.state.user?.token
        let channels = getLocal(USERCHANNEL)
        if (token || !channels) {
          const res = await getUserChannels()
          channels = res.data.data.channels
        }
        this.userHeaderInfo = channels
      } catch (error) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    width: 80%;
    max-width: unset;
  }
  // 图标颜色
  .van-nav-bar .van-icon {
    color: #fff;
  }
  .search-btn {
    background-color: #5babfb;
  }
  /deep/ .channel-tabs {
    padding-top: 160px;
    padding-bottom: 100px;
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
  }
}
</style>
