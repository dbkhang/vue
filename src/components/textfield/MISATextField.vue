<template>
    <div :class="classTextField">
        <MISAPopper 
            hover arrow 
            :content="tooltip"
        >
            <label class="textfield__label">
                {{ label }},
                <span v-if="inputRequired" class="icon__required">*</span>
            </label>
            
        </MISAPopper>
        
        <div :class="classInput">
            <Field
                :name="name"
                v-model="value" 
                @change="changeInput"
                v-slot="{ field, errors }"
                validateOnInput
            >
                <input 
                    :class="{'input-invalid': errors.length > 0}" 
                    :placeholder="placeholder" 
                    :type="type" 
                    v-bind="field" 
                    ref="inputRef"
                    :min="type === 'date' ? min : null"
                    :max="type === 'date' ? max : null"
                    validate-on="blur"
                    autocomplete="off"
                />
            </Field>
            <ErrorMessage class="errors-message" :name="name" />
        </div>
    </div>
</template>

<script>

import { Field, ErrorMessage } from 'vee-validate';

export default {
    name:"MISATextField",
    components: { Field, ErrorMessage },
    data() {
        return {
            value: "",
            classInput: "",
            classTextField: "",
            valueEmployeeCodeMaxState: "",
            checkEmployeeCodeMaxState: ""
        }
    },
    props: {
        name: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
        errors: {
            type: Object,
            default: () => {},
        },
        placeholder: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        classtf: {
            type: String,
            default: ""
        },
        valueInput: {
            type: String,
            default: ""
        },
        tooltip: {
            type: String,
            default: ""
        },
        updateEmployeeCodeMax: {
            type: String,
            default: ""
        },
        inputRequired: {
            type: String,
            default: ""
        },
        min: {
            type: String,
            // default: ""
        },
        max: {
            type: String,
            // default: ""
        },
    },
    created() {
        this.value = this.valueInput
        this.classTextField = this.classtf + " textfield"
    },
    methods:{
        /**
         * hàm truyền dữ liệu được thay đổi lên components cha
         * @author: dbkhang 06/08/2023
         */
        changeInput() {
            this.$emit('updateDataInput', this.value)
        },
        /**
         * focus vào input tương ứng
         * @author: dbkhang 06/08/2023
         */
        focusInput() {
            this.$refs.inputRef.focus();
        },
    },
    computed: {
        /**
         * bắt lấy lỗituowng ứng
         * @author: dbkhang 06/08/2023
         */
        messageError() {
            if (this.errors && this.errors[this.name]) {
                return this.errors[this.name]
            }
            return null;
        },
    },
    watch: {
        /**
         * thêm employeeCode max cho các nhân viên được tạo mới
         * @author: dbkhang 06/08/2023
         */
        updateEmployeeCodeMax() {
            this.value = this.updateEmployeeCodeMax
        },
        
    },
    updated() {
        /**
         * thêm employeeCode max cho các nhân viên được tạo mới
         * @author: dbkhang 06/08/2023
         */
        if (this.updateEmployeeCodeMax != "" && this.checkEmployeeCodeMaxState != this.updateEmployeeCodeMax) {
            this.value = this.updateEmployeeCodeMax
            this.checkEmployeeCodeMaxState = this.updateEmployeeCodeMax
        }
    }

}
</script>
<style scoped>
    @import url(./textfield.css);
</style>