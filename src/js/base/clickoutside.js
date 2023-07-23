// const clickOutSide = {
//     mounted(el, binding) {
//         console.log(el);
//         el.clickOutsideEvent = function(event) {

//             if (
//                 !(
//                     el.previousSibling == event.target ||
//                     el === event.target ||
//                     el.contains(event.target)
//                 )
//             ) {
//                 binding.value(event, el);
//             }
//         };
//         document.body.addEventListener('click', el.clickOutsideEvent);
//     },
//     unmounted(el) {
//         document.body.removeEventListener('click', el.clickOutsideEvent);
//     }
// }
// export default clickOutSide


const clickOutside = {
    mounted(el, binding) {
        el.clickOutsideEvent = function (event) {
            if (
                !(
                    el.previousSibling === event.target ||
                    el === event.target ||
                    el.contains(event.target)
                )
            ) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    },
};

export default clickOutside;