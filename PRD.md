# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1. Tổng quan dự án
- **Chủ sở hữu:** Nguyen Quang Ha
- **Định hướng chuyên môn:** System Engineering, Infrastructure Security, Monitoring & DevOps/SecOps.
- **Mục tiêu trang web:** Portfolio cá nhân hiện đại, tương tác cao phục vụ ứng tuyển các vị trí kỹ thuật hệ thống và bảo mật . Thể hiện tư duy làm việc bài bản, chú trọng thực hành Lab thực tế, khả năng tự chẩn đoán xử lý sự cố (empirical troubleshooting)

## 2. Cấu trúc 5 Phân khu chính (Core Sections)

### 2.1. Home (Hero Section & Interactive Terminal)
- **Cột trái (Giới thiệu & Call-to-Action):**
  - Badge trạng thái động: `System Status: Online | Ready for System & Security Roles`.
  - Tiêu đề chính: "Xin chào, tôi là Nguyen Quang Ha — System & Infrastructure Security".
  - Mô tả ngắn: Tốt nghiệp chuyên ngành An toàn thông tin (04/2026), đam mê xây dựng, quản trị hạ tầng Linux/Windows Server, thiết lập hệ thống giám sát (Monitoring) và bảo mật hệ thống (Hardening & SecOps).
  - Nút hành động: `Xem Dự Án`, `Tải CV (PDF)`, `Liên hệ ngay`.
- **Cột phải (Interactive Web Terminal):**
  - Cửa sổ dòng lệnh Ubuntu giả lập (`quangha@sec-ops:~$`) cho phép người xem click chuột vào các nút gợi ý (Command Chips) hoặc gõ trực tiếp từ bàn phím:
    - `help`: Hiển thị danh sách lệnh.
    - `whoami`: Tóm tắt hồ sơ, định hướng và phong cách làm việc của Hà Quang.
    - `skills`: Liệt kê nhanh các nhóm công nghệ nắm vững.
    - `projects`: Liệt kê 4 dự án tiêu biểu ( hiện chưa có, bổ sung sau).
    - `status`: Hiển thị thông số hệ thống giả lập (Uptime, CPU, RAM, Security Status: Protected).
    - `clear`: Xóa màn hình terminal.

### 2.2. About (Về bản thân & Năng lực kỹ thuật)
- **Câu chuyện & Phương pháp làm việc:** Kết hợp tư duy phân tích và nền tảng kỹ thuật An toàn thông tin. Đề cao việc hiểu sâu bản chất code/hệ thống, đọc log, đo lường thông số thực nghiệm và duy trì 1-2 giờ thực hành Lab mỗi ngày.
- **Bento Grid Kỹ năng (Skills Matrix - 4 nhóm):**
  1. **System & OS Administration:** Ubuntu/Linux Server, Windows Server, Bash Scripting, PowerShell/WMI, Networking, VPS & Cloud.
  2. **Monitoring & Containers:** Docker, Prometheus, Grafana, Log Collection, System Metrics (CPU/RAM/Disk/Network), Automated Alerting.
  3. **Infrastructure Security & SecOps:** System Hardening, Infrastructure Security, DDoS Detection, Spam Filtering, SOC/SecOps Fundamentals.
  4. **Languages & Engineering Workflow:** Python, Bash, Git, Tài liệu hóa kỹ thuật (Documentation), Chẩn đoán & xử lý sự cố (Troubleshooting).

### 2.3. Projects (Dự án thực chiến)
Hiển thị dạng Card tương tác chuẩn `ui-ux-pro-max`, có bộ lọc theo Tag (`All`, `Monitoring & DevOps`, `Security & ML`, `System Admin`) và Modal xem chi tiết kiến trúc:
1. **Dự án 1 (Bổ sung sau):**
   - *Mô tả:* Bổ sung sau.
   - *Tech stack:* UBổ sung sau.
2. **Dự án 2 (Bổ sung sau):**
   - *Mô tả:* Bổ sung sau.
   - *Tech stack:* UBổ sung sau.
3. **Bổ sung sau:**
   - *Mô tả:* Bổ sung sau.
   - *Tech stack:* UBổ sung sau.
4. **Bổ sung sau:**
   - *Mô tả:* Bổ sung sau.
   - *Tech stack:* UBổ sung sau.

### 2.4. Experience (Hành trình & Cột mốc)
Thiết kế dạng Timeline dọc phát sáng khi cuộn trang:
- **04/2026 | Tốt nghiệp Kỹ sư/Cử nhân An toàn thông tin (Information Security):**
  - Hoàn thành chương trình đào tạo chuyên ngành An toàn thông tin.
- **T6-T12/2025| System Deployment Intern:**
  - Thực hành triển khai và quản trị môi trường WordPress trên máy chủ Ubuntu, xử lý các vấn đề cấu hình mạng và dịch vụ hệ thống.

### 2.5. Contact (Liên hệ)
- Form gửi tin nhắn trực tiếp + Thẻ thông tin kết nối nhanh: Email, GitHub, LinkedIn, Địa điểm (Phường Tân Sơn, TP. Hồ Chí Minh, Việt Nam).

## 3. Tính năng bổ trợ toàn trang (Global Features)
- **Đa ngôn ngữ (Bilingual VI / EN):**
  - Mặc định hiển thị **Tiếng Việt (`vi`)** ngay khi mở trang web.
  - Có nút chuyển đổi nhanh `VI | EN` trên thanh Navbar, tự động dịch toàn bộ nội dung (Menu, Hero, Terminal, About, Projects, Experience, Contact) và lưu lựa chọn vào `localStorage`.
- **Giao diện Sáng / Tối (Theme Switcher):**
  - Mặc định là **Dark Mode** (phong cách SecOps), hỗ trợ nút chuyển đổi mượt mà sang **Light Mode** (giao diện sáng thanh lịch, dễ đọc ban ngày) và lưu trạng thái vào `localStorage`.