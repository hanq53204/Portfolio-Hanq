```markdown
# DESIGN SYSTEM (POWERED BY UI-UX-PRO-MAX)

## 1. Tích hợp bắt buộc `ui-ux-pro-max`
Trước khi thiết kế bất kỳ component nào, AI Agent BẮT BUỘC phải tra cứu và áp dụng bộ quy tắc từ skill `ui-ux-pro-max` theo định hướng sau:
- **Industry / Category:** Developer Portfolio / Cybersecurity & System Engineering / SaaS Command Center.
- **Aesthetic Style:** Dark Mode OLED + Bento Grid + Glassmorphism tinh tế.
- **Color Palette (Pro Max Dark SecOps):**
  - Background Primary: `#090D16` (Deep Space Slate) kết hợp hoạ tiết lưới kỹ thuật mờ (Background Grid/Dot Matrix).
  - Surface / Card: `#111827` với độ trong suốt `bg-slate-900/60 backdrop-blur-xl`.
  - Border mặc định: `border-slate-800/80`, khi Hover chuyển sang Glow Border `border-emerald-500/50`.
  - Primary Accent: `#10B981` (Emerald Green - Biểu trưng cho trạng thái hệ thống Online / Secure).
  - Secondary Accent: `#06B6D4` (Cyan Tech - Biểu trưng cho Cloud / Monitoring / Network).
  - Text Primary: `#F8FAFC` (Trắng sáng), Text Secondary: `#94A3B8` (Xám xanh dịu mắt).
- **Typography Pairing:**
  - Heading & Body: `Plus Jakarta Sans` hoặc `Inter` (rõ nét, hiện đại, hỗ trợ tốt tiếng Việt).
  - Code, Terminal & Tech Tags: `JetBrains Mono` hoặc `Fira Code` (tạo điểm nhấn kỹ thuật đặc trưng).

## 2. Tiêu chuẩn UX & Tương tác (UI/UX Pro Max Checklist)
- **Micro-interactions:** Mọi thẻ Bento Card, Project Card, nút bấm đều có hiệu ứng chuyển động mượt qua `framer-motion` (nổi nhẹ khi hover, ánh sáng viền, hiệu ứng xuất hiện tuần tự khi cuộn chuột).
- **Interactive Terminal UX:** Cửa sổ Terminal có giao diện thanh tiêu đề chuẩn Ubuntu/macOS, có sẵn các nút bấm gợi ý lệnh (Clickable Command Chips: `whoami`, `skills`, `projects`, `status`, `clear`) để nhà tuyển dụng chỉ cần click chuột cũng xem được kết quả ngay lập tức bên cạnh việc gõ phím.
- **Responsive & Contrast:** Tương thích hoàn hảo trên Mobile, Tablet, Desktop; độ tương phản chữ đạt chuẩn WCAG AA.

## 3. Cấu hình Light Mode & Font Tiếng Việt
- **Font Tiếng Việt chuẩn:** Ưu tiên sử dụng `Be Vietnam Pro` hoặc `Inter` (khai báo đầy đủ `subset: ['vietnamese']` từ Google Fonts) để hiển thị dấu tiếng Việt sắc nét, không bị lỗi font ở các chữ in đậm/nghiêng.
- **Bảng màu Light Mode (Khi người dùng bật chế độ Sáng):**
  - Background Primary: `#F8FAFC` (Trắng xám dịu mắt) kèm lưới kỹ thuật mờ màu xám nhạt.
  - Surface / Card: `#FFFFFF` kết hợp viền `border-slate-200` và bóng đổ nhẹ (`shadow-sm`).
  - Accent Primary: `#059669` (Emerald đậm hơn để đảm bảo độ tương phản cao trên nền trắng).
  - Text Primary: `#0F172A` (Xanh đen đậm), Text Secondary: `#475569`.
  - *Lưu ý riêng:* Cửa sổ `InteractiveTerminal` vẫn giữ nền tối đặc trưng (`#0F172A`) kể cả khi bật Light Mode để giữ chất kỹ thuật của Ubuntu Terminal.