<template>
    <div>
        <div class="table__scroll">
            <table class="table__content">
                <thead>
                    <tr>
                        <th class="text-align--center" type="checkbox" style="min-width: 50px;">
                            <input 
                                type="checkbox" 
                                class="checkbox-all" 
                                :value="currentPage"
                                v-model="valueCheckboxAll" 
                                @click="hanldeCheckboxAll"
                            />
                            <!-- @click="clickCheckboxAll"  -->
                        </th>
                        <th class="text-align--left" style="min-width: 140px; max-width: 190px;">
                            {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.EmployeeCode }}
                        </th>
                        <th class="text-align--left" style="min-width: 200px; max-width: 220px;">
                            {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.Fullname }}
                        </th>
                        <th class="text-align--left" style="min-width: 100px; max-width: 150px;">
                            {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.Gender }}
                        </th>
                        <th class="text-align--center" style="min-width: 100px; max-width: 150px;">
                            {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.DateOfBirth }}
                        </th>
                        <th class="text-align--right" style="min-width: 150px; max-width: 200px;">
                            <MISAPopper 
                                hover arrow 
                                :content="this.$_MISAResource['vn-VI'].Tooltip.IdentityNumber"
                            >
                                {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.IdentityNumber }}
                            </MISAPopper>
                        </th>
                        <th class="text-align--left" style="min-width: 150px; max-width: 200px;">
                            {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.PositionName }}
                        </th>
                        <th class="text-align--left" style="min-width: 200px; max-width: 250px;">
                            {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.DepartmentName }}
                        </th>
                        <th class="text-align--right" style="min-width: 120px; max-width: 160px;">
                            {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.BankAccount }}
                        </th>
                        <th class="text-align--left" style="min-width: 140px; max-width: 180px;">
                            {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.BankName }}
                        </th>
                        <th class="text-align--left" style="min-width: 210px; max-width: 260px;">
                            <MISAPopper 
                                hover arrow 
                                :content="this.$_MISAResource['vn-VI'].Tooltip.BankBranch"
                            >
                                {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.BankBranch }}
                            </MISAPopper>
                            
                        </th>
                        <th class="text-align--left last-row" style="min-width: 110px; max-width: 160px;">
                            {{ this.$_MISAResource['vn-VI'].TableEmployee.headerTable.Other }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in this.dataTable" :key="item.EmployeeId" @dblclick="showInfoEmployee(item)">
                        <td class="text-align--center">
                            <input 
                                type="checkbox" 
                                class="checkbox-employee" 
                                :value="item.EmployeeId"
                                v-model="listEmployeeDelete"
                                @dblclick.stop="" 
                            />
                        </td>
                        <td class="text-align--left">{{ item.EmployeeCode }}</td>
                        <td class="text-align--left" >{{ item.FullName }}</td>
                        <td class="text-align--left">{{ changeGender(item.Gender) }}</td>
                        <td class="text-align--center">{{ handleFormatDate(item.DateOfBirth, 2) }}</td>
                        <td class="text-align--right">{{ item.IdentityNumber }}</td>
                        <td class="text-align--left">{{ item.PositionName }}</td>
                        <td class="text-align--left">{{ item.DepartmentName }}</td>
                        <td class="text-align--right">{{ item.BankAccount }}</td>
                        <td class="text-align--left">{{ item.BankName }}</td>
                        <td class="text-align--left">{{ item.BankBranch }}</td>
                        <td class="text-align--left td__edit" :style="{ 'z-index': zIndex - index }">
                            <div @dblclick.stop="">
                                <div>
                                    <button class="btn__edit-employee" @click="showInfoEmployee(item)">{{
                                        this.$_MISAResource['vn-VI'].TableEmployee.Other.Name }}</button>
                                </div>
                                <div>
                                    <div class="icon icon__down-1 show-box-edit"
                                        @click="hanldeShowBoxEdit(item.EmployeeId)"></div>
                                    <div v-click-outside="closeEmployeeAction" class="box-edit"
                                        v-if="idEmployeeClick == item.EmployeeId">
                                        <div @click="hanldeReplicateEmployee(item)">
                                            {{ this.$_MISAResource['vn-VI'].TableEmployee.Other.NameOption.Replication }}
                                        </div>
                                        <div @click="showNotificaDeleteEmployee(item.EmployeeId, item.EmployeeCode)">
                                            {{  this.$_MISAResource['vn-VI'].TableEmployee.Other.NameOption.Delete }}</div>
                                        <div>{{ this.$_MISAResource['vn-VI'].TableEmployee.Other.NameOption.StopUsing }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {formatDate} from "@/js/handledate/formatdate";
// import { APICreateEmployee } from "@/actions/api/employee/apiemployee";

export default {
    name: "MISATableEmployee",
    components: [],
    data() {
        return {
            idEmployeeClick: null,
            employeeSelected: {},
            valueCheckboxAll: [],
            listEmployeeDelete: [],
            checkListEmployee: false,
            employeeReplicate: {}
        }
    },
    props: ["dataTable", 
            "currentPage", 
            "showInfoEmployee", 
            "showNotificaDeleteEmployee", 
            "totalListEmployeeDelete", 
            "checkboxPage", 
            "employeeCodeMax", 
            "loadData",
            "handleAddEmployee"
        ],
    created() {
        this.listEmployeeDelete = this.totalListEmployeeDelete
        this.valueCheckboxAll = this.checkboxPage
    },
    computed: {
        zIndex() {
            return this.dataTable.length
        },
    },
    methods: {
        /**
         * Load lại hai mảng chứ thông tin của danh sách xoá về 0
         */
        updateData() {
            this.listEmployeeDelete = []
            this.valueCheckboxAll = []
        },
        /**
         * Nhân bản nhân viên được chọn
         * @param {*} employee Dữ liệu Employee Cần nhân bản
         * @author dbkhang 05-07-2023
         */
        async hanldeReplicateEmployee(employee) {
            this.handleAddEmployee(employee)
        },

        /**
         * validate giới tính
         * @param {*} gender giới tính của nhân viên dạng 0 1
         */
        changeGender(gender) {
            if (gender == this.$_MISAEnum.Gender.Male) {
                return this.$_MISAResource['vn-VI'].Gender.Male
            } else if (gender == this.$_MISAEnum.Gender.Female) {
                return this.$_MISAResource['vn-VI'].Gender.Female
            } else if (gender == this.$_MISAEnum.Gender.Other) {
                return this.$_MISAResource['vn-VI'].Gender.Other
            }
        },
        /**
         * 
         * @param {*} data dữ liệu thời gian cần format lại
         * @author: dbkhang 06-02-2023
         * @returns dữ liệu thời gian đã được chỉnh sửa
         */
        handleFormatDate(data, isAction) {
            return formatDate(data, isAction)
        },
        /**
         * mở combobox
         * @author: dbkhang 06-02-2023
         */
         hanldeShowBoxEdit(data) {
            this.idEmployeeClick = data
        },

        /**
         * đóng combobox khi click outside
         * @author: dbkhang 06-02-2023
         */
        closeEmployeeAction() {
            this.idEmployeeClick = null
        },
        /**
         * bắt sự kiện bấm vào checkbox tổng
         * @author: dbkhang 06-02-2023
         */
        hanldeCheckboxAll() {
            this.checkListEmployee = true
        },
    },

    watch: {
        /**
         * Bắt việc click vào check box tổng
         * @author dbkhang 05-07-2023
         */
        valueCheckboxAll() {
            // kiểm tra xem mảng đã chứa trang đó chưa
            if (this.valueCheckboxAll.includes(this.currentPage)) {
                // nếu chưa có thì thêm tất cả bản ghi của trang đó vào mảng 
                for (let i = 0; i < this.dataTable.length; i++) {
                    const employeeId = this.dataTable[i].EmployeeId;
                    if (!this.listEmployeeDelete.includes(employeeId)) {
                        this.listEmployeeDelete.push(employeeId)
                    }
                }
            } 
            else {
                //nếu đã có rồi thực hiện xoá bỏ tất cả bản ghi rra khỏi danh sách đánh dấu
                if (this.checkListEmployee) {
                    let arr = []
                    for (let i = 0; i < this.dataTable.length; i++) {
                        const employeeId = this.dataTable[i].EmployeeId;
                        arr = this.listEmployeeDelete.filter(item => item != employeeId) 
                        this.listEmployeeDelete = arr
                    } 
                }
            }
        },

        /**
         * Kiểm tra xem các ô checkbox của trang đó đã được tích hết hay không
         * @author dbkhang 05-07-2023
         */
        listEmployeeDelete() {
            this.checkListEmployee = false
            let totalEmployee = 0;
            //kiểm tra xem trong trang hiện tại có bản ghi nào không được check không
            for (let i = 0; i < this.dataTable.length; i++) {
                if (!this.listEmployeeDelete.includes(this.dataTable[i].EmployeeId)) {
                    //nếu có thì thoát khỏi vòng lặp
                    break;
                } else {
                    //nếu không thì cộng thêm biến đếm 1 
                    totalEmployee = totalEmployee + 1;
                }
            }
            //kiểm tra xem biến đếm có bằng tổng số bản ghi trong trang hay không
            if (totalEmployee == this.dataTable.length) {
                // nếu có thì thêm check tổng vào danh sách
                this.valueCheckboxAll.push(this.currentPage)
            } else {
                //nếu không kiểm tra xem check tổng có trong danh sách chư nếu có thì loại bỏ
                if (this.valueCheckboxAll.includes(this.currentPage)) {
                    const arr = this.valueCheckboxAll.filter(item => item != this.currentPage)
                    this.valueCheckboxAll = arr
                }
                
            }
        },
        
    },
    updated() {
        this.$emit('updateListEmployeeDelete', this.listEmployeeDelete)
    },

}
</script>
<style scoped>
    @import url(@/css/components/table.css);
</style>