<template>
    <label class="label">
        {{ label }}
        <span v-if="inputRequired" class="icon__required">*</span>
    </label>
    
    <div class="combobox">
        <Field
            v-model="textSearch" 
            :name="name"
            v-slot="{ field, errors }"
            validateOnInput
        >
            <input 
                @keydown="inputOnKeyDown"
                @input="onInputSearch"
                class="combobox__input" 
                :class="{'input-invalid': errors.length > 0}" 
                type="text" 
                v-bind="field" 
                :placeholder="this.$_MISAResource['vn-VI'].FormEmployee.placeholder.DepartmentName"
                autocomplete="off"
            />
        </Field>
        <button type="button" class="combobox__button" @click="() => showList = !showList" tabindex="-1">
            <div class="icon icon__down"></div>
        </button>
        
        <div class="combobox__data" v-show="showList">
            <div 
                class="combobox__item"
                :class="{'combobox__item--selected': index == indexSelected}"
                @click="onSelectItem(item)"
                v-for="(item, index) in allDepartment" 
                :key="index"
            >{{ item[this.name] }}</div>
        </div>
    </div>
    <ErrorMessage class="errors-message" :name="name" />
</template>
<script>
// import debounce from "lodash.debounce"
import { Field, ErrorMessage } from 'vee-validate';

export default {
    name: "MISACombobox",
    components: { Field, ErrorMessage },
    emits: ["updateDataCombobox"],
    props: ["allDepartment", "name", "label", "valueInput", "errors", "inputRequired"],
    data() {
        return {
            items: [],
            showList: false,
            itemSelected: {},
            textSearch: "",
            indexSelected: 0,
        }
    },
    created() {
        this.textSearch = this.valueInput
        // this.itemsFilter = this.allDepartment
    },
    computed: {
        itemsFilter() {
            return this.allDepartment
        },
        messageError() {
            if (this.errors && this.errors[this.name]) {
                return this.errors[this.name]
            }
            return null;
        }
    },
    methods: {
        /**
         * hàm chọn đơn vị khi bấm chuột vào danh sách
         * @param {*} item item được chọn
         * @author: dbkhang 06/08/2023
         */
        onSelectItem(item) {
            //gán giá trị
            this.itemSelected = item
            this.textSearch = this.itemSelected[this.name]
            //tắt list đơn vị
            this.showList = false
            //chuyền dữ liệu lên components cha
            this.$emit('updateDataCombobox', item.DepartmentId)
        },
        /**
         * tìm kiếm đơn vị theo tên
         * @param {*} e sự kiện bấm chữ cái
         * @author: dbkhang 06/08/2023
         */
        onInputSearch(e) {
            //bắt giá trị của phím vừa bấm
            const value = e.target.value
            //tìm kiếm trên danh sách các đơn vị
            this.itemsFilter = this.items.filter(item => 
                item[this.name].includes(value)
            )
            //hiển thị kết quả phù hợp
            this.textSearch = value
            this.showList = true
        },
        /**
         * hàm bắt sự kiện bấm các nút điều hướng lên xuống ddeer chọn đơn vị
         * @param {*} e sự kiện bấm nút
         * @author: dbkhang 06/08/2023
         */
        inputOnKeyDown(e) {
            //kiểm tra xem danh sách có trống ko
            const maxLength = this.itemsFilter.length;
            if (maxLength == 0) {
                return 
            } else {
                // bắt sự kiện bấm nút mũi tên xuống
                if (e.keyCode == this.$_MISAEnum.keyCode.UpKey) {
                    if (this.indexSelected < maxLength - 1) {
                        this.indexSelected++
                    }
                    // bắt sự kiện bấm nút mũi tên lên
                } else if (e.keyCode == this.$_MISAEnum.keyCode.DownKey) {
                    if (this.indexSelected > 0) {
                        this.indexSelected--
                        
                    }
                    // bắt sự kiện bấm nút Enter để chọn
                } else if (e.keyCode == this.$_MISAEnum.keyCode.Enter) {
                    this.itemSelected = this.itemsFilter[this.indexSelected]
                    this.textSearch = this.itemSelected[this.name]
                    this.showList = false
                    this.$emit('updateDataCombobox', this.itemSelected.DepartmentId)
                }
            }
        }

    },
    // computed: {
    //     messageError() {
    //         if (this.errors && this.errors[this.name]) {
    //             return this.errors[this.name]
    //         }
    //         return null;
    //     }
    // },
}
</script>
<style scoped>
    @import url(./combobox.css);
</style>