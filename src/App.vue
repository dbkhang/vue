<template>
  <div class="content">
      <TheSidebar></TheSidebar>
      <div class="content__right">
          <TheHeader></TheHeader>
          <TheMain></TheMain>
      </div>
  </div>
</template>

<script>
import TheHeader from '@/layout/TheHeader.vue';
import TheMain from '@/layout/TheMain.vue';
import TheSidebar from '@/layout/TheSidebar.vue';

export default {
  name: 'App',
  components: {
    TheHeader, TheMain, TheSidebar
    // sdsd
  }
}
</script>

<style>
  @import url(@/css/main.css);
  @import url(@/css/theme/themetooltip.css);
</style>
