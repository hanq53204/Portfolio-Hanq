# Hà Quang — Personal Portfolio

> **Nguyen Quang Ha** · System Engineering · Infrastructure Security · Monitoring & DevOps/SecOps

Trang Portfolio cá nhân hiện đại, tương tác cao được thiết kế phục vụ mục tiêu ứng tuyển các vị trí kỹ thuật hệ thống và bảo mật hạ tầng (**System Engineer**, **Infrastructure Security**, **Monitoring & SecOps**). Giao diện thể hiện tư duy làm việc bài bản, chú trọng thực hành Lab mỗi ngày và khả năng tự chẩn đoán, xử lý sự cố dựa trên dữ liệu thực nghiệm (*Empirical Troubleshooting*).

---

## Tính năng nổi bật

- **Interactive Ubuntu Terminal (`quangha@sec-ops:~$`):**
  - Mô phỏng cửa sổ dòng lệnh Ubuntu giữ nền tối đặc trưng (`#0F172A`) trên cả hai chế độ giao diện Sáng và Tối.
  - Hỗ trợ cả **gõ lệnh trực tiếp từ bàn phím** (`Enter` thực thi, `↑` / `↓` duyệt lịch sử lệnh, `Tab` tự động hoàn tất) lẫn **bấm nút gợi ý nhanh** (`help`, `whoami`, `skills`, `projects`, `status`, `clear`) kèm hiệu ứng chạy chữ mượt mà.
- **Song ngữ Việt – Anh (`VI | EN`) & Giao diện Tối / Sáng (`Dark / Light Mode`):**
  - Mặc định hiển thị **Tiếng Việt (`vi`)** ngay khi mở trang, sử dụng font **Be Vietnam Pro** (hỗ trợ đầy đủ dấu tiếng Việt) kết hợp **JetBrains Mono** cho khối kỹ thuật/terminal.
  - Mặc định kích hoạt **Dark Mode SecOps** (`#090D16` với điểm nhấn Emerald `#10B981` & Cyan `#06B6D4`), hỗ trợ chuyển đổi mượt mà sang **Light Mode** (`#F8FAFC`) và lưu tùy chọn vào `localStorage`.
- **Tách biệt hoàn toàn Dữ liệu và Giao diện (Data-UI Separation):**
  - Toàn bộ nội dung cá nhân, kỹ năng, dự án, cột mốc kinh nghiệm và nhãn UI song ngữ được quản lý tập trung tại một nguồn duy nhất là [`src/data/portfolioData.ts`](src/data/portfolioData.ts), giúp chỉnh sửa và mở rộng nhanh chóng mà không cần chạm vào component giao diện.
- **Trải nghiệm UI/UX chuẩn `ui-ux-pro-max`:**
  - **Floating Glassmorphism Navbar:** Thanh điều hướng nổi kính mờ tích hợp chuyển ngôn ngữ `VI | EN`, chuyển theme Sáng/Tối, cuộn mượt (**Smooth Scroll**) và tự động sáng đèn phân khu đang xem (**Scroll-Spy**).
  - **Bento Grid & Interactive Cards:** Ma trận 4 nhóm kỹ năng dạng Bento Grid, bộ lọc dự án theo tag (`All`, `Monitoring & DevOps`, `Security & ML`, `System Admin`) kèm Modal xem chi tiết kiến trúc, Timeline dọc phát sáng khi cuộn trang và khu vực liên hệ tích hợp nút sao chép nhanh.

---

## Tech Stack & Phương pháp phát triển

### Công nghệ sử dụng
| Thành phần | Công nghệ / Thư viện |
| :--- | :--- |
| **Frontend Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS (`darkMode: 'class'`) |
| **Animation** | Framer Motion |
| **Icons** | Lucide Icons (`lucide-react`) |
| **Typography** | Be Vietnam Pro, Inter & JetBrains Mono (Google Fonts) |
| **Design Standard** | `ui-ux-pro-max` (Bento Grid, Glassmorphism, WCAG AA Contrast) |

### Phương pháp Context-Driven Development
Dự án được tổ chức và triển khai theo quy trình **Context-Driven Development** dựa trên bộ 6 tài liệu định hướng đặt tại thư mục gốc:
- [`RULES.md`](RULES.md) — Nguyên tắc vận hành, kiểm soát phạm vi và tách biệt dữ liệu – giao diện.
- [`PRD.md`](PRD.md) — Đặc tả yêu cầu sản phẩm và nội dung 5 phân khu cốt lõi.
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — Kiến trúc hệ thống và tổ chức thư mục mã nguồn.
- [`DESIGN.md`](DESIGN.md) — Quy chuẩn màu sắc SecOps Dark/Light Mode, Typography và trải nghiệm UX.
- [`TASKS.md`](TASKS.md) — Danh sách công việc phân chia theo từng Phase (Phase 1 – Phase 4).
- [`PROGRESS.md`](PROGRESS.md) — Nhật ký theo dõi tiến độ thực hiện dự án.

---

## Cấu trúc thư mục

```text
Portfolio-Hanq/
├── .env.example                        # Mẫu biến môi trường (Web3Forms Access Key)
├── PRD.md, ARCHITECTURE.md, DESIGN.md, RULES.md, TASKS.md, PROGRESS.md
├── README.md
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json                         # HTTP Security Headers & cấu hình SPA Rewrites cho Vercel
├── vite.config.ts
├── public/
│   └── favicon.svg                     # Icon vector nhận diện tab trình duyệt
└── src/
    ├── context/
    │   └── AppContext.tsx              # State toàn cục: language ('vi' | 'en') & theme ('dark' | 'light')
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx              # Floating Navbar + Scroll Progress Bar + Scroll-Spy + VI/EN + Dark/Light
    │   │   └── Footer.tsx              # Chân trang kèm System Status & liên kết nhanh
    │   ├── sections/
    │   │   ├── HeroSection.tsx         # Giới thiệu tổng quan + CTA + Terminal
    │   │   ├── AboutSection.tsx        # Câu chuyện nghề nghiệp + Bento Grid 4 nhóm kỹ năng
    │   │   ├── ProjectsSection.tsx     # Bộ lọc Tag + Lưới dự án + Modal chi tiết kiến trúc
    │   │   ├── ExperienceSection.tsx   # Timeline dọc tương tác theo cuộn trang
    │   │   └── ContactSection.tsx      # Kênh kết nối nhanh + Form Web3Forms kèm chống spam
    │   └── ui/
    │       ├── InteractiveTerminal.tsx # Cửa sổ Ubuntu Terminal tương tác kèm Syntax Highlighting
    │       ├── ProjectCard.tsx         # Thẻ dự án với semantic tinted badges
    │       └── SectionHeading.tsx      # Tiêu đề đồng bộ giữa các phân khu
    ├── data/
    │   └── portfolioData.ts            # Nguồn dữ liệu song ngữ duy nhất (nhánh `vi` và `en`)
    ├── types/
    │   └── index.ts                    # Định nghĩa TypeScript interfaces
    ├── vite-env.d.ts                   # Khai báo type cho biến môi trường Vite (`VITE_*`)
    ├── App.tsx
    ├── main.tsx
    └── index.css                       # CSS Variables, dot-grid nền & quy tắc Dark/Light Mode
```

---

## Hướng dẫn cài đặt & chạy trên máy (Local Setup)

### Yêu cầu môi trường
- **Node.js** `>= 18.x` (khuyến nghị `v20+` hoặc `v22+`)
- **npm** `>= 9.x`

### Các bước thực hiện

```bash
# 1. Clone repository về máy
git clone <your-repository-url>
cd Portfolio-Hanq

# 2. Cài đặt toàn bộ dependencies
npm install

# 3. Tạo file biến môi trường .env từ mẫu (để kích hoạt gửi mail qua Web3Forms)
cp .env.example .env
# Mở .env và điền giá trị VITE_WEB3FORMS_ACCESS_KEY của bạn

# 4. Khởi chạy môi trường phát triển (Development Server)
npm run dev
```

### Các lệnh kiểm tra & build sản xuất

```bash
# Kiểm tra kiểu dữ liệu TypeScript (không sinh file output)
npm run lint

# Kiểm tra TypeScript và đóng gói bản Production (thư mục dist/)
npm run build

# Xem trước bản build Production tại local
npm run preview
```

---

## Tùy biến nội dung

Để cập nhật thông tin cá nhân, thêm dự án thực chiến, đường dẫn CV PDF hoặc cột mốc kinh nghiệm mới, bạn chỉ cần chỉnh sửa hai nhánh `vi` và `en` trong [`src/data/portfolioData.ts`](src/data/portfolioData.ts) — toàn bộ giao diện và Terminal tương tác sẽ tự động cập nhật theo.

---

## Liên hệ

- **Email:** [ha.nq53204@gmail.com](mailto:ha.nq53204@gmail.com)
- **GitHub:** [https://github.com/hanq53204](https://github.com/hanq53204)
- **LinkedIn:** [https://www.linkedin.com/in/qh8/](https://www.linkedin.com/in/qh8/)


