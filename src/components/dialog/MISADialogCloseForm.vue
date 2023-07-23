<template>
    <div class="dialog-container">
        <div class="dialog-content">
            <div class="dialog__top">
                <label class="dialog__label">{{ this.$_MISAResource['vn-VI'].Dialog.Title }}</label>
                <div class="icon icon__x icon__close-dialog" @click="hideNoticeCloseForm"></div>
            </div>
            <div class="dialog__main">
                <div class="icon icon__question-1"></div>
                <span class="dialog-main__text" >
                    {{ this.$_MISAResource['vn-VI'].Dialog.ContentClickX }}
                   
                </span>
            </div>
            <div class="dialog__bottom-close-form">
                <div>
                    <MISAButton typeBtn="n-btn" @click="hideNoticeCloseForm">
                        {{ this.$_MISAResource['vn-VI'].Button.Cancel }}
                    </MISAButton>
                </div>
                <div>
                    <MISAButton typeBtn="n-btn" @click="closeFormEmployee">
                        {{ this.$_MISAResource['vn-VI'].Button.No }}
                    </MISAButton>
                    <MISAButton typeBtn="m-btn" @click="submitFormEmployee">
                        {{ this.$_MISAResource['vn-VI'].Button.Yes }}
                    </MISAButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"MISADialogCloseForm",
    methods:{
        /**
         * Thực hiện đóng dialog
         */
        hideNoticeCloseForm() {
            this.MISATinyEmitter.emit("hideNoticeCloseForm")
        },
        /**
         * Thực hiện đóng dialog và tắt form
         */
        closeFormEmployee() {
            this.MISATinyEmitter.emit("closeFormEmployee")
        },
        /**
         * Thực hiện submitform
         * @author dbkhang
         */
        submitFormEmployee() {
            this.MISATinyEmitter.emit("submitFormEmployee")
        }
    },
}
</script>
<style scoped>
    @import url(./dialog.css);
</style>