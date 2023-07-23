<template>
    <div class="right__top">
        <div class="right__top-left">
            <div class="icon icon__menu-2"></div>
            <span>CÔNG TY SẢN XUẤT - THƯƠNG MAI - DỊCH VỤ QUI PHÚC</span>
            <div class="icon icon__down"></div>
        </div>
        <div class="right__top-right">
            <MISAPopper 
                hover arrow 
                :content="this.$_MISAResource['vn-VI'].Tooltip.Notifica"
            >
                <div class="icon icon__notification" ></div>
            </MISAPopper>
            <div class="right__top-right__user">
                <div class="icon icon__avatar" tooltip = "'aaaaaa'"></div>
                <span>
                    Nguyễn Văn Mạnh
                </span>
                <div class="icon icon__down"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"TheHeader",
    components: {

    },
    methods:{

    }
}
</script>
<style scoped>
    @import url(@/css/layout/theheader.css);
    @import url(@/css/global/variable.css);
</style>