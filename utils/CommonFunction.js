export const fomatNumber = number => {
  if (number == undefined || number == null) {
    return 0;
  } else {
    return number.toLocaleString('en-US'); // Định dạng số với dấu phẩy
  }
};

export const formatDate = isoDateString => {
  if (
    isISOString(isoDateString) == false ||
    isoDateString == null ||
    isoDateString.length == 0
  ) {
    return null;
  } else {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm số 0 ở đầu nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm số 0 ở đầu nếu cần
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};

const isISOString = dateString => {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return isoRegex.test(dateString);
};
