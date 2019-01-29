<template>
    <el-header>
        <p v-if="connected">Connected <i style="color:green" class="el-icon-success"/></p>
        <p v-else>Waiting for Connection <i class="el-icon-loading"/></p>
    </el-header>    
</template>

<script>
import Vue from 'vue';
import { Header } from 'element-ui';

Vue.use(Header);
export default {
    props: ['connected', 'logo']
}
</script>
<style scoped>
    p {
        float: right;
    }
</style>

