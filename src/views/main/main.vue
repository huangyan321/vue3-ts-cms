<template>
  <el-container>
    <el-aside class="sidebar-container">Aside</el-aside>
    <el-container class="main-container">
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
