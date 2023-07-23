const MISAResource = {
    "vn-VI": {
        // dung trong sidebar
        SideBae: {
            KeToan: "Kế toán",
            TongQuan: "Tổng quan",
            TienMat: "Tiền mặt",
            TienGui: "Tiền gửi",
            MuaHang: "Mua hàng",
            BanHang: "Bán hàng",
            QLDH: "Quản lý hoá đơn",
            Kho: "Kho",
            CCDC: "Công cụ dụng cụ",
            TSCD: "Tài sản cố định",
            Thue: "Thuế",
            GiaThanh: "Giá Thành",
            TongHop: "Tổng hợp",
            NganSach: "Ngân sách",
            BaoCao: "Báo cáo",
            PhanTich: "Phan tích"
        },
        TableEmployee: {
            headerTable: {
                EmployeeCode: "MÃ NHÂN VIÊN",
                Fullname: "TÊN NHÂN VIÊN",
                Gender: "GIỚI TÍNH",
                DateOfBirth: "NGÀY SINH",
                IdentityNumber: "SỐ CMND",
                PositionName: "CHỨC DANH",
                DepartmentName: "TÊN ĐƠN VỊ",
                BankAccount: "SỐ TÀI KHOẢN",
                BankName: "TÊN NGÂN HÀNG",
                BankBranch: "CHI NHÁNH TK NGÂN HÀNG",
                Other: "CHỨC NĂNG"
            },
            Other: {
                Name: "Sửa",
                NameOption: {
                    Replication: "Nhân bản",
                    Delete: "Xoá",
                    StopUsing: "Ngừng sử dụng"
                }
            },
            Pading: " bản ghi trên 1 trang",
        },

        Tooltip: {
            Notifica: "Thông báo",
            Reload: "Tải lại trang",
            IconClose: "Đóng",
            Help: "Trợ giúp",
            BankBranch: "Chi nhánh tài khoản ngân hàng",
            IdentityNumber: "Số chứng minh nhân dân",
            PhoneNumber: "Điện thoại di động",
            TelephoneNumber: "Điện thoại cố định",
            Excel: "Xuất file Excel"
        },

        Button: {
            AddEmployee: "Thêm nhân viên",
            Cancel: "Huỷ",
            Save: "Cất",
            SaveAdd: "Cất và thêm",
            No: "Không",
            Yes: "Có",
            Agree: "Đồng ý"
        },
        PageEmployee: {
            Title: "Nhân viên",
            PlaceholderSearch: "Tìm theo mã, tên nhân viên",
            Bottom: {
                Total: "Tổng số:",
                Record: "bản ghi",
                NumberRecordsPage: "Số bản ghi/trang:",
                Page: "Trang:"
            }
        },
        FormEmployee: {
            EditTitle: "Chỉnh sửa thông tin nhân viên",
            AddTitle: "Thêm nhân viên mới",
            LabelInput: {
                EmployeeCode: "Mã",
                FullName: "Tên",
                DepartmentName: "Đơn vị",
                PositionName: "Chức danh",
                DateOfBirth: "Ngày sinh",
                Gender: "Giới tính",
                IdentityNumber: "Số CMND",
                IdentityDate: "Ngày cấp",
                IdentityPlace: "Nơi cấp",
                Address: "Địa chỉ",
                PhoneNumber: "Đt di động",
                TelephoneNumber: "ĐT cố định",
                Email: "Email",
                BankAccount: "Tài khoản ngân hàng",
                BankName: "Tên ngân hàng",
                BankBranch: "Chi nhánh"
            },
            placeholder: {
                EmployeeCode: "",
                FullName: "",
                DepartmentName: "",
                PositionName: "",
                DateOfBirth: "",
                Gender: "",
                IdentityNumber: "",
                IdentityDate: "",
                IdentityPlace: "",
                Address: "",
                PhoneNumber: "",
                TelephoneNumber: "",
                Email: "example@gmail.com",
                BankAccount: "",
                BankName: "",
                BankBranch: ""
            }
        },
        Gender: {
            Male: "Nam",
            Female: "Nữ",
            Other: "Khác"
        },
        Errors: {
            EmployeeCodeRequired: "Mã nhân viên không được để trống",
            EmployeeCodeMaxLength: "Mã nhân viên không được quá 20 kí tự",
            FullNameRequired: "Tên nhân viên không được để trống",
            FullNameMaxLength: "Tên nhân viên không được quá 225 kí tự",
            DepartmentNameRequired: "Tên đơn vị không được để trống",
            Email: "Vui lòng nhập email đúng quy định",
            Address: "Địa chỉ không được quá 255 kí tự",
            BankBranch: "Chi nhánh ngân hàng không được quá 255 kí tự",
            BankName: "Tên ngân hàng không được quá 255 kí tự",
            BankAccount: "Tài khoản không được quá 25 kí tự",
            IdentityPlace: "Nơi cấp không được quá 100 kí tự",
            DateMax: "Ngày phải nhỏ hơn ngày hiện tại",
            DateMin: "Ngày phải lớn hơn ngày 01/01/1900"
        },
        ToastMessage: {
            AddEmployee: "Thêm nhân viên",
            EditEmployee: "Chỉnh sửa nhân viên",
            Replicate: "Nhân bản",
            DeleteEmployee: "Xoá nhân viên"
        },
        Dialog: {
            Title: "Thông báo",
            TitleError: "Thông báo lỗi",
            ContentDelete: "Thông báo xoá thành viên",
            ContentClickX: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
            DeleteMultiple: "các thành viên được chọn"
        },
        ActionMultiple: {
            Title: "Thực hiện hàng loạt",
            Delete: "Xoá"
        },
        Pagination: {
            Prew: "Trước",
            After: "Sau"
        }
    }
}

export default MISAResource