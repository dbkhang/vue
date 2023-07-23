<template>
    <div class="right__main">
        <router-view></router-view>
        <MISADialog
            v-if="isShowNotice"
            :title="noticeTitle"
            :errors="errors"
            :codeEmployeeDelete="codeEmployeeDelete"
            :idEmployeeDelete="idEmployeeDelete"
        ></MISADialog>
        <MISADialogCloseForm
            v-if="isShowNoticeCloseForm"
        ></MISADialogCloseForm>
        <MISAToastMessage
            v-if="isShowToastMessage"
            :mes="mesToastMessage"
        ></MISAToastMessage>
    </div>
</template>

<script>
import MISADialogCloseForm from '@/components/dialog/MISADialogCloseForm.vue'

export default {
    name:"TheMain",
    components: { MISADialogCloseForm },
    data() {
        return {
            isShowNotice: false,
            noticeTitle: "",
            errors: [],
            isShowToastMessage: false,
            mesToastMessage: "",
            codeEmployeeDelete: "",
            idEmployeeDelete: "",
            isShowNoticeCloseForm: false,
            listEmployeeDelete: []
        }
    },
     
    created() {
        this.MISATinyEmitter.on("showNotice", this.showNotice)
        this.MISATinyEmitter.on("hideNotice", this.hideNotice)
        this.MISATinyEmitter.on("showToastMessage", this.showToastMessage)
        this.MISATinyEmitter.on("hideToastMessage", this.hideToastMessage)
        this.MISATinyEmitter.on("showDeleteEmployee", this.showDeleteEmployee)
        this.MISATinyEmitter.on("showNoticeCloseForm", this.ShowNoticeCloseForm)
        this.MISATinyEmitter.on("hideNoticeCloseForm", this.hideShowNoticeCloseForm)
    },

    beforeUnmount() {
        this.MISATinyEmitter.off("showNotice")
        this.MISATinyEmitter.off("hideNotice")
        this.MISATinyEmitter.off("showToastMessage")
        this.MISATinyEmitter.off("hideToastMessage")
        this.MISATinyEmitter.off("showDeleteEmployee")
        this.MISATinyEmitter.off("hideDeleteEmployee")
        this.MISATinyEmitter.off("showNoticeCloseForm")
        this.MISATinyEmitter.off("hideNoticeCloseForm")
    },

    methods:{
        /**
         * Hiển thị thông báo lỗi
         * @param {*} title Title của thông báo
         * @param {*} errors Lỗi thông báo hiển thị
         * @author dbkhang 18-07-2023
         */
        showNotice(title, errors) {
            this.codeEmployeeDelete = ""
            this.isShowNotice = true;
            this.errors = errors
            this.noticeTitle = title
        },
        /**
         * Ẩn thông Dialog
         * @author dbkhang 18-07-2023
         */
        hideNotice() {
            this.isShowNotice = false;
            this.errors = []
        },
        /**
         * Hiển thị toastMessage
         * @param {*} data dữ liệu hiển thị trên toastMessage
         * @author dbkhang 18-07-2023
         */
        showToastMessage(data) {
            this.isShowToastMessage = true
            this.mesToastMessage = data
            setTimeout(()=>{ this.isShowToastMessage=false },3000)
        },
        /**
         * Ẩn toastMessage
         * @author dbkhang 18-07-2023
         */
        hideToastMessage() {
            this.isShowToastMessage = false
        },
        /**
         * Hiển thị Dialog thông báo xoá nhân viên
         * @param {*} title Title thông báo xoá nhân viên
         * @param {*} nameEmployee EmployeeCode của nhân viên cần xoá
         * @param {*} id id của nhân viên cần xoá
         * @author dbkhang 18-07-2023
         */
        showDeleteEmployee(title, codeEmployee, id) {
            this.errors = []
            this.isShowNotice = true
            if (id) {
                this.codeEmployeeDelete = "Nhân viên <" + codeEmployee + "> "
            } else this.codeEmployeeDelete = codeEmployee
            
            this.noticeTitle = title
            this.idEmployeeDelete = id
        },
        /**
         * Hiển thị thông báo khi tắt form
         * @author dbkhang 18-07-2023
         */
        ShowNoticeCloseForm() {
            this.isShowNoticeCloseForm = true;
        },
        /**
         * Đóng thông báo khi tắt form
         * @author dbkhang 18-07-2023
         */
        hideShowNoticeCloseForm() {
            this.isShowNoticeCloseForm = false;
        },
        
    },
}
</script>
<style scoped>
    @import url(@/css/layout/themain.css);
    @import url(@/css/global/variable.css);
</style>