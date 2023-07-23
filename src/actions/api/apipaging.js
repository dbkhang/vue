

export const APIPaging = async (pageSize, offSet, textsearch) => {
    try {
        let res = await fetch(`https://localhost:44397/api/v1/Employees/filter?pageSize=${pageSize}&pageNumber=${offSet}&employeeFilter=${textsearch}`);
        if (res.status === 200) {
            let dataTable = await res.json()
            return dataTable
        } else if (res.status === 204) {
            return 1
        } else {
            console.log('Lỗi tải dữ liệu' ,res);
            return {}
        }
    } catch (error) {
        console.log(error);
        return {}
    } 
}

export default APIPaging;