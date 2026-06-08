function chuanHoaTen(ten) {
    return ten
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
}

function phanTichDon(don) {
    const [ten, soLuong] = don.trim().split("x")    
    return {
        ten: chuanHoaTen(ten),
        soLuong: Number(soLuong),
    }
}

const KHO_HANG = {
  "Áo Thun": { gia: 150000, tonKho: 10 },
  "Quần Jean": { gia: 350000, tonKho: 5 },
  "Giày Sneaker": { gia: 800000, tonKho: 3 },
  "Mũ": { gia: 90000, tonKho: 0 },
};

const donHang1 = ["  áo thun x2 ", "Quần Jean x1", "MŨ x1"]; // hợp lệ, "Mũ" hết hàng
const donHang2 = ["Áo thun x1", "Điện thoại x1"]; // có sản phẩm không tồn tại

// ----- Hàm giả lập gọi API lấy giá + tồn kho 1 sản phẩm -----
function layThongTinSanPham(ten) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tt = KHO_HANG[ten];
      if (!tt) {
        reject(`Sản phẩm "${ten}" không tồn tại trong hệ thống!`);
      } else {
        resolve({ ten, ...tt });
      }
    }, 800);
  });
}

async function tinhTienGioHang(donHang) {
    try {
        console.log(`Bắt đầu tính tiền giỏ hàng...`);
        console.log(`Phân tích ${donHang.length} dòng đơn hàng...`);

        const phanTich = donHang.map((don) => phanTichDon(don));
        console.log(`Tải thông tin ${phanTich.length} sản phẩm...`);
            
        const thongTin = await Promise.all(
            phanTich.map((item) => layThongTinSanPham(item.ten))
        );

        const chiTiet = thongTin.map((item, index) => {
            const soLuong = phanTich[index].soLuong;
            const thanhTien = item.gia * soLuong;
            return {
                ...item,
                soLuong,
                thanhTien,
            };
        });

        chiTiet.forEach((item) => {
            if (item.tonKho < item.soLuong) {
                console.log(`   Bỏ "${item.ten}" - chỉ còn ${item.tonKho}, cần ${item.soLuong}`);
            }
        });

        const sanPhamHopLe = chiTiet.filter((item) => item.tonKho >= item.soLuong);

        sanPhamHopLe.forEach((item) => {
            console.log(`   ${item.ten} x ${item.soLuong} = ${item.thanhTien.toLocaleString("vi-VN")}đ`);
        });

        let tamTinh = 0;
        for (const sanPham of sanPhamHopLe) {
            tamTinh += sanPham.thanhTien;
        }

        console.log(`Tạm tính: ${tamTinh.toLocaleString("vi-VN")}đ`);

        let phanTramGiam = 0;
        let uuDaiText = "";
        
        if (tamTinh >= 1000000) {
            phanTramGiam = 15;
            uuDaiText = " đơn từ 1.000.000";
        } else if (tamTinh >= 500000) {
            phanTramGiam = 10;
            uuDaiText = "đơn từ 500.000";
        } else if (tamTinh >= 200000) {
            phanTramGiam = 5;
            uuDaiText = "đơn từ 200.000";
        }

        const tienGiam = (tamTinh * phanTramGiam) / 100;

        if(phanTramGiam > 0) {
            console.log(`Ưu đãi: giảm ${phanTramGiam}% (${uuDaiText}) -${tienGiam.toLocaleString("vi-VN")}đ`);
        }

        const thanhTien = tamTinh - tienGiam;
        console.log(`Thành tiền: ${thanhTien.toLocaleString("vi-VN")}đ`);
    } catch(error) {
        console.log(error);
    } finally {
        console.log("Kết thúc tính tiền.");
    }
}

//tinhTienGioHang(donHang1)


                                        //////// BÀI 2 ////////
function xepLoai(doanhThu) {
    if (doanhThu >= 200000000) {
        return `Xuất sắc`;
    } else if (doanhThu >= 100000000) {
        return `Đạt chỉ tiêu`;
    } else if (doanhThu > 0) {
        return `Cần cải thiện`;
    } else {
        return `Không có doanh thu`;
    }
}

const CHI_NHANH = [
  { ten: "Hà Nội", doanhThu: 120000000, thoiGian: 1500, thanhCong: true },
  { ten: "Đà Nẵng", doanhThu: 0, thoiGian: 2000, thanhCong: false },
  { ten: "TP.HCM", doanhThu: 250000000, thoiGian: 2500, thanhCong: true },
];

// ----- Hàm giả lập tải doanh thu 1 chi nhánh -----
function taiDoanhThuChiNhanh(ten, doanhThu, thoiGian, thanhCong = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (thanhCong) {
        resolve({ chiNhanh: ten, doanhThu });
      } else {
        reject(`Chi nhánh ${ten} mất kết nối!`);
      }
    }, thoiGian);
  });
}

async function tongHopBaoCao() {
    console.log(`Đang tổng hợp báo cáo từ các chi nhánh...`);
    try {
        const tatCaChiNhanh = await Promise.allSettled((CHI_NHANH.map((chiNhanh) => {
            return taiDoanhThuChiNhanh(
                chiNhanh.ten,
                chiNhanh.doanhThu,
                chiNhanh.thoiGian,
                chiNhanh.thanhCong,
            );
        })));

        const chiNhanhThanhCong = tatCaChiNhanh.filter(chiNhanh => chiNhanh.status === "fulfilled");
        const chiNhanhThatBai = tatCaChiNhanh.filter(chiNhanh => chiNhanh.status === "rejected");

        chiNhanhThatBai.forEach(chiNhanh => {
            console.log(`   [LỖI] ${chiNhanh.reason}`);
        })

        chiNhanhThanhCong.forEach(chiNhanh => {
            console.log(`   ${chiNhanh.value.chiNhanh}: ${chiNhanh.value.doanhThu.toLocaleString("vi-VN")}đ - ${xepLoai(chiNhanh.value.doanhThu)}`);
        })

        let tongDoanhThu = 0;
        for (const chiNhanh of chiNhanhThanhCong) {
            tongDoanhThu += chiNhanh.value.doanhThu;
        }
        
        console.log(`Tổng doanh thu: ${tongDoanhThu.toLocaleString("vi-VN")}đ`);

        const chiNhanhCoDoanhThuCao = chiNhanhThanhCong.reduce((chiNhanhCaoNhat, chiNhanhHienTai) => {
            return chiNhanhHienTai.value.doanhThu > chiNhanhCaoNhat.value.doanhThu ? chiNhanhHienTai : chiNhanhCaoNhat
        }, chiNhanhThanhCong[0])

        console.log(`Chi nhánh dẫn đầu: ${chiNhanhCoDoanhThuCao.value.chiNhanh} (${chiNhanhCoDoanhThuCao.value.doanhThu.toLocaleString("vi-VN")}đ)`);

        const xepLoaiDoanhThu = chiNhanhThanhCong.map((chiNhanh) => {
            return `${chiNhanh.value.chiNhanh} (${xepLoai(chiNhanh.value.doanhThu)})`
        })        

        console.log(`Xếp loại: ${xepLoaiDoanhThu.join(", ")}`);

        if (chiNhanhThatBai.length > 0) {
            console.log(`${chiNhanhThanhCong.length}/${CHI_NHANH.length} chi nhánh thành công (${chiNhanhThatBai.length} gặp sự cố).`);
        } else {
            console.log(`${chiNhanhThanhCong.length}/${CHI_NHANH.length} chi nhánh thành công.`);
        }
    } catch(error) {
        console.log(error)
    } finally {
        console.log("Hoàn tất tổng hợp báo cáo.")
    }
}

tongHopBaoCao();