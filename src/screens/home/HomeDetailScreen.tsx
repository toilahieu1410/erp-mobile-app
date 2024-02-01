import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import RenderHTML from 'react-native-render-html';

const HomeDetailScreen = () => {
  const data = {
    ID: 74,
    Content:
      '<p style="text-align:center;"><strong>Số: 2112202301/TB-HL</strong></p><p style="text-align:center;"><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></p><p style="text-align:center;"><i><strong><u>Độc lập - Tự do - Hạnh phúc</u></strong></i></p><p style="text-align:center;">----------------</p><p>&nbsp;</p><p style="text-align:right;"><i>Hà Nội, ngày 21 tháng 12 năm 2023.</i></p><p>&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>THÔNG BÁO</strong></p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><i><strong>(V/v hướng dẫn cách kiểm tra tình trạng voucher mua sắm tại GIGA.vn và cách kiểm tra sản phẩm GIGA.vn theo giá nội bộ)</strong></i></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong> &nbsp;Kính gửi: </strong>Toàn thể CBNV,</p><p>&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp;Để thuận tiện cho CBNV Hợp Long có nhu cầu mua sắm sản phẩm của GIGA.vn phân phối, HR xin gửi hướng dẫn cách kiểm tra tình trạng voucher mua sắm tại GIGA.vn và cách kiểm tra sản phẩm GIGA.vn theo giá nội bộ. Cụ thể như sau:</p><p>&nbsp;</p><ol><li><strong>Cách kiểm tra tình trạng voucher mua sắm tại GIGA.vn trên phần mềm ERP:</strong></li></ol><ul><li>&nbsp;</li><li>- Bước 1: Đăng nhập https:// sales.hoplong.com bằng tài khoản ERP của Anh/Chị</li><li>&nbsp;</li><li>- Bước 2: Click chọn tác vụ “Lương”, chọn “Danh sách voucher” và nhập mã xác thực</li></ul><p>&nbsp;</p><figure class="image"><img src="https://filesckeditor.hoplong.com/image(13929).png"></figure><p>&nbsp;</p><p>&nbsp;</p><figure class="image"><img src="https://filesckeditor.hoplong.com/image(13930).png"></figure><p>&nbsp;</p><p>&nbsp;</p><ol><li><strong>Cách kiểm tra sản phẩm GIGA.vn theo giá nội bộ:</strong></li></ol><ul><li>&nbsp;</li><li>- Bước 1: Đăng nhập https://gigadigital.vn/tai-khoan/erp bằng tài khoản ERP của Anh/Chị</li><li>&nbsp;</li><li>- Bước 2: Giao diện hiện giá sản phẩm nội bộ =&gt; mua hàng liên hệ Dũng Bé Tí - Dũng HA (SĐT/Zalo: 0397.109.592)</li><li>&nbsp;</li></ul><p><strong>*Lưu ý: không đặt đơn trực tiếp trên web nội bộ</strong></p><p>&nbsp;</p><figure class="image"><img src="https://filesckeditor.hoplong.com/image(13931).png"></figure><figure class="image"><img src="https://filesckeditor.hoplong.com/image(13932).png"></figure><p>&nbsp;</p><p>&nbsp;</p><ol><li><strong>Điều kiện sử dụng voucher mua sắm tại GIGA.vn:</strong></li><li>&nbsp;</li><li>1. Áp dụng 1 đơn hàng/nhiều voucher</li><li>&nbsp;</li><li>2. Không giới hạn số tiền trên đơn hàng</li><li>&nbsp;</li><li>3. Voucher không quy đổi thành tiền mặt</li><li>&nbsp;</li><li>4. Voucher có thể gộp với các voucher khác, tùy chương trình.</li><li>&nbsp;</li><li>5. Giá áp dụng giá nội bộ trên web gigadigital.vn</li><li>&nbsp;</li><li>6. Giao hàng - lắp đặt liên hệ Dũng HA</li><li>&nbsp;</li><li>7. Đặt hàng thông qua Dũng Bé Tí - Dũng HA - 0397109592</li><li>&nbsp;</li></ol><p>&nbsp;</p><p>&nbsp;</p><p><i><strong>Nơi nhận:</strong></i></p><ul><li><i>- CBNV Hợp Long;</i></li><li><i>- Lưu HCNS;</i></li></ul><p style="text-align:center;"><strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ HỢP LONG</strong></p><p><br>&nbsp;</p>',
    CreateByUserID: 17,
    CreatedAt: '23/12/2023 10:36',
    PostType: 'Thông báo nội bộ',
    Title:
      'Thông báo hướng dẫn cách kiểm tra tình trạng voucher và cách kiểm tra sản phẩm GIGA.vn theo giá nội bộ',
    UpdatedAt: null,
    Avatar: 'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
    ThumbnailURL:
      'https://drive.google.com/uc?id=110HiUrNM1T7PbtyG-kZzXJl9-HCFx2ZI',
    FullNameUserCreate: 'Lâm Thị Hiền',
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader title="Chi tiết bảng tin" showButtonBack={true}></AppHeader>
      <ScrollView>
        <View>
          <View>
            <Image
              source={{uri: data.Avatar}}
              style={{
                width: '100%',
                aspectRatio: 16 / 9,
                objectFit: 'contain',
              }}
            />
          </View>
        </View>
        <View>
          <View
            className="w-full rounded-t-[24px] p-2 z-20  bg-white shadow-md"
            style={{
              shadowColor: '#000000',
              shadowOffset: {width: 4, height: 13},
              shadowOpacity: 0.3,
              shadowRadius: 40,
              elevation: 10,
            }}>
            <RenderHTML
              contentWidth={Dimensions.get('screen').width}
              baseStyle={{color: 'black'}}
              source={{html: data.Content}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeDetailScreen;
