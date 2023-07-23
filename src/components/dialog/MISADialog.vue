<template>
    <div class="dialog-container">
        <div class="dialog-content">
            <div class="dialog__top">
                <label class="dialog__label">{{ title }}</label>
                <div class="icon icon__x icon__close-dialog" @click="hideNotice"></div>
            </div>
            <div class="dialog__main" v-if="showNotice">
                <div class="icon icon__danger"></div>
                <ul class="dialog-main__text" >
                    <li
                        v-for="(item, i) in errors" 
                        :key="i"
                    > {{ item }} </li>
                </ul>
            </div>
            <div class="dialog__main" v-if="this.showDelete">
                <div class="icon icon__danger"></div>
                <span class="dialog-main__text" >
                   Bạn có thực sự muốn xoá {{ codeEmployeeDelete }} không?
                </span>
            </div>
            <div class="dialog__bottom" v-if="this.showNotice">
                <MISAButton typeBtn="m-btn" @click="hideNotice">
                    {{ this.$_MISAResource['vn-VI'].Button.Agree }}
                </MISAButton>
            </div>
            <div class="dialog__bottom" v-if="this.showDelete">
                <MISAButton typeBtn="n-btn" @click="hideNotice">
                    {{ this.$_MISAResource['vn-VI'].Button.No }}
                </MISAButton>
                <MISAButton typeBtn="m-btn" @click="handleDelete">
                    {{ this.$_MISAResource['vn-VI'].Button.Agree }}
                </MISAButton>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"MISADialog",
    props: {
        title: {
            type: String,
            default: "Thông báo"
        },
        errors: {
            type: Array,
        },
        codeEmployeeDelete: {
            type: String,
            default: ""
        },
        idEmployeeDelete: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            showNotice: false,
            showDelete: false,
        }
    },
    methods:{
        hideNotice() {
            this.MISATinyEmitter.emit("hideNotice")
        },
        /**
         * phân biệt xoá nhiều hay xoá 1
         * @author dbkhang 05-07-2023
         */
        handleDelete() {
            if (this.idEmployeeDelete.trim() === '') {
                this.MISATinyEmitter.emit( "deleteMultipleEmployee")
            } else {
                this.MISATinyEmitter.emit( "deleteEmployee", this.idEmployeeDelete)
                
            }
            
            this.MISATinyEmitter.emit("hideNotice")
        }
    },
    created() {
        if (this.errors != null) {
            this.showNotice = true
            this.showDelete = false
        }
        if (this.codeEmployeeDelete) {
            this.showNotice = false
            this.showDelete = true
        }
    },
    
}
</script>
<style scoped>
    @import url(./dialog.css);
</style>