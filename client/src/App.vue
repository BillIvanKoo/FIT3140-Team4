<template>
  <div>
    <el-header>
    <img v-bind:src="logo">
    </el-header>
  </div>
</template>

<script>
import Vue from 'vue';
import Header from 'element-ui';
Vue.use(Header)

import logo from './assets/logo.png'

export default {
  name: 'app',
  data() {
    return {
      message: 'Hello, Vue!',
      logo
    };
  }
};
</script>