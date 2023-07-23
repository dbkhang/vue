import moment from "moment";

/**
 * 
 * @param {*} data dữ liệu thời gian cần format lại
 * @author: dbkhang 06-02-2023
 * @returns dữ liệu thời gian đã được chỉnh sửa
 */
export const formatDate = (dateValue, isAction) => {
    try {
        let date = new Date(dateValue);
        let dateString = date.getDate();
        let monthString = date.getMonth() + 1;
        let yearString = date.getFullYear();
        if (dateString < 10) {
        dateString = "0" + dateString;
        }
        if (monthString < 9) {
        monthString = "0" + monthString;
        }
        if (isAction == 1) {
            return `${yearString}-${monthString}-${dateString}`
        } else {
            return `${dateString}/${monthString}/${yearString}`;
        }
    } catch (error) {
        console.log(error);
        return "";
    }
}

export const filterDateFormat = (value, format) => {
    if (!value) return "";
    
    return moment(value).format(format);
  }

// export default formatDate