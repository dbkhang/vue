/**
 * Hàm download file Excel
 * @param {*} res dữ liệu phản hồi nhận được khi callAPI
 * @param {*} fileName Tên file muốn tải về
 * @author dbkhang
 */
export const downloadFile = (res, fileName) => {
  //tạo đường dẫn URl để tải file
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;

  link.setAttribute("download", fileName);
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
};