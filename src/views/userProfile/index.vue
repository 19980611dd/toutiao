<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <input @change="fileChange" ref="input" type="file" hidden />
    <van-cell
      @click="clickInput"
      class="avatar-cell"
      title="头像"
      is-link
      center
    >
      <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <updateName
        @close="isUpdateNameShow = false"
        v-model="userInfo.name"
      ></updateName>
    </van-popup>
    <!-- /编辑昵称 -->
    <van-cell
      title="性别"
      :value="userInfo.gender === 1 ? '女' : '男'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <updateGender
        v-model="userInfo.gender"
        @close="isUpdateGenderShow = false"
      ></updateGender>
    </van-popup>
    <!-- 修改生日 -->
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <updateBirthday
        @close="isUpdateBirthdayShow = false"
        v-model="userInfo.birthday"
      ></updateBirthday>
    </van-popup>
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <updatePhoto
        :img="img"
        @close="isUpdatePhotoShow = false"
        v-model="userInfo.photo"
      ></updatePhoto
    ></van-popup>
    <!-- /个人信息 -->
  </div>
</template>
<script>
import updatePhoto from '@/views/userProfile/components/updatePhoto.vue'
import updateBirthday from '@/views/userProfile/components/updateBirthday.vue'
import updateGender from '@/views/userProfile/components/updateGender.vue'
import updateName from '@/views/userProfile/components/updateName.vue'
import { getUserProfile } from '@/api/user'
export default {
  name: 'userProfile',
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updatePhoto
  },
  props: {},
  data() {
    return {
      userInfo: {},
      isUpdateNameShow: false,
      message: this.value,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserInfo()
  },
  mounted() {},
  methods: {
    async getUserInfo() {
      const res = await getUserProfile()
      console.log(res)
      this.userInfo = res.data.data
    },
    clickInput() {
      this.$refs.input.click()
    },
    fileChange(e) {
      const file = e.target.files[0]
      console.log(file)
      const url = URL.createObjectURL(file)
      console.log(url)
      this.isUpdatePhotoShow = true
      this.img = url
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
