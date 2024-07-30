export const formatNumber = number => {
  if (number == undefined || number == null) {
    return 0;
  } else {
    return number.toLocaleString('en-US'); // Định dạng số với dấu phẩy
  }
};

export const formatDateTime = isoDateString => {
  const date = new Date(isoDateString);
  const minutes = date.getMinutes.toString();
  const hour = date.getHours.toString();
  const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm số 0 ở đầu nếu cần
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm số 0 ở đầu nếu cần
  const year = date.getFullYear();
  return `${hour}:${minutes} ${day}/${month}/${year}`;
};
