<template>
    <input 
        class="input-components"
        type="text" 
        :placeholder="placeholder" 
        v-model="innerValue"
        ref="inputComponentSearch"
    />
</template>
<script>
export default {
    name:"MISATextField",
    components: {
        
    },
    props: {
        placeholder: {
            type: String,
            default: ""
        },
    },
    data() {
        return{
            innerValue: "",
        }
    },
    methods: {
        resetInput() {
            this.innerValue = "";
        },
    },
    // watch: {
    //     innerValue(val){
    //         this.$emit("update:modelValue", val)
    //     }
    // }
    
}
</script>
<style scoped>
    @import url(./input.css);
</style>