<template>
  <div class="login">
    <el-form
      label-position="right"
      ref="accountFormRef"
      label-width="70px"
      :model="accountForm"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="accountForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="accountForm.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { ElForm } from 'element-plus'
import { rules } from './config/rules'
import { getCache, setCache, deleteCache } from '@/utils/cache'
export default defineComponent({
  setup() {
    let accountForm = ref({
      username: '',
      password: ''
    })
    const accountFormRef = ref<InstanceType<typeof ElForm>>()
    onMounted(() => {
      const cacheAccount = getCache('account')
      if (cacheAccount) {
        accountForm.value = cacheAccount
      }
    })
    return {
      accountForm,
      rules,
      accountFormRef
    }
  }
})
</script>

<style lang="scss" scoped></style>
