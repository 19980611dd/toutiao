<template>
  <div>
    <h1>demo</h1>
    <hr />
    <h4>{{ $store.state.count }}</h4>
    <h4>{{ $store.state.userinfo.name }}</h4>
    <van-field type="number" v-model.number="num">0</van-field>
    <br />
    <button @click="changeCount">点击count+1</button>
    <button @click="changeCount2">点击添加指定的值</button>
    <button @click="changeName">点击修改名字</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      num: '0'
    }
  },
  computed: {
    ...mapState(['count', 'userinfo'])
  },
  mounted() {
    console.log(this.userinfo)
    console.log(this.count)
  },
  methods: {
    changeCount() {
      this.$store.commit('changeCount')
    },
    changeName() {
      this.$store.commit('changeName')
    },
    changeCount2() {
      this.$store.commit('changeCount2', this.num)
    }
  }
}
</script>

<style></style>
