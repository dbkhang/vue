<template>
    <div class="toast-message">
        <div class="toast-message__left">
            <div class="icon icon__v-success toast-message__icon--success"></div>
            <!-- <i class="fa-solid fa-circle-check toast-message__icon--success"></i> -->
        </div>
        <div class="toast-message__right">
            <div class="toast-message__right-1">
                <span> {{ mes }}</span>
                <span class="text__color">Thành công!</span>
            </div>
            <div class="toast-message__right-2">
                <div class="icon__x-small icon" @click="handleClickClose"></div>
            </div>
        </div>
        </div>
</template>

<script>
export default {
    name:"MISAToastMessage",
    props: ["mes"],
    components: {
        
    },
    methods: {
        /**
         * Đóng ToastMessage khi bấm X
         * @author: dbkhang 02-07-2023
         */
        handleClickClose() {
            this.MISATinyEmitter.emit( "hideToastMessage")
        }
    }
    
}
</script>
<style scoped>
    @import url(./toastmessage.css);
    @import url(@/assets/icons/icon.css);
</style>