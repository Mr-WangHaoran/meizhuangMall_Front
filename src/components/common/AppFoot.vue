<template>
    <div class="foot-container">
        <div class="author">校园二手商城系统 @by Wang Yang</div>
    </div>
</template>

<script>
    export default {
        name: "Foot"
    }
</script>

<style scoped>
    .foot-container {
        width: 100%;
        display: flex;
        justify-content: center;
        height: 40px;
        padding-top: 10px;
    }

    .author {
        color: #999999;
        font-size: 14px;
    }
</style>