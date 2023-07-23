import axios from "axios";

/**
 * Lấy các tên đơn vị
 * @returns Các đơn vị 
 * @author: dbkhang 02-07-2023
 */
const APIGetAllDepartment = async () => {
    try {
        let res = await axios.get("https://localhost:44397/api/v1/Departments")
        return res;
    } catch (error) {
        console.log(error);
    }
}

export { APIGetAllDepartment };