<template>
    <div class="main-container">
        <div class="main-content" style="position:relative">
            <slot></slot>
        </div>
        
    </div>
</template>

<script>

export default {
    name: "PageBody",
    data() {
        return {
            
        }
    },
    methods: {
      
    },
    created() {

    },

    mounted() {
        
    },
    destroyed() {
        
    }
}

</script>

<style scoped>
.main-container {
    margin-top: 120px;
    display: flex;
    justify-content: center;
}

.main-content {
    width: 1000px;
    background-color: #ffffff;
    min-height: 90vh;
    z-index:2;
}

#show {
    position: absolute;
    top: -40px;
    width: 100%;
    text-align: center;
    font-size: 18px;
}

.billboard {
    width: 13%;
    height: 560px;
    border: 1px solid black;
    position: fixed;
    background-color: #ffffff;
    z-index: 1;
}

.billboard.left {
    left: 5%;
}

.billboard.right {
    right: 5%;
}

.billboard .close-btn {
    font-size: 1.8rem;
    text-align: right;
    cursor: pointer;
}
.billboard .content{
    text-align:center;
    font-size: 2.9rem;
    padding-top:80px;
    color:#ccc;
    cursor: pointer;
}
.billboard .content:hover{
    padding-top:50px;
    font-size: 3.5rem;
    color:#a5a5a5;
}
</style>