/**
 * Hàm nhận vào 2 tham số và trả về kết quả true hoặc false. True khi hợp lệ và false khi không hợp lệ
 * @param {*} value Giá trị đầu vào
 * @param {*} selectorError Nơi in ra lỗi
 * @param {*} name là text hiển thị ra tên trường bị lỗi
 * @returns
 */

function kiemTraRong(value, selectorError, name) {
  //.trim(): Loại bỏ khoảng trống đầu và cuối của chuỗi
  //   abc    => abc
  if (value.trim() !== "") {
    document.querySelector(selectorError).innerHTML += "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không được bỏ trống";
  document.querySelector(selectorError).style.display = "block";
  return false;
}

function kiemTraTatCaKyTu(value, selectorError, name) {
  var regexLetter =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  if (regexLetter.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = name + " tất cả là chữ ! ";
  document.querySelector(selectorError).style.display = "block";
  return false;
}

function kiemTraEmail(value, selectorError, name) {
  var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regexEmail.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không đúng định dạng ! ";
  document.querySelector(selectorError).style.display = "block";
  return false;
}

function kiemTraDoDai(value, selectorError, name, minLength, maxLength) {
  var lengthValue = value.length;
  if (lengthValue > maxLength || lengthValue < minLength) {
    document.querySelector(selectorError).innerHTML +=
      name + " từ " + minLength + " đến " + maxLength + " ký tự. ";
    document.querySelector(selectorError).style.display = "block";
    document.querySelector("#tknv").style.borderColor = "red";
    rgba(0, 0, 0, 0.2);
    return false;
  }
  document.querySelector(selectorError).innerHTML += "";
  document.querySelector("#tknv").style.borderColor = "rgba(0,0,0,.2)";
  return true;
}

function kiemTraMatKhau(value, selectorError, name, minLength, maxLength) {
  var regexPassWord =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
  var lengthValue = value.length;
  if (
    !regexPassWord.test(value) ||
    lengthValue > maxLength ||
    lengthValue < minLength
  ) {
    document.querySelector(selectorError).innerHTML =
      name +
      " từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    document.querySelector(selectorError).style.display = "block";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function kiemTraTrungLap(value, selectorError, name) {
  var indexDup = mangNhanVien.findIndex(
    (nhanvien) => nhanvien.taiKhoan === value
  );
  if (indexDup !== -1) {
    document.querySelector(selectorError).innerHTML = name + " đã tồn tại";
    document.querySelector(selectorError).style.display = "block";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function kiemTraNgay(value, selectorError, name) {
  var regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (regexDate.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không đúng định dạng ngày ! ";
  document.querySelector(selectorError).style.display = "block";
  return false;
}

function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {
  value = Number(value);
  if (value > maxValue || value < minValue) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minValue + " đến " + maxValue + " ";
    document.querySelector(selectorError).style.display = "block";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function kiemTraHopLe(value, selectorError, name) {
  if (value === "Chọn chức vụ") {
    document.querySelector(selectorError).innerHTML = name + " không hợp lệ ";
    document.querySelector(selectorError).style.display = "block";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  // document.querySelector(selectorError).style.display = "none";
  return true;
}

function sortUp(arrNhanVien) {
  arrNhanVien.sort((a, b) => {
    var la = a.taiKhoan.toLowerCase();
    var lb = b.taiKhoan.toLowerCase();
    if (la < lb) {
      return -1;
    }
    if (la > lb) {
      return 1;
    }
  });
}

function sortDn(arrNhanVien) {
  arrNhanVien.sort((a, b) => {
    var la = a.taiKhoan.toLowerCase();
    var lb = b.taiKhoan.toLowerCase();
    if (la < lb) {
      return 1;
    }
    if (la > lb) {
      return -1;
    }
  });
}
