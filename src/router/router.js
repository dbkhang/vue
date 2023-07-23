import { createRouter, createWebHistory } from 'vue-router';
import EmployeeList from '@/page/EmployeeList.vue';
import PageCustomer from '@/page/Customer.vue';


// Định nghĩa các routers
const routers = [
    { path:"/", component: EmployeeList, name: "HomeRouter" },
    { path:"/employee", component: EmployeeList, name: "EmployseeRouter" },
    { path:"/customer", component: PageCustomer, name: "CustomerRouter" },
]

// khởi tạo vue router:
const vueRouter = createRouter ({
    history :createWebHistory(),
    routes: routers
})

export default vueRouter