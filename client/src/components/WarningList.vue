<template>
    <div class="warnings-container">
        <div class="warnings-overlay"/>
        <warning-card v-for="warning in warnings" :warning="warning" :key="warning.time"/>
    </div>
</template>
<script>
import WarningCard from './WarningCard.vue'
export default {
    props: ['warnings'],
    components: {WarningCard}
}
</script>
<style scoped>
    .warnings-container {
        position: fixed;
        top: 15%;
        left: 10%;
        width: 80%;
        height: 80%;
        overflow: hidden;
    }
    .warnings-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0,0,0,0), white);
        z-index: 9999;
    }
</style>
