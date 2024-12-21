import React from "react";
import "../Styles/Poster.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section logo-section">
        <img src="https://png.pngtree.com/png-vector/20241025/ourmid/pngtree-fried-chicken-logo-vector-png-image_14169441.png" alt="Jollibee Logo" className="footer-logo" />
        <p>CÔNG TY TNHH JOLLIBEE VIỆT NAM</p>
        <p>Địa chỉ: Tầng 26, Tòa nhà CJ Tower, số 152 Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam</p>
        <p>Điện thoại: (028) 39309168</p>
        <p>Tổng đài: 1900-1533</p>
        <p>Mã số thuế: 0303883266</p>
        <p>Ngày cấp: 15/07/2008 – Nơi cấp: Cục Thuế Hồ Chí Minh</p>
        <p>Hộp thư góp ý: jbvfeedback@jollibee.com.vn</p>
      </div>
      <div className="footer-section links-section">
        <ul>
          <li> hệ với chúng tôi</li>
          <li>Chính sách và quy định chung</li>
          <li>Chính sách thanh toán khi đặt hàng</li>
          <li>Chính sách hoạt động</li>
          <li>Chính sách bảo mật thông tin</li>
          <li>Thông tin vận chuyển và giao nhận</li>
          <li>Thông tin đăng ký giao dịch chung</li>
          <li>Hướng dẫn đặt phản ánh</li>
        </ul>
      </div>
      <div className="footer-section app-section">
        <p>TẢI ỨNG DỤNG ĐẶT HÀNG VỚI NHIỀU ƯU ĐÃI HƠN</p>
        <div className="app-icons">
          <img src="https://jollibee.com.vn/media/jollibee/logo_playstore.png" alt="Google Play" />
          <img src="https://jollibee.com.vn/media/jollibee/logo_appstore.png" alt="App Store" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
