import axios from "axios";

/**
 * Phân trang tìm kiếm
 * @param {*} pageSize số lượng bản ghi trong một trang
 * @param {*} offSet số thứ tự của trang
 * @param {*} textsearch từ cần tìm kiếm
 * @returns các bản ghi
 */
const APIPaging = async (pageSize, offSet, textsearch) => {
    try {
        let res = await axios.get(`https://localhost:44397/api/v1/Employees/filter?pageSize=${pageSize}&pageNumber=${offSet}&employeeFilter=${textsearch}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

/**
 * call API để taoj nhân viên theo
 * @author: dbkhang 06-02-2023
 * @returns thêm nhân viên vào bảng và render
 */
const APICreateEmployee = async (data) => {
    let res = await axios.post("https://localhost:44397/api/v1/Employees", data)
    return res
    // try {
    //     let res = await axios.post("https://localhost:44397/api/v1/Employees", data)
    //     if (res.status === 201) {
    //         return res.data
    //     } 
        
    // } catch (error) {
    //     return error.response.data.Errors;
    // }
    
}

/**
 * call API để sửa thông tin nhân viên theo
 * @author: dbkhang 06-02-2023
 * @returns sửa thông tin nhân viên vào bảng và render
 */
const APIEditEmployee = async (id, data) => {
    let res = await axios.put(`https://localhost:44397/api/v1/Employees/${ id }`, data)
    return res
    // try {
    //     let res = await axios.put(`https://localhost:44397/api/v1/Employees/${ id }`, data)
    //     if (res.status === 200) {
    //         return res.data
    //     } 
        
    // } catch (error) {
    //     console.log(error);
    //     if (error.response.status === 400 ) {
    //         return error.response.data.Errors
    //     }
    // }
    
}

/**
 * call API để xoá nhân viên theo
 * @author: dbkhang 06-02-2023
 * @returns dữ liệu bảng nhân viên
 */
const APIDeleteEmployee = async (id) => {
    let res = await axios.delete(`https://localhost:44397/api/v1/Employees/${ id }`)
    return res
    // try {
    //     let res = await axios.delete(`https://localhost:44397/api/v1/Employees/${ id }`)
    //     // .catch(error => console.log(error))
        
    //     if (res.status === 200) {
    //         return res.data
    //     }
        
    
    // } catch (error) {
    //     console.log(error);
    // }
    
}

/**
 * Xoá nhiều thành viên
 * @param {*} data danh sachs id của nhân viên cần xoá
 * @returns 
 * @author: dbkhang(05-07-2023)
 */
const APIDeleteEmployeeMultiple = async (data) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    let res = await axios.delete("https://localhost:44397/api/v1/Employees/deletemultiple", {
        headers: headers,
        data: data
    });
    return res;
}

const APIGetMaxEmployeeCode = async () => {
    let res = await axios.get("https://localhost:44397/api/v1/Employees/maxemployeecode")
    return res
}

const APIExportExcel = async () => {
    let res = await axios.get("https://localhost:44397/api/v1/Employees/export" , { responseType: 'blob' })
    // console.log(res);
    return res
}

export { APIPaging, APICreateEmployee, APIDeleteEmployee, APIEditEmployee, APIDeleteEmployeeMultiple, APIGetMaxEmployeeCode, APIExportExcel };