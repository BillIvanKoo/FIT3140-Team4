<template>
  <el-container>
    <img :src="logo" />
    <header-logo :connected="connected" class="headerlogo"/>
    <warning-list :warnings="warnings" class="warninglist"/>
    <response-toolbar @warn="emitToSocket" class="footertool"/>
  </el-container>
</template>

<script>
import Vue from 'vue';
import { Container, Icon, Button, Card } from 'element-ui';
import io from 'socket.io-client';

import logo from './assets/logo.png';

import HeaderLogo from './components/HeaderLogo.vue';
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
      warnings: [
        {
          type: 'robbery',
          time: new Date(2019, 0, 15)
        },
        {
          type: 'fire',
          time: new Date(2019, 0, 14)
        },
        {
          type: 'medical',
          time: new Date(2019, 0, 13)
        },
        {
          type: 'natural',
          time: new Date(2019, 0, 12)
        },
        {
          type: 'robbery',
          time: new Date(2019, 0, 11)
        },
        {
          type: 'fire',
          time: new Date(2019, 0, 10)
        },
        {
          type: 'medical',
          time: new Date(2019, 0, 9)
        },
        {
          type: 'natural',
          time: new Date(2019, 0, 8)
        },
        {
          type: 'robbery',
          time: new Date(2019, 0, 7)
        },
        {
          type: 'fire',
          time: new Date(2019, 0, 6)
        },
        {
          type: 'medical',
          time: new Date(2019, 0, 5)
        },
        {
          type: 'natural',
          time: new Date(2019, 0, 4)
        }
      ]
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
      this.warnings.shift({
        type: 'robbery',
        time: new Date()
      })
    })
    this.socket.on('fire', ()=>{
      this.warnings.shift({
        type: 'fire',
        time: new Date()
      })
    })
    this.socket.on('medical', ()=>{
      this.warnings.shift({
        type: 'medical',
        time: new Date()
      })
    })
    this.socket.on('natural', ()=>{
      this.warnings.shift({
        type: 'natural',
        time: new Date()
      })
    })
    this.socket.on('cancel_signal', ()=>{
      this.warnings.shift({
        type: 'cancel_signal',
        time: new Date()
      })
    })
  },
  methods: {
    emitToSocket(event){
      this.socket.emit(event)
    }
  },
  components: {
    HeaderLogo, ResponseToolbar, WarningList
  }
};
</script>

<style scoped>
  .headerlogo {
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
