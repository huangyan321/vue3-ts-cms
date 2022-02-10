<template>
  <div id="nav">
    <h1>{{ $store.state.name }}</h1>
  </div>
  <router-link to="/login">登录</router-link>
  <router-link to="/main">首页</router-link>
  <router-view />
</template>
<script></script>
<style lang="less"></style>
