# SYSTEM ARCHITECTURE

## 1. Tech Stack
- **Build Tool & Framework:** Vite + React + TypeScript.
- **Styling:** Tailwind CSS (Bật `darkMode: 'class'` để hỗ trợ chuyển đổi Sáng/Tối mượt mà).
- **Design System Workflow:** `ui-ux-pro-max`.
- **Icons:** `lucide-react`.
- **Animation:** `framer-motion`.

## 2. Cấu trúc thư mục chuẩn (Modular Structure)
Giữ nguyên 6 file `.md` ở thư mục gốc. Cấu trúc mã nguồn bên trong `src/` được tổ chức rõ ràng để dễ bảo trì, mở rộng và quản lý đa ngôn ngữ:

```text
├── PRD.md, ARCHITECTURE.md, DESIGN.md, RULES.md, TASKS.md, PROGRESS.md
├── src/
│   ├── context/
│   │   └── AppContext.tsx            # Quản lý state toàn cục: language ('vi' | 'en') & theme ('dark' | 'light')
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Thanh điều hướng nổi kính mờ + Nút đổi Sáng/Tối + Nút đổi VI/EN
│   │   │   └── Footer.tsx            # Chân trang kèm trạng thái hệ thống
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Phần mở đầu + tích hợp Terminal
│   │   │   ├── AboutSection.tsx      # Giới thiệu + Bento Grid kỹ năng
│   │   │   ├── ProjectsSection.tsx   # Danh sách dự án + Filter + Modal chi tiết
│   │   │   ├── ExperienceSection.tsx # Timeline kinh nghiệm & học vấn
│   │   │   └── ContactSection.tsx    # Form liên hệ & Social links
│   │   └── ui/
│   │       ├── InteractiveTerminal.tsx # Cửa sổ giả lập dòng lệnh Ubuntu (hỗ trợ song ngữ)
│   │       ├── ProjectCard.tsx       # Thẻ dự án có hiệu ứng Glow Hover
│   │       └── SectionHeading.tsx    # Tiêu đề đồng bộ cho từng mục
│   ├── data/
│   │   └── portfolioData.ts          # NƠI DUY NHẤT CHỨA DỮ LIỆU SONG NGỮ (nhánh `vi` và `en`)
│   ├── types/
│   │   └── index.ts                  # Định nghĩa Interface TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                     # Khai báo Font Tiếng Việt (Be Vietnam Pro / Inter) & CSS Variables