<template>
    <!-- <div class="img__loading" v-if="isLoading">
        <img src="../assets/image/loading.gif" alt="Loading...">
    </div> -->
    
    <div class="table"  >
        <div class="table__header">
            <div class="table__header__name-table">
                <span>{{ this.$_MISAResource['vn-VI'].PageEmployee.Title }}</span>
            </div>
            <div class="table__header__btn-add">
                <MISAButton typeBtn="m-btn" @click="handleOnClickBtnAddEmployee({})" >{{ this.$_MISAResource['vn-VI'].Button.AddEmployee }}</MISAButton>
            </div>
        </div>
        <div class="table__container">
            <div class="table__container__header">
                <div class="actionMultiple" >
                    <div v-if="showMultipleAction">
                        <div 
                            class="actionMultiple__text" 
                            @click="showActionMultiple = !showActionMultiple"
                        >
                            <span>
                                {{ this.$_MISAResource['vn-VI'].ActionMultiple.Title }}
                            </span>
                            <div class="icon icon__down-2"></div>
                        </div>
                        <div class="actionMultiple__option" v-if="showActionMultiple">
                            <div 
                                class="actionMultiple__delete"  
                                @click="showNotificaDeleteMultipleEmployees"
                            >
                                {{ this.$_MISAResource['vn-VI'].ActionMultiple.Delete }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-search__content">
                    <MISAInput 
                        :placeholder="this.$_MISAResource['vn-VI'].PageEmployee.PlaceholderSearch"
                        v-model="textSerach"
                        ref="inputSearch"
                    ></MISAInput>
                    <div class="icon icon__search table-search__icon"></div>
                    <MISAPopper 
                        hover arrow 
                        :content="this.$_MISAResource['vn-VI'].Tooltip.Reload"
                    >
                        <div 
                            class="icon icon__reload table__icon-reload"
                            @click="reloadData"
                        ></div>
                    </MISAPopper>
                    <MISAPopper 
                        hover arrow 
                        :content="this.$_MISAResource['vn-VI'].Tooltip.Excel"
                    >
                        <div 
                            class="icon icon__excel table__icon-excel"
                            @click="exportExcel"
                        ></div>
                    </MISAPopper>
                    
               </div> 
            </div>
            <div>
                <div class="img__loading" v-if="isLoading">
                    <img src="../assets/image/loading.gif" alt="Loading...">
                </div>
                <MISATableEmployee
                    ref="tableEmployeeRef"
                    v-show="!isLoading"
                    :dataTable="this.dataTable"
                    :currentPage="CurrentPage"
                    :showInfoEmployee="showInfoEmployee"
                    :showNotificaDeleteEmployee="showNotificaDeleteEmployee"
                    :totalListEmployeeDelete="totalListEmployeeDelete"
                    :checkboxPage="checkboxPage"
                    :employeeCodeMax="getMaxEmployeeCode"
                    :loadData="loadData"
                    :handleAddEmployee="handleOnClickBtnAddEmployee"
                    @updateListEmployeeDelete="(data) => {this.totalListEmployeeDelete = data}"
                    @saveCheckbocPage="(data) => {this.checkboxPage = data}"
                >
                </MISATableEmployee>
                <div class="line__end">
                    <div  class="line__end__left">
                        {{ this.$_MISAResource['vn-VI'].PageEmployee.Bottom.Total }}
                        {{ this.validateNumber(this.totalRecords) }}
                        {{ this.$_MISAResource['vn-VI'].PageEmployee.Bottom.Record }}
                    </div>
                    <div class="line__end__right">
                        <div class="record-number" v-click-outside="handleCloseRecordNumber">
                            <!-- <div class="record-number__text">
                                {{ this.$_MISAResource['vn-VI'].PageEmployee.Bottom.NumberRecordsPage }}
                            </div> -->
                            <div class="record-number__btn" @click="handleShowRecordNumber" >
                                <span>{{ this.pageSize + this.$_MISAResource['vn-VI'].TableEmployee.Pading }}</span>
                                <div class="icon icon__down"></div>
                                <!-- <div class="icon icon__down-black"></div> -->
                            </div>
                            <ul 
                                class="record-number__options"
                                v-if="showRecordNumber"
                            >
                                <li 
                                    class="option" 
                                    :class="{'option-select' : pageSize == item}"
                                    v-for="(item, i) in this.$_MISAEnum.RecordNumberOptions" 
                                    :key="i"
                                    @click="handleSelectRecord(item)"
                                >
                                    <span class="option__text">{{ item + this.$_MISAResource['vn-VI'].TableEmployee.Pading }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-page">
                            <MISAPagination 
                                :totalPages="TotalPage"
                                :pageNumber="offSet"
                                :handlePrew="downOffSet"
                                :handleAfter="upOffSet"
                                :handleChosePageNumber="handleChosePageNumber"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <MISAFormEmployee 
        v-if="showEmployee" 
        :showFormEmployee="closeFormEmployee" 
        :employeeInput="employeeSelected"
        :loadData="loadData"
        :allDepartment="AllDepartment"
        :getMaxEmployeeCode="getMaxEmployeeCode"
    ></MISAFormEmployee>
</template>

<script>
import MISAFormEmployee from '@/components/formemployee/MISAFormEmployee.vue';
import MISATableEmployee from '@/components/tableemployee/MISATableEmployee.vue'
import debounce from "lodash.debounce"
import { addCommas } from '@/js/base/validatenumber'; 
import { APIDeleteEmployee, 
        APIPaging, 
        APIDeleteEmployeeMultiple, 
        APIGetMaxEmployeeCode,
        APIExportExcel
    } from '@/actions/api/employee/apiemployee';
import { APIGetAllDepartment } from '@/actions/api/department/apidepartment';
import { handleExceptionMixin } from "@/actions/exception/handleException.js"
import { downloadFile } from "@/js/exportexcel/downloadFile.js"
import MISAPagination from '@/components/pagination/MISAPagination.vue'

export default {
    name:"EmployeeList",
    components: {
        MISAFormEmployee, MISATableEmployee, MISAPagination
    },
    mixins: [handleExceptionMixin],
    data() {
        return {
            showEmployee: false,
            dataTable: [],
            employeeSelected: {},
            idEmployeeClick: null,
            totalRecords: Number,
            showRecordNumber: false,
            pageSize: 10,
            offSet: 1,
            TotalPage: Number, 
            textSerach: "",
            CurrentPage: Number,
            nameEmployeeDelete: "",
            listEmployee: [],
            AllDepartment: [],
            totalListEmployeeDelete: [],
            checkboxPage: [],
            showActionMultiple: false,
            isLoading: false,
        }
    },
    computed: {
        showMultipleAction() {
            if (this.totalListEmployeeDelete.length > 0) {
                return true;
            } else return false
        }
    },
    methods:{
        
        /**
         * Validate thêm dấu phẩy ngăn cách giữa số
         * @param {*} numberChange số cần thay đổi
         * @author: dbkhang 02-07-2023
         */
        validateNumber(numberChange) {
            return addCommas(numberChange)
        },
        /**
         * Bấm nut "Thêm mới nhân viên" để mở FormEmployss 
         * @author: dbkhang 06-02-2023
         */
        async handleOnClickBtnAddEmployee(newEmployeeAdd) {
            this.employeeSelected = newEmployeeAdd
            this.employeeSelected.EmployeeId = ""
            this.employeeSelected.EmployeeCode = await this.getMaxEmployeeCode()
            this.showEmployee = true
        },

        /**
         * đóng FormEmployss
         * @author: dbkhang 06-02-2023
         */
        closeFormEmployee() {
            this.showEmployee = false
        },

        /**
         * Bấm đúp chuột để mở FormEmployss 
         * @author: dbkhang 06-02-2023
         */
        showInfoEmployee(employee) {
            this.showEmployee = true
            this.employeeSelected = employee
        },

        /**
         * Hiển thị combobox để chọn số bản ghi trong trang
         * @author: dbkhang 02-07-2023
         */
        handleShowRecordNumber() {
            this.showRecordNumber = !this.showRecordNumber
        },

        /**
         * ĐÓng combobox để chọn số bản ghi trong trang
         * @author: dbkhang 02-07-2023
         */
        handleCloseRecordNumber() {
            this.showRecordNumber = false
        },

        /**
         * Chọn số bản ghi trong một trang
         * @author: dbkhang 02-07-2023
         */
        handleSelectRecord(record) {
            this.pageSize = record
            this.offSet = 1
            this.showRecordNumber = false
            this.loadData()
            this.zIndex = record
        },

        /**
         * Chọn trang tiêp theo
         * @author: dbkhang 02-07-2023
         */
        upOffSet() {
            if (this.TotalPage > this.offSet) {
                this.offSet = this.offSet + 1
                this.loadData()
                
            } 
        },

        /**
         * Lùi lại 1 trang
         * @author: dbkhang 02-07-2023
         */
        downOffSet() {
            if (this.offSet > 1) {
                this.offSet = this.offSet - 1
                this.loadData()
            } 
            
        },

        /**
         * Hàm sử lý sự kiện bấm số trang 
         * @param {*} pageNumber số thứu tự trang được chọn
         * @author dbkhang 17-07-2023
         */
        handleChosePageNumber(pageNumber) {
            if (pageNumber != "...") {
                this.offSet = pageNumber
                this.loadData()
            }
        },

        /**
         * Reload dữ liệu khi bấm nút
         * @author dbkhang 05-07-2023
         */
        reloadData() {
            this.textSerach = ""
            this.$refs.inputSearch.resetInput();
        },

        /**
         * hiện thông báo xoa nhân viên
         * @param {*} id là id của nhân viên cần xoá
         * @param {*} codeEmployee là mã của nhân viên cần xoá
         * @author dbkhang 12-06-2023
         */
        showNotificaDeleteEmployee(id, codeEmployee) {
            // console.log(nameEmployee);
            this.nameEmployeeDelete = codeEmployee
            this.MISATinyEmitter.emit(
                "showDeleteEmployee",
                this.$_MISAResource['vn-VI'].Dialog.ContentDelete,
                codeEmployee,
                id,
            )
        },


        /**
         * chức năng xoá nhân viên theo Id của từng người
         * @param {*} id la id của người được chọn để xoá
         * @author: dbkhang 08/06/2023
         */
        async deleteEmployee(id) {
            try {
                // gọi API xoá 
                let res = await APIDeleteEmployee(id)
                if (res.status === 200) {
                    // xoá thành công load lại dữ liệu
                    this.loadData()
                    // hiển thị thông báo thành công
                    this.MISATinyEmitter.emit( 
                        "showToastMessage", 
                        this.$_MISAResource['vn-VI'].ToastMessage.DeleteEmployee
                    )
                }
                
            } catch (error) {
                this.handleApiError(error)
            }
        },

        /**
         * hiện thông báo xoa nhân viên
         * @author: dbkhang(05-07-2023)
         */
        showNotificaDeleteMultipleEmployees() {
            this.MISATinyEmitter.emit(
                "showDeleteEmployee",
                this.$_MISAResource['vn-VI'].Dialog.ContentDelete,
                this.$_MISAResource['vn-VI'].Dialog.DeleteMultiple,
                
            )
        },

        /**
         * Xoa Nhiều bản ghi trong bảng
         * @author: dbkhang(05-07-2023)
         */
        async handleDeleteMultipleEmployees() {
            try {
                // Kiểm tra xem danh sách xoá có trống hay không
                if (this.totalListEmployeeDelete.length != 0) {
                    // Gọi API để xoá nhiều
                    let res = await APIDeleteEmployeeMultiple(this.totalListEmployeeDelete)
                    if (res.status === 200) {
                        // Load lại dữ liệu
                        this.loadData()
                        //hiện thông báo thành công bằng ToastMessage
                        this.MISATinyEmitter.emit( 
                            "showToastMessage", 
                            this.$_MISAResource['vn-VI'].ToastMessage.DeleteEmployee
                        )
                        // Ẩn chức năng rrhuwcj hiện hàng loạt và load lại dữ liệu của các biến về ban đầu
                        this.showActionMultiple = false
                        this.checkboxPage = []
                        this.totalListEmployeeDelete = []
                        this.$refs.tableEmployeeRef.updateData();
                    }
                }
                
            } catch (error) {
                //Xử lý lỗi
                console.log(error);
            }
        },
        
        /**
         * callAPI để lấy dữ liệu vào bảng
         * @author: dbkhang 06-02-2023
         * @returns lấy được dữu liệu bảng
         */
        async loadData() {
            try {
                // Hiển thị màn hình loading
                this.isLoading = true
                // Gọi API để lấy dữ liệu
                let dataClone = await APIPaging(this.pageSize, this.offSet, this.textSerach)
                // Kiểm tra xem kết quả trả về có bản ghi nào không
                if (dataClone.CurrentPageRecords === 0) {
                    // nếu không thì xét lại số thứ tự trang do tìm kiếm số trang vượt quá số trang hiện có
                    this.offSet -= 1
                    // load lại dữ liệu
                    this.loadData()
                } else {
                    //gán các giá trị 
                    this.isLoading = false
                    this.dataTable = dataClone.Data
                    this.totalRecords = dataClone.TotalRecord
                    this.TotalPage = dataClone.TotalPage
                    this.CurrentPage = dataClone.CurrentPage
                }
            } catch (error) {
                // xử lý lỗi
                this.handleApiError(error)
            }
        },

        /**
         * callAPI lấy tất cả đươn vị
         * @author: dbkhang 06-02-2023
         */
        async loadAllDepartment() {
            try {
                let res = await APIGetAllDepartment()
                if (res.status === 200) {
                    this.AllDepartment = res.data
                }
            } catch (error) {
                this.handleApiError(error)
            }
        },
        /**
         * Trả về employeeCode tiếp theo 
         * @author: dbkhang 05-07-2023
         */
        async getMaxEmployeeCode() {
            try {
                let res = await APIGetMaxEmployeeCode()
                if (res.status === 200) {
                    return res.data;
                }
            } catch (error) {
                this.handleApiError(error)
            }
        },
        /**
         * hàm xuất file Excel
         * @author: dbkhang 05-07-2023
         */
        async exportExcel() {
            try {
                let res = await APIExportExcel()
                if (res.status === 200) {
                    downloadFile(res, "employees.xlsx")
                }
            } catch (error) {
                this.handleApiError(error)
            }
        },

    },
    created() {
        this.MISATinyEmitter.on("deleteEmployee", this.deleteEmployee)
        this.MISATinyEmitter.on("deleteMultipleEmployee", this.handleDeleteMultipleEmployees)
        this.loadData()
        this.loadAllDepartment()
    },
    watch: {
        /** 
         * Chuc nang tim kiem
         * @author: dbkhang 06/08/2023
         */
        textSerach: debounce(async function debounceRead() {
            this.isLoading = true
            this.offSet = 1
            this.loadData()
        }, 500),

    },
    beforeUnmount() {
        this.MISATinyEmitter.off("deleteEmployee")
        this.MISATinyEmitter.off("deleteMultipleEmployee")
    },
}
</script>
<style scoped>
    @import url(@/css/components/table.css);


</style>