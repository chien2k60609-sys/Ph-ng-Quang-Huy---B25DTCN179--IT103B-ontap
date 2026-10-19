let bookings = [
    {
        bookingCode: "CIN-001",
        customerName: "Nguyễn Văn An",
        movieTitle: "Ánh Trăng Cuối Phố",
        ticketCount: 2,
        pricePerTicket: 90000,
        totalAmount: 194400
    },
    {
        bookingCode: "CIN-002",
        customerName: "Trần Thị Bình",
        movieTitle: "Biệt Đội Sao Băng",
        ticketCount: 4,
        pricePerTicket: 90000,
        totalAmount: 349920
    },
    {
        bookingCode: "CIN-003",
        customerName: "Lê Minh Châu",
        movieTitle: "Mùa Hè Rực Lửa",
        ticketCount: 6,
        pricePerTicket: 110000,
        totalAmount: 641520
    }
];

function formatMoney(amount) {
    return amount.toLocaleString("vi-VN") + " VNĐ";
}

function normalizeName(name) {
    let words = name.trim().toLowerCase().split(/\s+/);
    let result = "";
    for (let i = 0; i < words.length; i++) {
        result += words[i].charAt(0).toUpperCase() + words[i].slice(1);
        if (i < words.length - 1) {
            result += " ";
        }
    }
    return result;
}

function validateBookingCode(code) {
    if (code === "") {
        return "Chưa nhập mã đặt vé";
    }
    if (code.length < 6) {
        return "Độ dài nhỏ hơn 6 ký tự";
    }
    if (!code.startsWith("CIN-")) {
        return 'Sai tiền tố "CIN-"';
    }
    if (code.includes(" ")) {
        return "Mã đặt vé chứa khoảng trắng";
    }
    return "";
}

function findBookingIndex(code) {
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].bookingCode === code) {
            return i;
        }
    }
    return -1;
}

function inputPositiveInteger(message) {
    while (true) {
        let input = prompt(message);
        if (input === null) {
            return null;
        }
        input = input.trim();
        if (input === "") {
            console.log("Không được để trống. Vui lòng nhập lại.");
            continue;
        }
        let number = Number(input);
        if (Number.isInteger(number) && number > 0) {
            return number;
        }
        console.log("Vui lòng nhập số nguyên lớn hơn 0.");
    }
}

function calculateTotal(ticketCount, pricePerTicket) {
    let baseCost = ticketCount * pricePerTicket;
    let discount = 0;
    if (ticketCount >= 4) {
        discount = Math.round(baseCost * 0.1);
    }
    let serviceFee = Math.round((baseCost - discount) * 0.08);
    let totalAmount = baseCost - discount + serviceFee;
    return {
        baseCost: baseCost,
        discount: discount,
        serviceFee: serviceFee,
        totalAmount: totalAmount
    };
}

function displayBookings(list) {
    if (list.length === 0) {
        console.log("Danh sách đơn đặt vé trống");
        return;
    }
    let totalRevenue = 0;
    for (let i = 0; i < list.length; i++) {
        let booking = list[i];
        console.log(
            (i + 1) + ". " + booking.bookingCode +
            " - " + booking.customerName +
            " - " + booking.movieTitle
        );
        console.log(
            "   SL: " + booking.ticketCount +
            " | Giá: " + formatMoney(booking.pricePerTicket) +
            " | Tổng TT: " + formatMoney(booking.totalAmount)
        );
        totalRevenue += booking.totalAmount;
    }
    console.log("Tổng: " + list.length + " đơn đặt vé - Doanh thu: " + formatMoney(totalRevenue));
}

function displayInvoice(booking, total) {
    console.log("========== HÓA ĐƠN ĐẶT VÉ ==========");
    console.log("Mã đặt vé: " + booking.bookingCode);
    console.log("Khách hàng: " + booking.customerName);
    console.log("Tên phim: " + booking.movieTitle);
    console.log("Số vé: " + booking.ticketCount);
    console.log("Giá mỗi vé: " + formatMoney(booking.pricePerTicket));
    console.log("Chi phí cơ sở: " + formatMoney(total.baseCost));
    console.log("Giảm giá: " + formatMoney(total.discount));
    console.log("Phí dịch vụ: " + formatMoney(total.serviceFee));
    console.log("Tổng thanh toán: " + formatMoney(total.totalAmount));
    console.log("====================================");
}

function showBookings() {
    displayBookings(bookings);
}

function addBooking() {
    let inputCode = prompt("Nhập mã đặt vé:");
    if (inputCode === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    let bookingCode = inputCode.trim().toUpperCase();
    let error = validateBookingCode(bookingCode);
    if (error !== "") {
        console.log("Lỗi: " + error);
        return;
    }
    if (findBookingIndex(bookingCode) !== -1) {
        console.log("Mã đặt vé đã tồn tại");
        return;
    }
    let inputCustomer = prompt("Nhập tên khách hàng:");
    if (inputCustomer === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    inputCustomer = inputCustomer.trim();
    while (inputCustomer === "") {
        inputCustomer = prompt("Tên khách hàng không được để trống:");
        if (inputCustomer === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }
        inputCustomer = inputCustomer.trim();
    }
    let customerName = normalizeName(inputCustomer);
    let inputMovie = prompt("Nhập tên phim:");
    if (inputMovie === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    inputMovie = inputMovie.trim();
    while (inputMovie === "") {
        inputMovie = prompt("Tên phim không được để trống:");
        if (inputMovie === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }
        inputMovie = inputMovie.trim();
    }
    let movieTitle = normalizeName(inputMovie);
    let ticketCount = inputPositiveInteger("Nhập số vé:");
    if (ticketCount === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé:");
    if (pricePerTicket === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    let total = calculateTotal(ticketCount, pricePerTicket);
    let newBooking = {
        bookingCode: bookingCode,
        customerName: customerName,
        movieTitle: movieTitle,
        ticketCount: ticketCount,
        pricePerTicket: pricePerTicket,
        totalAmount: total.totalAmount
    };
    bookings.push(newBooking);
    console.log("Thêm đơn đặt vé thành công!");
    displayInvoice(newBooking, total);
}

function updateBooking() {
    let inputCode = prompt("Nhập mã đặt vé cần cập nhật:");
    if (inputCode === null) {
        console.log("Đã hủy cập nhật");
        return;
    }
    let bookingCode = inputCode.trim().toUpperCase();
    let index = findBookingIndex(bookingCode);
    if (index === -1) {
        console.log("Không tìm thấy đơn đặt vé có mã " + bookingCode);
        return;
    }
    let ticketCount = inputPositiveInteger("Nhập số vé mới:");
    if (ticketCount === null) {
        console.log("Đã hủy cập nhật");
        return;
    }
    let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé mới:");
    if (pricePerTicket === null) {
        console.log("Đã hủy cập nhật");
        return;
    }
    let oldTotal = bookings[index].totalAmount;
    let total = calculateTotal(ticketCount, pricePerTicket);

    bookings[index].ticketCount = ticketCount;
    bookings[index].pricePerTicket = pricePerTicket;
    bookings[index].totalAmount = total.totalAmount;
    console.log("Cập nhật thành công!");
    console.log("Tổng thanh toán cũ: " + formatMoney(oldTotal));
    console.log("Tổng thanh toán mới: " + formatMoney(total.totalAmount));
}

function deleteBooking() {
    let inputCode = prompt("Nhập mã đặt vé cần xóa:");
    if (inputCode === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }
    let bookingCode = inputCode.trim().toUpperCase();
    let index = findBookingIndex(bookingCode);
    if (index === -1) {
        console.log("Không tìm thấy đơn đặt vé có mã " + bookingCode);
        return;
    }
    let confirmDelete = prompt("Bạn có chắc muốn xóa đơn này? Nhập Y để xác nhận:");
    if (confirmDelete === null || confirmDelete.trim().toUpperCase() !== "Y") {
        console.log("Đã hủy thao tác xóa");
        console.log("Số đơn hiện tại: " + bookings.length);
        return;
    }
    bookings.splice(index, 1);
    console.log("Xóa thành công!");
    console.log("Số đơn còn lại: " + bookings.length);
}

function searchBooking() {
    let keyword = prompt("Nhập tên phim cần tìm:");
    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }
    keyword = keyword.trim().toLowerCase();
    let result = [];
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].movieTitle.toLowerCase().includes(keyword)) {
            result.push(bookings[i]);
        }
    }
    if (result.length === 0) {
        console.log("Không tìm thấy đơn đặt vé phù hợp");
        return;
    }
    console.log("Kết quả tìm kiếm:");
    displayBookings(result);
}

function showSummary() {
    console.log("==============================================");
    console.log("       BÁO CÁO TỔNG KẾT ĐƠN ĐẶT VÉ");
    console.log("==============================================");
    if (bookings.length === 0) {
        console.log("Chưa có đơn đặt vé nào");
        console.log("==============================================");
        return;
    }
    let totalRevenue = 0;
    let highestBooking = bookings[0];
    for (let i = 0; i < bookings.length; i++) {
        totalRevenue += bookings[i].totalAmount;
        if (bookings[i].totalAmount > highestBooking.totalAmount) {
            highestBooking = bookings[i];
        }
    }
    let averageRevenue = Math.round(totalRevenue / bookings.length);
    console.log("Tổng số đơn đặt vé: " + bookings.length);
    console.log("Tổng doanh thu: " + formatMoney(totalRevenue));
    console.log("Doanh thu trung bình: " + formatMoney(averageRevenue));
    console.log(
        "Đơn cao nhất: " + highestBooking.bookingCode +
        " - " + formatMoney(highestBooking.totalAmount)
    );
    console.log("==============================================");
}

let choice;
while (true) {
    console.log("=====================================================");
    console.log("      HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA");
    console.log("=====================================================");
    console.log("1. Hiển thị danh sách đơn đặt vé");
    console.log("2. Thêm đơn đặt vé mới");
    console.log("3. Cập nhật đơn đặt vé");
    console.log("4. Xóa đơn đặt vé");
    console.log("5. Tìm kiếm đơn đặt vé theo tên phim");
    console.log("0. Thoát chương trình");
    console.log("=====================================================");
    choice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");

    if (choice === null) {
        console.log("Lựa chọn không hợp lệ. Vui lòng nhập từ 0 đến 5.");
        continue;
    }
    choice = choice.trim();
    if (choice === "" || !Number.isInteger(Number(choice))) {
        console.log("Lựa chọn không hợp lệ. Vui lòng nhập từ 0 đến 5.");
        continue;
    }
    switch (choice) {
        case "1":
            showBookings();
            break;
        case "2":
            addBooking();
            break;
        case "3":
            updateBooking();
            break;
        case "4":
            deleteBooking();
            break;
        case "5":
            searchBooking();
            break;
        case "0":
            showSummary();
            console.log("Cảm ơn bạn đã sử dụng hệ thống Moonlight Cinema!");
            break;
        default:
            console.log("Lựa chọn không hợp lệ. Vui lòng nhập từ 0 đến 5.");
    }
    if (choice === "0") {
        break;
    }
}