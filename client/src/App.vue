<template>
  <div>
    <el-header>
      <img :src="logo">
      <p v-if="connected">Connected <i style="color:green" class="el-icon-success"/></p>
      <p v-else>Waiting for Connection <i class="el-icon-loading"/></p>
    </el-header>
    <el-main>
      <el-button type="warning" @click="sound_alarm">Sound Alarm</el-button>
      <el-button type="danger" @click="lock_safe">Lock Safe</el-button>
    </el-main>
  </div>
</template>

<script>
import Vue from 'vue';
import Layout from 'element-ui';
import Button from 'element-ui';
import Icon from 'element-ui';
import io from 'socket.io-client';

Vue.use(Layout);
Vue.use(Button);
Vue.use(Icon);

import logo from './assets/logo.png'

export default {
  name: 'app',
  data() {
    return {
      logo,
      connected: false,
      socket: io('localhost:8889/client')
    };
  },
  mounted() {
    this.socket.on('connect', ()=>{
      this.connected = true
    })
  },
  methods: {
    sound_alarm() {
      this.socket.emit('sound_alarm')
    },
    lock_safe() {
      this.socket.emit('lock_safe')
    }
  }
};
</script>