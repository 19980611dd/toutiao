<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="编辑频道"> </van-cell>
    <van-cell title="我的频道">
      <template #default>
        <van-button
          class="edit-btn"
          plain
          round
          size="mini"
          type="danger"
          @click="isEdit = !isEdit"
          >{{ isEdit ? '完成' : '编辑' }}</van-button
        >
      </template>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in userHeaderInfo"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道"> </van-cell>
    <van-grid class="recommed-channel" direction="horizontal" :gutter="10">
      <van-grid-item
        v-for="value in recommendChannels"
        :key="value.id"
        icon="plus"
        class="channel-item"
        @click="addChannel(value)"
      >
        <template #text>
          <span class="text">{{ value.name }}</span>
        </template></van-grid-item
      >
    </van-grid>
  </div>
</template>

<script>
import { fetchAllCitys, fetchAllCity, deleteUserChannel } from '@/api/channel'
import { differenceBy } from '@/utils/lodash'
import { Notify } from 'vant'
// import { mapState } from 'vuex'
import USERCHANNEL from '@/utils/constants'
import { setLocal } from '@/utils/storage'
export default {
  name: 'channeledit',
  props: {
    userHeaderInfo: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  created() {
    this.fetchAllCity()
  },
  computed: {
    recommendChannels() {
      return differenceBy(this.allChannels, this.userHeaderInfo, 'id')
      // return this.allChannels.filter((item) => {
      //   return !this.userHeaderInfo.some((userItem) => {
      //     userItem.id === item.id;
      //   });
      // });
    },
    // ...mapState(['user'])
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async fetchAllCity() {
      const res = await fetchAllCitys()
      this.allChannels = res.data.data.channels
      console.log(res)
    },
    async addChannel(channel) {
      this.userHeaderInfo.push(channel)
      // 持久化
      // 本地存储 线上服务器 判断是否登录
      if (this.user) {
        try {
          await fetchAllCity({
            id: channel.id,
            sep: this.userHeaderInfo.length
          })
          this.$toast('添加成功')
        } catch (e) {
          this.$toast('保存失败')
        }
        // this.$toast(message:'添加频道成功')
      } else {
        setLocal(USERCHANNEL, this.userHeaderInfo)
      }
    },
    onMyChannelClick(channel, index) {
      console.log(channel, index)
      if (this.isEdit) {
        // 处于编辑状态
        if (index === 0) {
          return Notify({ type: 'warning', message: '不可以删除此项' })
        }
        if (index <= this.active) {
          this.$emit('changeAcitve', this.active - 1, true)
          this.userHeaderInfo.splice(index, 1)
          // 删除数据持久化
          this.deleteUserChannel(channel)
        }
        this.userHeaderInfo.splice(index, 1)
      } else {
        // 完成状态
        this.$emit('changeAcitve', index, false)
      }
    },
    async deleteUserChannel(channel) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录，将数据存储到本地
          setLocal('USERCHANNEL', this.userHeaderInfo)
        }
        this.$toast('删除频道成功')
      } catch (e) {
        this.$toast('删除频道失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  .edit-btn {
    width: 100px;
  }
  .channel-item .text {
    font-size: 24px;
    color: #222;
    margin-top: 0;
  }
  /deep/.channel-item .van-grid-item__content {
    background-color: #f4f5f6;
  }
  /deep/.recommed-channel {
    .van-icon-plus {
      color: #222;
      font-size: 30px;
      margin-right: 5px;
    }
  }
  .channel-item {
    /deep/.van-icon-clear {
      font-size: 14px;
      position: absolute;
      right: -10px;
      top: -10px;
      // opacity: 0.3;
      color: #cacaca;
    }
    .active {
      color: red;
    }
    /deep/.van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}
</style>
