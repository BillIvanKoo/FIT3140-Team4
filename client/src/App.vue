<template>
  <el-container>
    <img :src="logo" />
    <header-status :latency="latency" :connected="connected" class="headerstatus"/>
    <warning-list :warnings="warnings" class="warninglist"/>
    <response-toolbar @warn="emitToSocket" class="footertool"/>
  </el-container>
</template>

<script>
import Vue from 'vue';
import { Container, Icon, Button, Card } from 'element-ui';
import io from 'socket.io-client';

import logo from './assets/logo.png';

import HeaderStatus from './components/HeaderStatus.vue';
import ResponseToolbar from './components/ResponseToolbar.vue';
import WarningList from './components/WarningList.vue'

Vue.use(Container);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Card);

export default {
  name: 'app',
  data() {
    return {
      logo,
      connected: false,
      socket: io('localhost:8889/client'),
      warnings: [],
      latency: -1, // -1 means beaglebone not connected
      latency_timeout: null,
    };
  },
  mounted() {
    this.socket.on('connect', ()=>{
      this.connected = true
    })
    this.socket.on('disconnect', ()=>{
      this.connected = false
    })
    this.socket.on('robbery', ()=>{
      this.warnings.unshift({
        type: 'robbery',
        time: new Date()
      })
    })
    this.socket.on('fire', ()=>{
      this.warnings.unshift({
        type: 'fire',
        time: new Date()
      })
    })
    this.socket.on('medical', ()=>{
      this.warnings.unshift({
        type: 'medical',
        time: new Date()
      })
    })
    this.socket.on('natural', ()=>{
      this.warnings.unshift({
        type: 'natural',
        time: new Date()
      })
    })
    this.socket.on('cancel_signal', ()=>{
      this.warnings.unshift({
        type: 'cancel_signal',
        time: new Date()
      })
    })
    this.socket.on('ping_client', ()=>{
      this.socket.emit('pong_beaglebone')
    })

    // latency and beaglebone connection checking
    setInterval(()=>{
      this.socket.emit("latency_ping", {
        start: new Date()
      })
      this.latency_timeout = setTimeout(()=>{
        this.latency = -1
      }, 200)
    }, 2000)

    this.socket.on("latency_pong", msg => {
      clearTimeout(this.latency_timeout);
      this.latency = new Date() - new Date(msg.start)
    })
  },
  methods: {
    emitToSocket(event, msg){
      msg ? this.socket.emit(event, msg) : this.socket.emit(event)
    }
  },
  components: {
    HeaderStatus, ResponseToolbar, WarningList
  }
};
</script>

<style scoped>
  .headerstatus {
    position: fixed;
    top: 0;
    width: 95%;
  }

  
  .footertool {
    position: fixed;
    width: 100%;
    bottom: 5%;
    text-align: center;
  }
</style>
