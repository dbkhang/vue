<template>
    <div>
        <MISAFlatPickerInputDate 
            name="DateOfBirth"
            v-model="date"
            label="Ngày sinh"
        />
    </div>
</template>
<script>
import MISAFlatPickerInputDate from '@/components/flatpickerinputdate/MISAFlatPickerInputDate.vue'

export default {
    name: "PageCustomer",
    data() {
        return {
            mes: "xoá thành công",
            date: "12/02/2023"
        }
    },
    components: { MISAFlatPickerInputDate },
    mounted() {
        // setTimeout(()=>{
        //     this.mes=true
        // },1000)
    }
}
</script>

<style scoped>
</style>