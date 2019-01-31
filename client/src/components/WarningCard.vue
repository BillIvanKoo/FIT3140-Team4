<template>
    <el-card>
        <span>{{ warning.time.toLocaleString() }}</span>
        {{ text }}
    </el-card>
</template>
<script>
export default {
    props: ['warning'],
    data() {
        return {
            text: ""
        }
    },
    mounted() {
        switch (this.warning.type){
            case "robbery":
                this.text = "There is a robbery!"
                break;
            case "fire":
                this.text = "There is a fire emergency!"
                break;
            case "natural":
                this.text = "There is a natural disaster!"
                break;
            case "medical":
                this.text = "There is a medical emergency!"
                break;
            case "cancel_signal":
                this.text = "Last signal has been cancelled."
                break; 
            default:
                break;
        }
    }
}
</script>
<style scoped>
    span {
        float: right;
    }
</style>
