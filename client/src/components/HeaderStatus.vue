<template>
    <el-header class="header-container">
        <table>
            <tr>
                <td>Socket:</td>
                <td v-if="connected" class="right-align">connected <i style="color:green" class="el-icon-success"/></td>
                <td v-else class="right-align">waiting for connection <i class="el-icon-loading"/></td>
            </tr>
            <tr v-if="connected" class="header-item">
                <td>Beaglebone:</td>
                <td v-if="latency>0" class="right-align">{{ latency }} ms</td>
                <td v-else class="right-align">not connected <i class="el-icon-error" style="color:red"/></td>
            </tr>
        </table>
    </el-header>    
</template>

<script>
import Vue from 'vue';
import { Header } from 'element-ui';

Vue.use(Header);
export default {
    props: ['connected', 'latency']
}
</script>
<style scoped>
    .header-container {
        padding: 10px;
    }

    table {
        margin-right: 0px;
        margin-left: auto;
        width: auto;
    }

    td {
        padding: 5px;
        margin: 5px;
    }

    .right-align {
        text-align: right;
    }
</style>

