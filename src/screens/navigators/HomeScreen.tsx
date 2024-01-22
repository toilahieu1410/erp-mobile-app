import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  View,
  Dimensions,
} from 'react-native';
import {Appbar, Avatar, Button, Text} from 'react-native-paper';
import {useAppDispatch} from '../../../store/store';
import {showMessage} from 'react-native-flash-message';
import HomeComponent from '../../components/home/HomeComponent';
import AppHeader from '../../components/navigators/AppHeader';
const HomeScreen = () => {
  const windowHeight = Dimensions.get('window').height;
  const ds = Dimensions.get('window').height;
  const aspectRatioImage = (uri: string) => {
    Image.getSize(uri, (width, height) => {
      return width / height;
    });
  };
  // const dispatch = useAppDispatch();
  // const LogoutScreen = () => {
  //   dispatch(logout())
  //     .unwrap()
  //     .then(res => {
  //       showMessage({
  //         type: 'success',
  //         position: 'top',
  //         message: 'Đăng xuất thành công',
  //       });
  //     })
  //     .catch((err: BaseResponse) => {
  //       Alert.alert('Thất bại', err.message);
  //     });
  // };
  const List = {
    data: {
      data: [
        {
          ID: 74,
          Content:
            '<p>&nbsp;</p><p style="text-align:center;"><strong>Số: 2112202301/TB-HL</strong></p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;">----------------</p><p>&nbsp;</p><p style="text-align:right;"><i>Hà Nội, ngày 21 tháng 12 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><i><strong>(V/v hướng dẫn cách kiểm tra tình trạng voucher mua sắm tại GIGA.vn và cách kiểm tra sản phẩm GIGA.vn theo giá nội bộ)</strong></i></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong> &nbsp;Kính gửi: </strong>Toàn thể CBNV,</p><p>&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp;Để thuận tiện cho CBNV Hợp Long có nhu cầu mua sắm sản phẩm của GIGA.vn phân phối, HR xin gửi hướng dẫn cách kiểm tra tình trạng voucher mua sắm tại GIGA.vn và cách kiểm tra sản phẩm GIGA.vn theo giá nội bộ. Cụ thể như sau:</p><p>&nbsp;</p><ol><li><strong>Cách kiểm tra tình trạng voucher mua sắm tại GIGA.vn trên phần mềm ERP:</strong></li></ol><ul><li>&nbsp;</li><li>- Bước 1: Đăng nhập https:// sales.hoplong.com bằng tài khoản ERP của Anh/Chị</li><li>&nbsp;</li><li>- Bước 2: Click chọn tác vụ “Lương”, chọn “Danh sách voucher” và nhập mã xác thực</li></ul><p>&nbsp;</p><figure class="image"><img src="https://filesckeditor.hoplong.com/image(13929).png"></figure><p>&nbsp;</p><p>&nbsp;</p><figure class="image"><img src="https://filesckeditor.hoplong.com/image(13930).png"></figure><p>&nbsp;</p><p>&nbsp;</p><ol><li><strong>Cách kiểm tra sản phẩm GIGA.vn theo giá nội bộ:</strong></li></ol><ul><li>&nbsp;</li><li>- Bước 1: Đăng nhập https://gigadigital.vn/tai-khoan/erp bằng tài khoản ERP của Anh/Chị</li><li>&nbsp;</li><li>- Bước 2: Giao diện hiện giá sản phẩm nội bộ =&gt; mua hàng liên hệ Dũng Bé Tí - Dũng HA (SĐT/Zalo: 0397.109.592)</li><li>&nbsp;</li></ul><p><strong>*Lưu ý: không đặt đơn trực tiếp trên web nội bộ</strong></p><p>&nbsp;</p><figure class="image"><img src="https://filesckeditor.hoplong.com/image(13931).png"></figure><figure class="image"><img src="https://filesckeditor.hoplong.com/image(13932).png"></figure><p>&nbsp;</p><p>&nbsp;</p><ol><li><strong>Điều kiện sử dụng voucher mua sắm tại GIGA.vn:</strong></li><li>&nbsp;</li><li>1. Áp dụng 1 đơn hàng/nhiều voucher</li><li>&nbsp;</li><li>2. Không giới hạn số tiền trên đơn hàng</li><li>&nbsp;</li><li>3. Voucher không quy đổi thành tiền mặt</li><li>&nbsp;</li><li>4. Voucher có thể gộp với các voucher khác, tùy chương trình.</li><li>&nbsp;</li><li>5. Giá áp dụng giá nội bộ trên web gigadigital.vn</li><li>&nbsp;</li><li>6. Giao hàng - lắp đặt liên hệ Dũng HA</li><li>&nbsp;</li><li>7. Đặt hàng thông qua Dũng Bé Tí - Dũng HA - 0397109592</li><li>&nbsp;</li></ol><p>&nbsp;</p><p>&nbsp;</p><p><i><strong>Nơi nhận:</strong></i></p><ul><li><i>- CBNV Hợp Long;</i></li><li><i>- Lưu HCNS;</i></li></ul><p style="text-align:center;"><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p><p><br>&nbsp;</p>',
          CreateByUserID: 17,
          CreatedAt: '23/12/2023 10:36',
          PostType: 'Thông báo nội bộ',
          Title:
            'Thông báo hướng dẫn cách kiểm tra tình trạng voucher và cách kiểm tra sản phẩm GIGA.vn theo giá nội bộ',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          FullNameUserCreate: 'Lâm Thị Hiền',
        },
        {
          ID: 9,
          Content:
            '<figure class="image image_resized image-style-align-center" style="width:24.52%;"><img src="https://drive.google.com/uc?id=1H7TING4L5MJ6JhIV9VXjbTzTO6sGmMv1"></figure><p>&nbsp;</p><p style="text-align:center;"><strong>QUY ĐỊNH VỀ VIỆC SỬA ĐỔI QUY CHẾ LƯƠNG, THƯỞNG, PHỤ CẤP</strong></p><p style="text-align:center;"><strong>SỐ 230821/QĐ-HL NGÀY 23/08/2021</strong></p><ul><li style="text-align:justify;"><i>Căn cứ Bộ luật lao động số 45/2019/QH14 ban hành ngày 20/11/2019;</i></li><li style="text-align:justify;"><i>Căn cứ Nghị định số 145/2020/NĐ-CP ban hành ngày 14/12/2020 về việc quy định chi tiết và hướng dẫn thi hành một số nội dung của bộ luật Lao động;</i></li><li style="text-align:justify;"><i>Căn cứ tình hình hoạt động thực tế của Công ty;</i></li></ul><p style="text-align:justify;"><strong>Điều 1: Sửa đổi bổ sung nội dung về “bố trí phương tiện đi lại thăm hỏi của chế độ hiếu hỉ” - Quy định tại Khoản 18.1. Chế độ hiếu hỉ, Điều 18 Chế độ hiếu hỉ, sinh nhật, lễ tết, ốm đau, Quy chế lương, thưởng, phụ cấp số 230821/QĐ-HL ngày 23/08/2021 như sau:</strong></p><ul><li style="text-align:justify;">Bố trí phương tiện đi lại cho việc hiếu hỉ:</li></ul><p style="text-align:center;"><strong>Trường hợp được hưởng</strong></p><p style="text-align:center;"><strong>Chế độ được hưởng</strong></p><p style="text-align:justify;">Người được hưởng chế độ giữ chức vụ từ <strong>trưởng phòng </strong>trở lên</p><ul><li style="text-align:justify;">Được phòng HCNS hỗ trợ điều động xe của Công ty hoặc thuê xe của đối tác để tổ chức thăm hỏi, tham dự việc hiếu hỉ (trích kinh phí từ quỹ Công ty) nếu nơi tổ chức, thăm hỏi của việc hiếu hỉ có bán kính từ <strong>15 km</strong> trở lên tính từ trụ sở văn phòng công ty (tính theo biên chế địa điểm làm việc của người lao động).</li></ul><p style="text-align:justify;">Các trường hợp còn lại</p><ul><li style="text-align:justify;">Không được hưởng hỗ trợ.</li></ul>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 14:23',
          PostType: 'Thông báo thường',
          Title:
            'Thông báo ban hành Quy chế lương, thưởng, phụ cấp năm 2023- ok',
          UpdatedAt: '2023-12-04T15:13:54.067',
          Avatar:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          ThumbnailURL:
            'https://drive.google.com/uc?id=1slZKmKDk8CT2ts8_CATeiqPRVDTx_nNv',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 8,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 11,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 13,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 15,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 17,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 19,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 21,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 23,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 25,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 27,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 29,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 31,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
        {
          ID: 33,
          Content:
            '<figure class="image image_resized image-style-align-left" style="width:26.3%;"><img src="https://filesckeditor.hoplong.com/image-20231117111333-1.jpeg"></figure><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;"><i>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Hà Nội, ngày 16 tháng 11 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;"><i><strong>(V/v tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội)</strong></i></p><p>Team HR xin gửi tới toàn thể cán bộ nhân viên Công ty thông báo về thời gian và địa điểm tổ chức lễ Thành hôn của <i><strong>Mrs. Dương Thanh Hằng – bộ phận Kinh doanh, Hà Nội</strong></i> và chú rể Phạm Thanh Bình.</p><p>Thông tin cụ thể như sau:</p><ol><li><i><strong>Thời gian tham dự:</strong></i> 11h30p, Thứ 3 ngày 21 tháng 11 năm 2023.</li><li><i><strong>Địa điểm tổ chức:</strong></i> Cung văn hóa lao động Hữu nghị Việt Xô.</li><li><i><strong>Danh sách đăng ký:</strong></i> Mọi người vui lòng đăng kí với Mrs. Hằng - HR theo thông báo đã có</li></ol><p>Chúc mọi người có chuyến đi vui vẻ.</p><p>Chúc Anh Chị trăm năm hạnh phúc!</p><p>&nbsp;</p><p><i><strong>Lưu ý:</strong></i></p><p><i>CBNV không tham gia sẽ kết thúc thời gian làm việc theo đúng quy định.</i></p><p><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p>',
          CreateByUserID: 12,
          CreatedAt: '04/12/2023 11:28',
          PostType: 'Đám cưới',
          Title:
            'Thông báo tham dự lễ Thành hôn của Mrs. Dương Thanh Hằng - Bộ phận Kinh doanh, Hà Nội',
          UpdatedAt: null,
          Avatar:
            'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
          ThumbnailURL:
            'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
          FullNameUserCreate: 'Lâm Văn Đức',
        },
      ],
      totalPage: 68,
      pageSize: 15,
      pageNumber: 1,
      isMore: true,
    },
    isSuccess: true,
    isFail: false,
    statusCode: 200,
    message: null,
  };
  return (
    <SafeAreaView className="flex-1">
      <AppHeader title="Bảng tin" centerTitle={true}></AppHeader>
      <View className="flex-1">
        <View>
          <Image
            source={{
              uri: 'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
            }}
            style={{
              width: '100%',
              resizeMode: 'contain',
              flex: 1,
              aspectRatio: 1,
            }}
          />
        </View>
        <FlatList
          data={List.data.data}
          keyExtractor={item => item.ID.toString()}
          ref={ref => {
            //@ts-ignore
            this.flatListRef = ref;
          }}
          initialNumToRender={15}
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                <HomeComponent
                  avatar={item.Avatar}
                  useCreate={item.FullNameUserCreate}
                  dateCreate={item.CreatedAt}
                  title={item.Title}
                  thumbnail={item.ThumbnailURL}
                />
              </View>
            );
          }}
          ItemSeparatorComponent={props => {
            return (
              <View
                className="bg-gray-300"
                style={{
                  height: 8,
                }}
              />
            );
          }}
          // onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          // ListFooterComponent={
          //   loadMore ? (
          //     <ActivityIndicator size="large" color={COLOR_FOCUS_NAV} />
          //   ) : isMore == false ? (
          //     <Text className="text-center h-7">
          //       Tổng cộng {totalPageSize} bài viết.
          //     </Text>
          //   ) : null
          // }
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          // }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
