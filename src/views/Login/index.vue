<template>
  <div class="login-container">
    <van-nav-bar title="登录">
      <template #left>
        <van-icon
          name="cross"
          @click="$router.back()"
          class="iconX"
        /> </template
      >` `
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        :maxlength="6"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma" />
        </template>
        <template #button>
          <van-count-down
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
            :time="6000"
            format="ss s"
          />
          <van-button
            v-else
            @click="getSmsCode"
            native-type="button"
            class="send-sms-btn"
            :loading="isDisabled"
            size="small"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, getSmsCodes } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111112',
        code: '246810'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不对'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不对'
          }
        ]
      },
      isShowCountDown: false,
      isDisabled: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 登录方法
    async onSubmit() {
      try {
        const res = await login(this.user)
        this.$store.commit('setUser', res.data.data)
        console.log(res)
        Toast.success('登录成功')
        // 登陆成功后跳转至首页
        this.$router.push({
          path: '/'
        })
      } catch (e) {
        Toast.fail(e?.response?.data?.message || '服务器端错误')
      }
    },
    // 获取验证码的方法
    async getSmsCode() {
      // 校验mobile表单
      try {
        await this.$refs.form.validate('mobile')
      } catch (e) {
        console.log(e)
        return
      }
      // 2：校验已通过
      // 捕获手机号格式不对的错误
      try {
        // 校验已通过之后启动禁用
        this.isDisabled = true
        // 是否展示倒计时
        await getSmsCodes(this.user.mobile)
        this.isShowCountDown = true
        this.$toast.success('发送验证码成功')
      } catch (e) {
        this.$toast.fail(e.response.data.message || '出错了')
        // 验证码发送失败，就不展示按钮
        this.isShowCountDown = false
      } finally {
        // 拿到结果后，把禁用停了
        this.isDisabled = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.send-sms-btn {
  border: 3px solid #c0cfc3;
  background-color: #ededed;
}
// 输入框按钮样式
.login-container {
  /deep/.toutiao {
    font-size: 37px;
  }
  /deep/.iconX {
    color: white;
  }
}
</style>
