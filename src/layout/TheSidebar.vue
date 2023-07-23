<template>
    <div class="side-bar">
        <div class="side-bar__top">
            <div class="icon icon__menu-1"></div>
            <div class="icon icon__logo"></div>
            <span>{{ this.$_MISAResource['vn-VI']['SideBae']['KeToan'] }}</span>
        </div>
        <div class="side-bar__main">
            <ul>
                <li>
                    <router-link to="/employee" class="sidebar__router">
                        <div class="icon icon__tq"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['TongQuan'] }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__tm"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['TienMat'] }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__tg"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['TienGui'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__mh"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['MuaHang'] }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__bh"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['BanHang'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__qlhd"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['QLDH'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__k"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['Kho'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__ccdc"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['CCDC'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__tscd"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['TSCD'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__t"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['Thue'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__gt"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['GiaThanh'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__th"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['TongHop'] }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__ns"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['NganSach'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__bc"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['BaoCao'] }}</span>
                    </router-link>
                    
                </li>
                <li>
                    <router-link to="/customer" class="sidebar__router">
                        <div class="icon icon__pttc"></div>
                        <span>{{ this.$_MISAResource['vn-VI']['SideBae']['PhanTich'] }}</span>
                    </router-link>
                    
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"TheSidebar",
    components: {

    },
    methods:{

    }
}
</script>
<style scoped>
    @import url(@/css/layout/thesidebar.css);
</style>