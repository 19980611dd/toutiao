<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="修改性别"
      :columns="columns"
      @change="onPickerChange"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      try {
        const localGender = this.localGender

        await updateUserProfile({
          gender: localGender
        })

        // 更新视图
        this.$emit('input', localGender)

        // 关闭弹层
        this.$emit('close')

        // 提示成功
        this.$toast.success('修改性别成功')
        console.log(localGender)
      } catch (error) {
        console.log(error)
      }
    },
    onPickerChange(picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style></style>
