//Tạo ra kiểu dữ liệu nhân viên
function NhanVien() {
  this.taiKhoan = "";
  this.hoTen = "";
  this.email = "";
  this.matKhau = "";
  this.ngayLam = "";
  this.luongCB = 0;
  this.chucVu = "";
  this.gioLam = 0;
  // this.tongLuong = 0;
  // this.loaiNhanVien = "";
  this.tongLuong = function () {
    var tongLuong = 0;
    switch (this.chucVu) {
      case "Sếp":
        tongLuong = Number(this.luongCB) * 3;
        break;
      case "Trưởng phòng":
        tongLuong = Number(this.luongCB) * 2;
        break;
      case "Nhân viên":
        tongLuong = Number(this.luongCB);
        break;
    }
    return tongLuong;
  };
  this.loaiNhanVien = function () {
    var loaiNhanVien = "";
    if (this.gioLam >= 192) {
      loaiNhanVien = "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176) {
      loaiNhanVien = "Nhân viên giỏi";
    } else if (this.gioLam >= 160) {
      loaiNhanVien = "Nhân viên khá";
    } else {
      loaiNhanVien = "Nhân viên trung bình";
    }
    return loaiNhanVien;
  };
}
