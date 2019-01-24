<template>
    <el-footer>
        <el-button type="warning" @click="$emit('warn', 'sound_alarm')">Sound Alarm</el-button>
        <el-button type="danger" @click="$emit('warn', 'lock_safe')">Lock Safe</el-button>
    </el-footer>
</template>
<script>
export default {
    
}
</script>
