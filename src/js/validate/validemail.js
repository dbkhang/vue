/**
 * 
 * @param {*} email tài khoản email cần kiểm tra
 * @author: dbkhang 16-06-2023
 * @returns true khi email đúng form và ngược lại
 */
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
}

export default isValidEmail