// Union type: sản phẩm chỉ thuộc 1 trong 3 loại
type LoaiSanPham = "ao" | "quan" | "phukien";

// interface mô tả hình dạng 1 sản phẩm
interface SanPham {
    ten: string;
    gia: number; // đơn vị: đồng
    tonKho: number; // số lượng còn trong kho
    loai: LoaiSanPham;
}

const khoSanPham: SanPham[] = [
    { ten: "Áo thun Neko", gia: 150000, tonKho: 12, loai: "ao" },
    { ten: "Quần Jean", gia: 350000, tonKho: 0, loai: "quan" },
    { ten: "Mũ lưỡi trai", gia: 80000, tonKho: 5, loai: "phukien" },
    { ten: "Áo khoác dù", gia: 500000, tonKho: 3, loai: "ao" },
];

function timSanPham(ten: string): SanPham | undefined {
    const chuanHoaTen = ten.trim().toLowerCase();
    
    for (const sp of khoSanPham) {
        if (sp.ten.toLowerCase() === chuanHoaTen) {
            return sp;
        }
    }
    return undefined;
}

// console.log(timSanPham("  áo THUN neko ")?.ten);
// console.log(timSanPham("không có"));


function phanLoaiGia(gia: number): string {
    if (gia < 100000) {
        return "Rẻ";
    } else if (gia < 400000) {
        return "Trung bình";
    } else {
        return "Đắt";
    }
}

// console.log(phanLoaiGia(80000));
// console.log(phanLoaiGia(150000));
// console.log(phanLoaiGia(500000));

function tinhTrangKho(sp: SanPham): string {
    if (sp.tonKho === 0) {
        return "HẾT HÀNG";
    } else {
        return `Còn ${sp.tonKho} sản phẩm`;
    }
}

//console.log(tinhTrangKho(khoSanPham[1]));

function tongGiaTriKho(): number {
    let tong = 0;
    for (const sp of khoSanPham) {
        tong += sp.gia * sp.tonKho;
    }

    return tong;
}

//console.log("Tổng giá trị kho:", tongGiaTriKho());
 
function inDanhSach(): void {
    for (const sp of khoSanPham) {
        const tenLoai = sp.loai === "ao" ? "Áo" : sp.loai === "quan" ? "Quần" : "Phụ kiện";
        console.log(`${sp.ten} [${tenLoai}] - ${sp.gia}d - ${phanLoaiGia(sp.gia)} - ${tinhTrangKho(sp)}`);
    }
} 

//inDanhSach();


                ///////// BÀI 2 /////////
type XepLoai = "Gioi" | "Kha" | "TrungBinh" | "Yeu";

interface HocVien {
    readonly id: number; // không cho phép sửa sau khi tạo
    hoTen: string;
    diem: number[]; // điểm các môn
    email?: string; // optional: có thể không có
}

const danhSach: HocVien[] = [
    { id: 1, hoTen: "  nguyễn văn an ", diem: [8, 9, 7], email: "an@neko.vn" },
    { id: 2, hoTen: "Trần thị Bình", diem: [5, 6, 6] },
    { id: 3, hoTen: "LÊ VĂN CƯỜNG", diem: [3, 4, 5], email: "cuong@neko.vn" },
    { id: 4, hoTen: "Phạm Thị Dung", diem: [10, 9, 10] },
];

function chuanHoaTen(ten: string): string {
    const cleanTen = ten.trim().toLowerCase().replace(/(?:^|\s)\S/g, char => char.toUpperCase());
    return cleanTen; 
}

//console.log(chuanHoaTen("  nguyễn văn an ")); // Nguyễn Văn An

function diemTrungBinh(hv: HocVien): number {
    const diems = hv.diem;
    let tongDiem = 0;
    for (const diem of diems) {
        tongDiem += diem;
    }
    const dtb = tongDiem / diems.length;
    return Number(dtb.toFixed(1));
}

//console.log(diemTrungBinh(danhSach[1]));

function xepLoai(diemTB: number): XepLoai {
    if (diemTB >= 8.5) {
        return 'Gioi';
    } else if (diemTB >= 6.5) {
        return 'Kha';
    } else if (diemTB >= 5) {
        return 'TrungBinh';
    } else {
        return 'Yeu';
    }
}

//console.log(xepLoai(8));
//console.log(xepLoai(4));

function timTheoEmail(email: string): HocVien | undefined {
    const cleanEmail = email.trim().toLowerCase();
    
    for (const hv of danhSach) {
        if (hv.email?.toLowerCase() === cleanEmail) {
            return hv;
        }
    }
    return undefined;
}

// console.log(timTheoEmail("  AN@neko.vn ")?.id); // 1
// console.log(timTheoEmail("khong@co.vn")); // undefined

function inBangDiem(): void {
    let xepLoaiHv = ''
    for (const hv of danhSach)  {
        if (xepLoai(diemTrungBinh(hv)) === "Gioi") {
            xepLoaiHv = 'Giỏi'
        } else if (xepLoai(diemTrungBinh(hv)) === "Kha") {
            xepLoaiHv = 'Khá';
        } else if (xepLoai(diemTrungBinh(hv)) === "TrungBinh") {
            xepLoaiHv = 'Trung bình';
        } else {
            xepLoaiHv = 'Yếu';
        }
        console.log(`${chuanHoaTen(hv.hoTen)} - TB: ${diemTrungBinh(hv)} - ${xepLoaiHv}`);
    }
}

//inBangDiem();