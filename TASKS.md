```markdown
# IMPLEMENTATION TASKS

## Phase 1: Khởi tạo Project, Kích hoạt UI/UX Pro Max, Đa ngôn ngữ & Theme
- [x] **Task 1.1:** Khởi tạo dự án Vite + React + TypeScript ngay trong thư mục gốc hiện tại (giữ nguyên 6 file `.md`), cài đặt Tailwind CSS, `lucide-react`, `framer-motion`.
- [x] **Task 1.2:** Kích hoạt skill `ui-ux-pro-max` để cấu hình font chữ chuẩn Tiếng Việt (`Be Vietnam Pro` / `Inter` + `JetBrains Mono`) làm mặc định và hệ thống màu hỗ trợ cả **Dark Mode** lẫn **Light Mode** (`darkMode: 'class'`) vào `index.css` / cấu hình Tailwind đúng chuẩn `DESIGN.md`.
- [x] **Task 1.3:** Tạo `src/context/AppContext.tsx` (quản lý Theme mặc định `'dark'` và Ngôn ngữ mặc định Tiếng Việt `'vi'`, lưu `localStorage`), `src/types/index.ts` và `src/data/portfolioData.ts` chứa đầy đủ dữ liệu mẫu song ngữ (`vi` & `en`) của Hà Quang theo đúng `PRD.md`.
- [x] **Task 1.4:** Thiết kế `Navbar.tsx` (Floating Glassmorphism, tích hợp sẵn nút chuyển đổi **Sáng/Tối** và nút chuyển ngôn ngữ **VI/EN**) cùng `Footer.tsx` chuẩn `ui-ux-pro-max`.

## Phase 2: Xây dựng Home & Interactive Terminal (UI/UX Pro Max)
- [x] **Task 2.1:** Xây dựng `InteractiveTerminal.tsx` (giữ giao diện nền tối đặc trưng trên cả 2 theme), hỗ trợ cả gõ lệnh bàn phím và nút click chọn lệnh nhanh (`help`, `whoami`, `skills`, `projects`, `status`, `clear`) hiển thị kết quả theo ngôn ngữ đang chọn (`VI`/`EN`).
- [x] **Task 2.2:** Xây dựng `HeroSection.tsx` với hiệu ứng Spotlight, Badge trạng thái động và ghép nối Terminal.

## Phase 3: Xây dựng About (Bento Grid) & Projects (Interactive Cards)
- [x] **Task 3.1:** Xây dựng `AboutSection.tsx` theo bố cục Bento Grid chuẩn `ui-ux-pro-max`, hiển thị câu chuyện nghề nghiệp và 4 nhóm kỹ năng chuyên môn kèm icon.
- [x] **Task 3.2:** Xây dựng `ProjectsSection.tsx` có bộ lọc Tag mượt mà, hiệu ứng Hover Glow Card và Modal xem chi tiết kiến trúc dự án.

## Phase 4: Xây dựng Experience, Contact & Kiểm duyệt UI/UX Pro Max
- [x] **Task 4.1:** Xây dựng `ExperienceSection.tsx` (Timeline dọc phát sáng) và `ContactSection.tsx` (Form liên hệ & Thẻ kết nối).
- [x] **Task 4.2:** Ghép toàn bộ các Section vào `App.tsx`, kiểm tra chuyển đổi qua lại giữa **Tiếng Việt / Tiếng Anh** và **Dark / Light Mode** trên mọi thành phần, đối chiếu checklist `ui-ux-pro-max` và hoàn thiện.