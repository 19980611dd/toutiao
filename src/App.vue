<template>
  <div id="app">
    <!-- 使用封装好的icon组件 -->
    <!-- <ToutiaoIcon icon="wode"></ToutiaoIcon> -->
    <!-- <ToutiaoIcon icon="dianzan"></ToutiaoIcon> -->
    <!-- 使用van组件 -->
    <!-- <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button> -->
    <!-- <van-button type="danger">危险按钮</van-button> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less"></style>
