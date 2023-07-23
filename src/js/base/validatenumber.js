
/**
 * định dạng lại số
 * @param {*} num số cần định dạng
 * @returns số đã được định dạng lại thêm dấu phẩy
 */
function addCommas(num) {
    //C1:
    // var formatted = num.toLocaleString('en-US');
    // return formatted;
    //C2
    // Chuyển số thành chuỗi
    var str = num.toString();
    // Tìm kiếm và thay thế các nhóm ba chữ số bằng chúng kèm theo dấu phẩy
    var regex = /(\d+)(\d{3})/;
    while (regex.test(str)) {
      str = str.replace(regex, '$1' + ',' + '$2');
    }
    // Trả về chuỗi đã định dạng
    return str;
}

export { addCommas }