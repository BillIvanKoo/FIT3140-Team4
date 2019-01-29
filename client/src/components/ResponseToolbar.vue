<template>
    <el-footer>
        <el-checkbox v-model="timed" class="footer-item">Timed Alarm</el-checkbox>
        <el-input-number v-model="sec" :min="1" :disabled="!timed" controls-position="right" class="footer-item"/>
        <el-button type="warning" @click="$emit('warn', 'sound_alarm')" class="footer-item">Sound Alarm</el-button>
        <el-button type="danger" @click="$emit('warn', 'lock_safe')" class="footer-item">Lock Safe</el-button>
    </el-footer>
</template>
<script>
import Vue from 'vue';
import { Footer, Checkbox, InputNumber } from 'element-ui';

Vue.use(Footer);
Vue.use(Checkbox);
Vue.use(InputNumber);

export default {
    data() {
        return {
            sec: 1,
            timed: false
        }
    }
}
</script>

<style scoped>
    .footer-item {
        margin: 5px
    }
</style>
