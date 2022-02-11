<template>
  <div><h1>login</h1></div>
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  <el-button>中文</el-button>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { test } from '@/api/test'

export default defineComponent({
  setup() {
    onMounted(async () => {
      let a = await test()
      console.log(a)
    })
    return {}
  }
})
</script>

<style scoped></style>
