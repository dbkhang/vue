<template>
    <button :class="typeBtn" v-on:click="onClickBtn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "MISAButton",
    components: {

    },
    props: ["typeBtn"],
    methods: {
        
    }
    
}
</script>
<style scoped>
    @import url(./button.css);
</style>