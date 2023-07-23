<template>
    <div class="staffinformation__container employeeForm" >
        <div class="staffinformation__content">
            <div class="staffinformation__top">
                <div class="staffinformation__top__left">
                    <h2 class="text-title">{{ labelForm }}</h2>
                    <div class="staffinformation__top-left__input-form">
                        <input class="top-left__input" type="checkbox" name="doi-tuong" value="khach-hang" />
                        <span>Là khách hàng</span>
                    </div>
                    <div class="staffinformation__top-left__input-form">
                        <input class="top-left__input" type="checkbox" name="doi-tuong" value="nha-cung-cap" />
                        <span>Là nhà cung cấp</span>
                    </div>
                </div>
                <div class="staffinformation__top__right">
                    <MISAPopper 
                        hover arrow 
                        :content="this.$_MISAResource['vn-VI'].Tooltip.Help"
                    >
                        <div class="icon icon__question"></div>
                    </MISAPopper>

                    <MISAPopper 
                        hover arrow 
                        :content="this.$_MISAResource['vn-VI'].Tooltip.IconClose"
                    >
                        <div 
                            id="btn-close-ifno-employee" 
                            class="icon icon__x icon__close-info" 
                            @click="showDialogCloseForm"
                        ></div>
                    </MISAPopper>
                </div>
            </div>
            <FormValidate
                @submit="onSubmit(this.$_MISAEnum.TypeSubmit.Save)"
                :validation-schema="schema"
                v-slot="{ errors }"
                ref="form"
                @keydown="submitOnKeyDown"
                @keydown.enter.prevent
            >
                <div class="staffinformation__main">
                    <div class="staffinformation__main-info">
                        <div class="main__staff-information">
                            <div class="staff-info__line-1">
                                <MISATextField 
                                    classtf="small-1" 
                                    name="EmployeeCode"
                                    :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.EmployeeCode"
                                    :valueInput="employee.EmployeeCode" 
                                    :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.EmployeeCode"
                                    :errors="errors"
                                    ref="EmployeeCodeRef"
                                    inputRequired="required"
                                    :updateEmployeeCodeMax="updateEmployeeCodeMax"
                                    @updateDataInput=" (data) => { this.employee.EmployeeCode = data }"
                                ></MISATextField>
                                <MISATextField 
                                    classtf="small-2" 
                                    name="FullName"
                                    :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.FullName"
                                    :valueInput="employee.FullName" 
                                    :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.FullName"
                                    :errors="errors"
                                    inputRequired="required"
                                    @updateDataInput=" (data) => {this.employee.FullName = data}"
                                ></MISATextField>
                            </div>
                            <div class="staff-info__combobox">
                                <MISACombobox
                                    :allDepartment="allDepartment"
                                    name="DepartmentName"
                                    :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.DepartmentName"
                                    :valueInput="employee.DepartmentName" 
                                    :errors="errors"
                                    inputRequired="required"
                                    @updateDataCombobox="(data) => {this.employee.DepartmentId = data}"
                                ></MISACombobox>
                            </div>
                            <div class="staff-info__line">
                                <MISATextField 
                                    classtf="medium"
                                    name="PositionName"
                                    :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.PositionName"
                                    :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.PositionName"
                                    :valueInput="employee.PositionName"
                                    :errors="errors"
                                    @updateDataInput=" (data) => {this.employee.PositionName = data}"
                                ></MISATextField>
                            </div>
                        </div>
                        <div class="main__cmnd-information">
                            <div class="cmnd-info__line">
                                <MISAFlatPickerInputDate 
                                    name="DateOfBirth"
                                    v-model="employee.DateOfBirth"
                                    label="Ngày sinh"
                                    @updateDataInput=" (data) => {this.employee.DateOfBirth = data}"
                                />
                                <!-- <MISATextField 
                                    classtf="small-1" 
                                    name="DateOfBirth"
                                    :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.DateOfBirth"
                                    :valueInput="handleFormatDate(employee.DateOfBirth, 1)" 
                                    type="date"
                                    :errors="errors"
                                    min="1900-01-01"
                                    :max="new Date().toISOString().split('T')[0]"
                                    @updateDataInput=" (data) => {this.employee.DateOfBirth = data}"
                                ></MISATextField> -->
                                <div class="line-1__sex">
                                    <span>{{ this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.Gender }}</span>
                                    <div>
                                        <div>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                id="genderMale"
                                                :value="this.$_MISAEnum.Gender.Male" 
                                                v-model="employee.Gender" 
                                                @click="() => {this.employee.Gender = this.$_MISAEnum.Gender.Male}"
                                            />
                                            <label for="genderMale">{{ this.$_MISAResource['vn-VI'].Gender.Male }}</label>
                                        </div>
                                        <div>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                id="genderFemale"
                                                :value="this.$_MISAEnum.Gender.Female" 
                                                v-model="employee.Gender" 
                                                @click="() => {this.employee.Gender = this.$_MISAEnum.Gender.Female}"
                                            />
                                            <label for="genderFemale">{{ this.$_MISAResource['vn-VI'].Gender.Female }}</label>
                                        </div>
                                        <div>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                id="genderOther"
                                                :value="this.$_MISAEnum.Gender.Other" 
                                                v-model="employee.Gender"
                                                @click="() => {this.employee.Gender = this.$_MISAEnum.Gender.Other}"
                                            />
                                            <label for="genderOther">{{ this.$_MISAResource['vn-VI'].Gender.Other }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cmnd-info__line">
                                <MISATextField 
                                    classtf="small-2" 
                                    name="IdentityNumber"
                                    :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.IdentityNumber"
                                    :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.IdentityNumber"
                                    :valueInput="employee.IdentityNumber" 
                                    :errors="errors"
                                    :tooltip="this.$_MISAResource['vn-VI'].Tooltip.IdentityNumber"
                                    @updateDataInput=" (data) => {this.employee.IdentityNumber = data}"
                                ></MISATextField>
                                <MISAFlatPickerInputDate 
                                    name="IdentityDate"
                                    v-model="employee.IdentityDate"
                                    :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.IdentityDate"
                                    @updateDataInput=" (data) => {this.employee.IdentityDate = data}"
                                />
                                <!-- <MISATextField 
                                    classtf="small-1" 
                                    name="IdentityDate"
                                    :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.IdentityDate"
                                    type="date" 
                                    min="1900-01-01"
                                    :max="new Date().toISOString().split('T')[0]"
                                    :valueInput="handleFormatDate(employee.IdentityDate, 1)" 
                                    @updateDataInput=" (data) => {this.employee.IdentityDate = data}"
                                ></MISATextField> -->
                            </div>
                            <div >
                                <MISATextField 
                                    classtf="medium" 
                                    name="IdentityPlace"
                                    :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.IdentityPlace" 
                                    :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.IdentityPlace"
                                    :valueInput="employee.IdentityPlace" 
                                    @updateDataInput=" (data) => {this.employee.IdentityPlace = data}"
                                ></MISATextField>
                            </div>
                        </div>
                    </div>
                    <div class="contact-info">
                        <div class="contact-info__line-1">
                            <MISATextField 
                                classtf="large" 
                                name="Address"
                                :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.Address"
                                :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.Address"
                                :valueInput="employee.Address"
                                @updateDataInput=" (data) => {this.employee.Address = data}"
                            ></MISATextField>
                        </div>
                        <div class="contact-info__line">
                            <MISATextField 
                                classtf="small-2" 
                                name="PhoneNumber"
                                :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.PhoneNumber"
                                :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.PhoneNumber"
                                :valueInput="employee.PhoneNumber"
                                :tooltip="this.$_MISAResource['vn-VI'].Tooltip.PhoneNumber"
                                @updateDataInput=" (data) => {this.employee.PhoneNumber = data}"
                            ></MISATextField>
                            <MISATextField 
                                classtf="small-2" 
                                name="TelephoneNumber"
                                :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.TelephoneNumber" 
                                :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.TelephoneNumber"
                                :valueInput="employee.TelephoneNumber"
                                :tooltip="this.$_MISAResource['vn-VI'].Tooltip.TelephoneNumber"
                                @updateDataInput=" (data) => {this.employee.TelephoneNumber = data}"
                            ></MISATextField>
                            <MISATextField 
                                classtf="small-2" 
                                name="Email"
                                :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.Email"
                                :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.Email"
                                :valueInput="employee.Email"
                                @updateDataInput=" (data) => {this.employee.Email = data}"
                                :errors="errors"
                            ></MISATextField>
                        </div>
                        <div class="contact-info__line">
                            <MISATextField 
                                classtf="small-2" 
                                name="BankAccount"
                                :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.BankAccount"
                                :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.BankAccount"
                                :valueInput="employee.BankAccount"
                                @updateDataInput=" (data) => {this.employee.BankAccount = data}"
                            ></MISATextField>
                            <MISATextField 
                                classtf="small-2" 
                                name="BankName"
                                :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.BankName"
                                :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.BankName"
                                :valueInput="employee.BankName"
                                @updateDataInput=" (data) => {this.employee.BankName = data}"
                            ></MISATextField>
                            <MISATextField 
                                classtf="small-2" 
                                name="BankBranch"
                                :label="this.$_MISAResource['vn-VI'].FormEmployee.LabelInput.BankBranch"
                                :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.BankBranch"
                                :valueInput="employee.BankBranch"
                                @updateDataInput=" (data) => {this.employee.BankBranch = data}"
                            ></MISATextField>
                        </div>
                    </div>
                </div>
                <div class="staffinformation__bottom">
                    <div class="bottom__left">
                        <MISAButton type="button" typeBtn="n-btn" @click="onCloseForm">
                            {{ this.$_MISAResource['vn-VI'].Button.Cancel }}
                        </MISAButton>
                    </div>
                    <!-- @click="handleAddEmployee" -->
                    <div class="bottom__right">
                        <MISAButton 
                            typeBtn="n-btn" 
                            type="submit"
                        >{{ this.$_MISAResource['vn-VI'].Button.Save }}</MISAButton>
                        <MISAButton 
                            type="button"
                            typeBtn="m-btn" 
                            @click="onSubmit(this.$_MISAEnum.TypeSubmit.SaveAndAdd)"
                        >{{ this.$_MISAResource['vn-VI'].Button.SaveAdd }}</MISAButton>
                        <!-- this.$_MISAEnum.TypeSubmit.SaveAndAdd -->
                    </div>
                </div>
            </FormValidate>
            
        </div>
    </div>
</template>

<script>
import { formatDate } from "@/js/handledate/formatdate";
import { isEqual } from "lodash";
import * as Yup from 'yup';
import { Form as FormValidate } from "vee-validate";
import { APIEditEmployee, APICreateEmployee } from "@/actions/api/employee/apiemployee";
import { handleExceptionMixin } from "@/actions/exception/handleException.js"
import MISAFlatPickerInputDate from '@/components/flatpickerinputdate/MISAFlatPickerInputDate.vue'
 
export default {
    name: "MISAFormEmloyee",
    components: { FormValidate, MISAFlatPickerInputDate },
    props: ["showFormEmployee", "employeeInput", "loadData", "allDepartment", "getMaxEmployeeCode"],
    mixins: [handleExceptionMixin],
    data() {
        const schema = Yup.object().shape({
            EmployeeCode: Yup.string()
                .required(this.$_MISAResource['vn-VI'].Errors.EmployeeCodeRequired)
                .max(20, this.$_MISAResource['vn-VI'].Errors.EmployeeCodeMaxLength),
            FullName: Yup.string()
                .required(this.$_MISAResource['vn-VI'].Errors.FullNameRequired)
                .max(225, this.$_MISAResource['vn-VI'].Errors.FullNameMaxLength),
            DepartmentName: Yup.string()
                .required(this.$_MISAResource['vn-VI'].Errors.DepartmentNameRequired),
            Email: Yup.string().nullable()
                .email(this.$_MISAResource['vn-VI'].Errors.Email),
            Address: Yup.string().nullable()
                .max(255, this.$_MISAResource['vn-VI'].Errors.Address),
            BankBranch: Yup.string().nullable()
                .max(255, this.$_MISAResource['vn-VI'].Errors.BankBranch),
            BankName: Yup.string().nullable()
                .max(255, this.$_MISAResource['vn-VI'].Errors.BankName),
            BankAccount: Yup.string().nullable()
                .max(25, this.$_MISAResource['vn-VI'].Errors.BankAccount),
            IdentityPlace: Yup.string().nullable()
                .max(100, this.$_MISAResource['vn-VI'].Errors.IdentityPlace),
            
            
        });
        return {
            schema,
            labelForm: "",
            employee: {},
            compareEmployee: {},
            errors: [],
            changeForm: false,
            updateEmployeeCodeMax: "",
        }
    },
    created() {
        this.MISATinyEmitter.on("closeFormEmployee", this.onCloseForm)
        this.MISATinyEmitter.on("submitFormEmployee", this.submitFormEmployee)
        
        let employeeState = JSON.stringify(this.employeeInput)
        this.employee = JSON.parse(employeeState)
        this.compareEmployee = JSON.parse(employeeState)
        // chỉnh sửa title của form cho đúng dạng form
        if (this.FormMode == this.$_MISAEnum.FormMode.Add) {
            this.labelForm = this.$_MISAResource['vn-VI'].FormEmployee.AddTitle
        } else {
            this.labelForm = this.$_MISAResource['vn-VI'].FormEmployee.EditTitle
        }
    },
    computed: {
        /**
         * Kiểm tra xem đây là form thêm mới hay form sửa
         */
        FormMode: function() {
            if (!this.employeeInput.EmployeeId) {
                return this.$_MISAEnum.FormMode.Add;
            } else {
                return this.$_MISAEnum.FormMode.Edit;
            }
        },
    }, 
    methods: {
        /**
         * Hàm lấy thời gian hiện tại
         * @author dbkhang
         */
        dateNow() {
            const currentDate = new Date();
            const currentDateString = currentDate.toLocaleDateString(); 
            let dateNow = this.handleFormatDate(currentDateString, 1).toString()
            return dateNow
        },
        /**
         * Bắt sự kiện khi bấm các tổ hợp phím để lưu và thoát trong Form
         * @param {*} e Bắt sự kiện khi bấm nút
         * @author: dbkhang 05-07-2023
         */
        submitOnKeyDown(e) {
            // bấm éc thì đóng form
            if (e.key === 'Escape') {
                this.showDialogCloseForm();
                //nếu bấm tổ hoepj Ctrl + S thì thực hiện chức năng cất
            } else if (e.ctrlKey && e.key === 's') {
                this.onSubmit(this.$_MISAEnum.TypeSubmit.Save);
                e.preventDefault();
                //nếu bấm tổ hợp Ctrl + Shift + S thì thực hiện chức năng cất và thêm
            } else if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                this.onSubmit(this.$_MISAEnum.TypeSubmit.SaveAndAdd);
            }
            
        },
        /**
         * Hiện thông báo khi bấm nút X đóng form khi có sự thay đổi
         * @author: dbkhang 02-07-2023
         */
        showDialogCloseForm() {
            // console.log(this.dateNow());
            if (this.changeForm) {
                this.MISATinyEmitter.emit("showNoticeCloseForm")
            } else this.showFormEmployee()
        },

        /**
         * Submit form khi bấm nút "Có" trên dialog 
         * @author: dbkhang 02-07-2023
         */
        submitFormEmployee() {
            this.MISATinyEmitter.emit("hideNoticeCloseForm")
            this.onSubmit(this.$_MISAEnum.TypeSubmit.Save);
        },
        /**
         * Đóng form khi bấm nút Không trên Dialog
         * @author: dbkhang 02-07-2023
         */
        onCloseForm() {
            this.MISATinyEmitter.emit("hideNoticeCloseForm")
            this.showFormEmployee()
            
        },
        
        /**
         * validate dữ liệu thời gian
         * @param {} dateValue dữ liệu thời gian cần validate
         * @param {} isAction kiểu dữ liệu cần validate thành
         */
        handleFormatDate(dateValue, isAction) {
            return formatDate(dateValue, isAction)
        },

        /**
         * Submit form
         * @param {*} numberBtn là kiểu submit Cất hay Cất và thêm
         */
        async onSubmit(numberBtn) {
            //Kiểm tra validate nếu false thì không cho gửi request
            const res = await this.$refs.form.validate().then(res => res);
            if (res.valid == false) {
                return 0;
            }

            //Kiểm tra là Form thêm mới
            if (this.FormMode == this.$_MISAEnum.FormMode.Add) {
                // let res = await APICreateEmployee(this.employee)
                this.callAPIAddEmployee(numberBtn)
            }
            //Kiểm tra là Form sửa 
            // 1 la du lieu server tra ve
            if (this.FormMode == this.$_MISAEnum.FormMode.Edit) {
                this.callAPIEditEmployee(numberBtn)
            }

        },
        /**
         * Call APi để thêm nhân viên
         * @param {*} numberBtn nhận biết xem là cất hay cất và thêm
         * @author: dbkhang 05-07-2023
         */
        async callAPIAddEmployee(numberBtn) {
            try {
                // 1.Gọi API thêm nhân viên
                let res = await APICreateEmployee(this.employee)
                // 2. Kiểm tra nếu thành công mã trả về 201
                if (res.status === 201) {
                    // if (res.data === 1) {
                        // Kiểm tra xem đây là lệnh cất hay cất và thêm
                        if (numberBtn === this.$_MISAEnum.TypeSubmit.Save) {
                            // Nếu là cất gọi đến hàm để đóng Form
                            this.showFormEmployee()
                        } else {
                            // Nếu là Cất và thêm thì reset lại Form
                            this.$refs.form.resetForm();
                            // Xét lại điều kiện kiểm tra xem form có thay đôi không để hiển thị thông báo khi bấm nút X thoát form
                            this.compareEmployee = {}
                            // Gọi API để lấy giá trị EmployeeCode mới
                            let dataEmployeeMaxCode = await this.getMaxEmployeeCode()
                            this.employee.EmployeeCode = dataEmployeeMaxCode
                            this.updateEmployeeCodeMax = dataEmployeeMaxCode
                            // Thực hiện focus vào ô input
                            this.$nextTick(() => {
                                this.$refs.EmployeeCodeRef.focusInput();
                            });
                        }
                        // show ToastMessage thông báo thành công
                        this.MISATinyEmitter.emit( "showToastMessage", this.$_MISAResource['vn-VI'].ToastMessage.AddEmployee)
                        // Load lại  dữ liệu 
                        this.loadData()
                    // }
                }
            } catch (error) {
                // xử lý lỗi
                this.handleApiError(error)
            }
        },

        /**
         * Call APi để sua thong tin nhân viên
         * @param {*} numberBtn nhận biết xem là cất hay cất và thêm
         * @author: dbkhang 05-07-2023
         */
        async callAPIEditEmployee(numberBtn) {
            try {
                // Gọi API để thực hiện Sửa thông tin của nhân viên
                let res = await APIEditEmployee( this.employee.EmployeeId, this.employee)
                // Kiểm tra nếu thành công mã trả về 200
                if (res.status === 200) {
                    
                        // Kiểm tra xem đây là lệnh cất hay cất và thêm
                        if (numberBtn === this.$_MISAEnum.TypeSubmit.Save) {
                            // Nếu là cất gọi đến hàm để đóng Form
                            this.showFormEmployee()
                        } else {
                            // Nếu là Cất và thêm thì reset lại Form
                            this.$refs.form.resetForm();
                            // Xét lại điều kiện kiểm tra xem form có thay đôi không để hiển thị thông báo khi bấm nút X thoát form
                            this.compareEmployee = {}
                             // Gọi API để lấy giá trị EmployeeCode mới
                            let dataEmployeeMaxCode = await this.getMaxEmployeeCode()
                            this.employee.EmployeeCode = dataEmployeeMaxCode
                            this.updateEmployeeCodeMax = dataEmployeeMaxCode
                            // Thực hiện focus vào ô input
                            this.$nextTick(() => {
                                this.$refs.EmployeeCodeRef.focusInput();
                            });
                        }
                        // show ToastMessage thông báo thành công
                        this.MISATinyEmitter.emit( "showToastMessage", this.$_MISAResource['vn-VI'].ToastMessage.EditEmployee)
                        // Load lại  dữ liệu 
                        this.loadData()
                    
                }
            } catch (error) {
                // xử lý lỗi
                this.handleApiError(error)
            }
        },
    },

    watch: {
        /**
         * Kiểm tra xem dữ liệu employee trên form có thay đổi hay không
         * @author: dbkhang 02-07-2023
         */
        employee: {
            handler() {
                this.changeForm = !isEqual(this.employee, this.compareEmployee);
            },
            deep: true,
        }
    },
    beforeUnmount() {
        this.MISATinyEmitter.off("closeFormEmployee")
        this.MISATinyEmitter.off("submitFormEmployee")
    },
    mounted() {
        // thực hiện focus vào ô input employeeCode
        this.$nextTick(() => {
            this.$refs.EmployeeCodeRef.focusInput();
        });
    },
}
</script>
<style scoped>
    @import url(./formemployee.css);
    @import url(@/css/global/fonts.css);
    @import url(@/css/global/variable.css);
    @import url(@/assets/icons/icon.css);
</style>