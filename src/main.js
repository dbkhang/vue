import { createApp } from 'vue'
import App from './App.vue'
import MISAButton from './components/button/MISAButton.vue'
import MISADialog from './components/dialog/MISADialog.vue'
import MISACombobox from './components/combobox/MISACombobox.vue'
import MISAToastMessage from './components/toastmessage/MISAToastMessage.vue'
import MISAInput from './components/input/MISAInput.vue'
import MISATextField from './components/textfield/MISATextField.vue'
import clickOutside from '@/js/base/clickoutside.js'
import vueRouter from "./router/router.js"
import MISATinyEmitter from 'tiny-emitter/instance'
import MISAResource from "@/js/base/resource";
import MISAEnum from "@/js/base/enum";
import Popper from "vue3-popper";

const app = createApp(App)

app.component("MISAButton", MISAButton)
app.component("MISADialog", MISADialog)
app.component("MISAInput", MISAInput)
app.component("MISACombobox", MISACombobox)
app.component("MISATextField", MISATextField)
app.component("MISAToastMessage", MISAToastMessage)
app.component("MISAPopper", Popper)
app.directive("click-outside", clickOutside)
app.use(vueRouter)
app.config.globalProperties.MISATinyEmitter = MISATinyEmitter
app.config.globalProperties.$_MISAResource = MISAResource
app.config.globalProperties.$_MISAEnum = MISAEnum
app.mount('#app') 

