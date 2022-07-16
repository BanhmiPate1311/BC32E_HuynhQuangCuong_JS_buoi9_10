document.addEventListener("contextmenu", (event) => event.preventDefault()); //Khóa chuột

var mangNhanVien = []; // [{},{},{}];

//Gọi hàm lấy localstorage khi trang vừa load
window.onload = function () {
  //Browser vừa load lên làm gì thì sẽ code ở đây
  layLocalStorage();
};

function luuLocalStorage() {
  //Biến đổi mảng thành string
  var sMangNhanVien = JSON.stringify(mangNhanVien);
  //Sau đó dùng string lưu vào localstorage
  localStorage.setItem("mangNhanVien", sMangNhanVien);
}

function layLocalStorage() {
  //check xem storage có dữ liệu đó hay không
  if (localStorage.getItem("mangNhanVien")) {
    //Lấy ra
    var sMangNhanVien = localStorage.getItem("mangNhanVien");
    //Lấy mangNhanVien gán = chuỗi được lấy từ LocalStorage ra (phải chuyển về JSON.parse để chuyển về mảng lại)
    mangNhanVien = JSON.parse(sMangNhanVien);
    //Tạo ra table nhân viên trong mảng
    renderTableNhanVien(mangNhanVien);
  }
}

/* ---------- Validation ---------- */
const form = document.querySelector("#infor");

form.addEventListener("input", function (e) {
  switch (e.target.id) {
    case "tknv":
      checkTaiKhoan();
      break;
    case "name":
      checkHoTen();
      break;
    case "email":
      checkEmail();
      break;
    case "password":
      checkPassword();
      break;
    case "datepicker":
      checkNgayLam();
      break;
    case "luongCB":
      checkLuongCB();
      break;
    case "chucvu":
      checkChucVu();
      break;
    case "gioLam":
      checkGioLam();
      break;
  }
});

function checkTaiKhoan() {
  var value = document.querySelector("#tknv").value;
  var valid = true;
  valid &=
    kiemTraTrungLap(value, "#tbTKNV", "Tài khoản") &
    kiemTraDoDai(value, "#tbTKNV", "Tài khoản", 4, 6) &
    kiemTraRong(value, "#tbTKNV", "Tài khoản");
  return valid;
}

function checkHoTen() {
  var value = document.querySelector("#name").value;
  var valid = true;
  valid &=
    kiemTraTatCaKyTu(value, "#tbTen", "Họ và tên") &
    kiemTraRong(value, "#tbTen", "Họ và tên");
  return valid;
}

function checkEmail() {
  var value = document.querySelector("#email").value;
  var valid = true;
  valid &=
    kiemTraEmail(value, "#tbEmail", "Email") &
    kiemTraRong(value, "#tbEmail", "Email");
  return valid;
}

function checkPassword() {
  var value = document.querySelector("#password").value;
  var valid = true;
  valid &=
    kiemTraMatKhau(value, "#tbMatKhau", "Mật khẩu", 6, 10) &
    kiemTraRong(value, "#tbMatKhau", "Mật khẩu");
  return valid;
}

function checkNgayLam() {
  var value = document.querySelector("#datepicker").value;
  var valid = true;
  valid &=
    kiemTraNgay(value, "#tbNgay", "Ngày làm") &
    kiemTraRong(value, "#tbNgay", "Ngày làm");
  return valid;
}

function checkLuongCB() {
  var value = document.querySelector("#luongCB").value;
  var valid = true;
  valid &=
    kiemTraGiaTri(value, "#tbLuongCB", "Lương cơ bản", 1000000, 20000000) &
    kiemTraRong(value, "#tbLuongCB", "Lương cơ bản");
  return valid;
}

function checkChucVu() {
  var value = document.querySelector("#chucvu").value;
  var valid = true;
  valid &= kiemTraHopLe(value, "#tbChucVu", "Chức vụ");
  return valid;
}

function checkGioLam() {
  var value = document.querySelector("#gioLam").value;
  var valid = true;
  valid &=
    kiemTraGiaTri(value, "#tbGiolam", "Giờ làm", 80, 200) &
    kiemTraRong(value, "#tbGiolam", "Giờ làm");
  return valid;
}

document.querySelector("#btnThem").onclick = function () {
  resetform();
  resetTb();
  //Mở lại tài khoản nhân viên
  document.querySelector("#tknv").disabled = false;
  //Ẩn nút Cập nhật
  document.querySelector("#btnCapNhat").style.display = "none";
  //Hiện lại button thêm người dùng
  document.querySelector("#btnThemNV").style.display = "block";
};

document.querySelector("#btnThemNV").onclick = function () {
  //input: thông tin nhân viên
  //Tạo đối tượng
  var nv = new NhanVien();
  //   console.log(nv);
  //Mở lại nút tài khoản
  document.querySelector("#tknv").disabled = false;
  //Lấy thông tin input từ người dùng
  nv.taiKhoan = document.querySelector("#tknv").value;
  nv.hoTen = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.matKhau = document.querySelector("#password").value;
  nv.ngayLam = document.querySelector("#datepicker").value;
  // var ngayLam = document.querySelector("#datepicker").value;

  // nv.ngayLam = moment(ngayLam).format("DD/MM/YYYY");
  nv.luongCB = document.querySelector("#luongCB").value;
  nv.chucVu = document.querySelector("#chucvu").value;
  nv.gioLam = document.querySelector("#gioLam").value;
  //   console.log(nv);

  //Kiểm tra dữ liệu nhân viên có hợp lệ hay không?
  var valid = true; // mặc định form là hợp lệ

  valid &=
    checkTaiKhoan() &
    checkHoTen() &
    checkEmail() &
    checkPassword() &
    checkNgayLam() &
    checkLuongCB() &
    checkChucVu() &
    checkGioLam();

  if (!valid) {
    document.querySelector("#btnThemNV").removeAttribute("data-dismiss");
    return;
  }

  //Mỗi lần bấm thêm nhân viên sẽ đưa object nhân viên vào mangNhanVien
  mangNhanVien.push(nv);
  console.log("mangNhanVien", mangNhanVien);
  //Gọi hàm từ mảng nhân viên tạo ra html cho table
  renderTableNhanVien(mangNhanVien);
  //Gọi hàm  lưu mảng nhân viên vào localstorage
  luuLocalStorage();
  resetform();
  document.querySelector("#btnThemNV").setAttribute("data-dismiss", "modal");
};

function resetform() {
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "Chọn chức vụ";
  document.querySelector("#gioLam").value = "";
}

function resetTb() {
  document.querySelector("#tbTKNV").innerHTML = "";
  document.querySelector("#tbTen").innerHTML = "";
  document.querySelector("#tbEmail").innerHTML = "";
  document.querySelector("#tbMatKhau").innerHTML = "";
  document.querySelector("#tbNgay").innerHTML = "";
  document.querySelector("#tbLuongCB").innerHTML = "";
  document.querySelector("#tbChucVu").innerHTML = "";
  document.querySelector("#tbGiolam").innerHTML = "";
}

function renderTableNhanVien(arrNhanVien) {
  var html = "";
  //           0                  1                    2
  // [{maNhanVien:1,...}, {maNhanVien:2,...}, {maNhanVien:3,...},...]
  for (index = 0; index < arrNhanVien.length; index++) {
    //Mỗi lần duyệt lấy ra 1 nhân viên
    var nv = arrNhanVien[index];
    //Bổ sung phương thức tính tổng lương cho object nhân viên
    nv.tongLuong = function () {
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
    //Bổ sung phương thức xếp loại cho object nhân viên
    nv.loaiNhanVien = function () {
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
    //Tạo ra 1 chuỗi html tr và đưa vào output
    html += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong()}</td>
            <td>${nv.loaiNhanVien()}</td>
            <td><button class = "btn btn-danger" onclick="xoaNhanVien('${
              nv.taiKhoan
            }')">Xóa</button>
            <button class = "btn btn-primary mt-2" onclick="chinhSua('${
              nv.taiKhoan
            }')" data-toggle="modal"
            data-target="#myModal">Sửa</button></td>
        </tr>
    `;
  }
  document.querySelector("#tableDanhSach").innerHTML = html;
  return html;
}

function xoaNhanVien(taiKhoanClick) {
  console.log(mangNhanVien);
  var indexDel = mangNhanVien.findIndex(
    (nhanvien) => nhanvien.taiKhoan == taiKhoanClick
  );
  mangNhanVien.splice(indexDel, 1);
  //Gọi hàm tạo lại table sau khi xóa
  renderTableNhanVien(mangNhanVien);
  //Gọi hàm  lưu mảng nhân viên vào localstorage
  // luuLocalStorage();
}

function chinhSua(taiKhoanClick) {
  resetTb();
  //Mở lại button cập nhật
  document.querySelector("#btnCapNhat").style.display = "block";
  //Khóa lại button thêm người dùng
  document.querySelector("#btnThemNV").style.display = "none";
  var indexEdit = mangNhanVien.findIndex(
    (nhanvien) => nhanvien.taiKhoan === taiKhoanClick
  );
  //Lấy ra thông tin nhân viên tại vị trí đó
  var nvEdit = mangNhanVien[indexEdit];
  //Khóa lại tài khoản nhân viên
  document.querySelector("#tknv").disabled = true;
  //Gán các giá trị lên giao diện
  document.querySelector("#tknv").value = nvEdit.taiKhoan;
  document.querySelector("#name").value = nvEdit.hoTen;
  document.querySelector("#email").value = nvEdit.email;
  document.querySelector("#password").value = nvEdit.matKhau;
  document.querySelector("#datepicker").value = nvEdit.ngayLam;
  document.querySelector("#luongCB").value = nvEdit.luongCB;
  document.querySelector("#chucvu").value = nvEdit.chucVu;
  document.querySelector("#gioLam").value = nvEdit.gioLam;
}

document.querySelector("#btnCapNhat").onclick = function () {
  //Lấy dữ liệu người dùng thay đổi trên giao diện
  var nv = new NhanVien();
  //Lấy thông tin input từ người dùng:
  nv.taiKhoan = document.querySelector("#tknv").value;
  nv.hoTen = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.matKhau = document.querySelector("#password").value;
  nv.ngayLam = document.querySelector("#datepicker").value;
  nv.luongCB = document.querySelector("#luongCB").value;
  nv.chucVu = document.querySelector("#chucvu").value;
  nv.gioLam = document.querySelector("#gioLam").value;
  var valid = true; // mặc định form là hợp lệ

  //Kiểm tra dữ liệu nhân viên có hợp lệ hay không
  valid &=
    checkHoTen() &
    checkEmail() &
    checkPassword() &
    checkNgayLam() &
    checkLuongCB() &
    checkChucVu() &
    checkGioLam();

  if (!valid) {
    document.querySelector("#btnCapNhat").removeAttribute("data-dismiss");
    return;
  }
  //Tìm vị trí nhân viên trong mảng cần sửa chữa
  var indexEdit = mangNhanVien.findIndex(
    (nhanVien) => nhanVien.taiKhoan === nv.taiKhoan
  );
  //Lấy nhân viên trong mảng thay đổi thành thông tin trên giao diện mà người dùng edit
  // mangNhanVien[indexEdit].taiKhoan =
  mangNhanVien[indexEdit].hoTen = nv.hoTen;
  mangNhanVien[indexEdit].email = nv.email;
  mangNhanVien[indexEdit].matKhau = nv.matKhau;
  mangNhanVien[indexEdit].ngayLam = nv.ngayLam;
  mangNhanVien[indexEdit].luongCB = nv.luongCB;
  mangNhanVien[indexEdit].chucVu = nv.chucVu;
  mangNhanVien[indexEdit].gioLam = nv.gioLam;
  //Tạo lại bảng nhân viên mới sau khi thay đổi
  renderTableNhanVien(mangNhanVien);
  document.querySelector("#btnCapNhat").setAttribute("data-dismiss", "modal");
  //Gọi hàm  lưu mảng nhân viên vào localstorage
  luuLocalStorage();
};

//Chức năng search
document.querySelector("#btnTimNV").onclick = function () {
  //Lấy giá trị search do người dùng chọn
  var loaiNVSearch = document.querySelector("#searchName").value;
  //Tạo máng mới chưa danh sách nhân viên đã sắp xếp
  var mangNVSearch = [];
  //Duyệt mảng nhân viên tìm nhân viên theo yêu cầu
  for (index = 0; index < mangNhanVien.length; index++) {
    var nv = mangNhanVien[index].loaiNhanVien();
    if (nv === loaiNVSearch) {
      var nhanVienSearch = mangNhanVien[index];
      mangNVSearch.push(nhanVienSearch);
    }
  }
  if (mangNVSearch.length === 0) {
    if (loaiNVSearch !== "Tất cả nhân viên") {
      document.querySelector("#tableDanhSach").innerHTML = `
      <tr>
          <td colspan="8">Khum tồn tại người như thế này nha</td>          
      </tr>
  `;
    } else {
      renderTableNhanVien(mangNhanVien);
    }
  } else {
    renderTableNhanVien(mangNVSearch);
  }
};
