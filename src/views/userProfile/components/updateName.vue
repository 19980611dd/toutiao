<template>
  <div class="uodate-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
    <!-- 导航栏 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="4"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      ></van-field>
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
// import { Toast } from 'vant'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: this.value
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      try {
        const res = await updateUserProfile({
          name: this.message
        })
        this.$emit('close')
        this.$emit('input', this.message)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
