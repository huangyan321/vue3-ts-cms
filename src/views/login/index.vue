<template>
  <div class="login">
    <div class="login-box">
      <h2></h2>
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="用户名"><Account ref="accountRef" /></el-tab-pane>
        <el-tab-pane label="手机"><Phone ref="phoneRef" /></el-tab-pane>
      </el-tabs>
      <div class="login-bottom">
        <el-checkbox v-model="rememberPassword" label="记住密码" size="large" />
        <el-link type="primary" @click="reset">重置</el-link>
      </div>
      <el-button class="login-button" type="primary" @click="doLogin">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, toRef } from 'vue'
import { useStore } from 'vuex'
import Account from './account.vue'
import Phone from './phone.vue'
import { getCache, setCache, deleteCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    Account,
    Phone
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    let rememberPassword = ref(false)
    const accountRef = ref<InstanceType<typeof Account>>()
    const phoneRef = ref<InstanceType<typeof Phone>>()
    const reset = () => {
      if (!accountRef.value?.accountFormRef) return
      accountRef.value.accountFormRef.resetFields()
    }
    onMounted(() => {
      const cacheAccount = getCache('account')
      if (cacheAccount) {
        rememberPassword.value = true
      }
    })
    const doLogin = () => {
      if (!accountRef.value?.accountFormRef) return
      accountRef.value.accountFormRef.validate((valid, fields) => {
        if (!valid) return console.log('error login!', fields)
        if (accountRef.value?.accountForm) {
          const { username, password } = accountRef.value?.accountForm
          //登录逻辑
          store.dispatch('login/accountLoginAction', { username, password }).then((res) => {
            router.push('/main')
          })
          //判断是否记住密码
          if (rememberPassword.value) {
            setCache('account', { username, password })
          } else {
            deleteCache('account')
          }
        }
      })
    }
    return {
      rememberPassword,
      reset,
      doLogin,
      accountRef,
      phoneRef
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-box {
    width: 400px;
    text-align: center;
  }
  &-bottom {
    display: flex;
    justify-content: space-between;
  }
  &-button {
    width: 100%;
  }
}
</style>
