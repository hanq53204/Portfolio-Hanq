# PROJECT PROGRESS LOG

## Trạng thái hiện tại
- **Phase hiện tại:** Đã hoàn tất toàn bộ **Phase 1 – Phase 4 (Task 1.1 đến 4.2)** — Dự án Portfolio hoàn chỉnh.
- **Task tiếp theo:** Cập nhật nội dung chi tiết cho 4 dự án thực chiến và link CV PDF thực tế trong `src/data/portfolioData.ts` khi sẵn sàng.

## Lịch sử thực hiện
- **[Phase 4 - Hoàn tất]:**
  - Bổ sung nhãn nút Copy / Mở liên kết / Gửi tin nhắn mới song ngữ `vi` / `en` vào `src/types/index.ts` và `src/data/portfolioData.ts`.
  - Xây dựng `src/components/sections/ExperienceSection.tsx` dạng Timeline dọc với trục phát sáng liên kết cuộn trang (`useScroll` + `useSpring`) và hiệu ứng xuất hiện tuần tự khi cuộn, hiển thị đầy đủ các cột mốc từ `src/data/portfolioData.ts`.
  - Xây dựng `src/components/sections/ContactSection.tsx` bố cục 2 cột: cột trái gồm thẻ Địa điểm, Trạng thái, Email, GitHub, LinkedIn tích hợp nút Copy nhanh kèm phản hồi trạng thái; cột phải là Form liên hệ có label accessibility chuẩn `ui-ux-pro-max` và màn hình phản hồi gửi thành công mượt mà.
  - Nâng cấp `src/components/layout/Navbar.tsx` với tính năng Smooth Scroll và Scroll-Spy tự động sáng đèn mục đang xem trên thanh điều hướng.
  - Ghép hoàn chỉnh 5 section (`HeroSection`, `AboutSection`, `ProjectsSection`, `ExperienceSection`, `ContactSection`) vào `src/App.tsx`; rà soát đối chiếu `ui-ux-pro-max` (tương phản Dark/Light Mode, `cursor-pointer`, `focus-visible`, không dùng emoji làm icon, responsive, `prefers-reduced-motion`).
  - Đã kiểm tra `npm run lint` (`tsc --noEmit`) và `npm run build` (`tsc -b && vite build`) thành công (0 lỗi).
- **[Phase 3 - Hoàn tất]:**
  - Bổ sung dữ liệu song ngữ (`problem`, `outcome`, `problemLabel`, `outcomeLabel`, `filterAriaLabel`, `emptyCategoryMessage`) cho các dự án vào `src/types/index.ts` và `src/data/portfolioData.ts`.
  - Xây dựng `src/components/ui/SectionHeading.tsx` để đồng bộ tiêu đề các phân khu.
  - Xây dựng `src/components/sections/AboutSection.tsx` theo bố cục **Bento Grid** chuẩn `ui-ux-pro-max` (câu chuyện nghề nghiệp, tư duy empirical troubleshooting, 3 chỉ số nổi bật và 4 nhóm kỹ năng chuyên môn kèm icon `lucide-react`), hỗ trợ mượt cả Dark/Light Mode và VI/EN.
  - Xây dựng `src/components/ui/ProjectCard.tsx` (viền phát sáng khi hover, badge danh mục & trạng thái, tech stack tags, nút mở chi tiết) và `src/components/sections/ProjectsSection.tsx` (bộ lọc Tag có hiệu ứng chuyển tab `layoutId` mượt mà từ `framer-motion` và Modal xem chi tiết bài toán, kiến trúc, điểm nhấn & kết quả hỗ trợ `Escape`, khóa cuộn nền và phục hồi focus).
  - Nhúng `AboutSection` và `ProjectsSection` vào `src/App.tsx`; kiểm tra `npm run lint` (`tsc --noEmit`) và `npm run build` (`tsc -b && vite build`) thành công (0 lỗi).
- **[Phase 2 - Hoàn tất]:**
  - Bổ sung metadata song ngữ cho Terminal vào `src/types/index.ts` và `src/data/portfolioData.ts`.
  - Xây dựng `src/components/ui/InteractiveTerminal.tsx`: giữ nền tối đặc trưng `#0F172A` trên cả Dark/Light Mode, thanh tiêu đề Ubuntu/macOS, hỗ trợ gõ lệnh bàn phím (`Enter`, `ArrowUp`/`ArrowDown` lịch sử, `Tab` tự hoàn tất) và click các Command Chips (`help`, `whoami`, `skills`, `projects`, `status`, `clear`) với hiệu ứng chạy chữ mượt mà (tôn trọng `prefers-reduced-motion`) và tự động dịch nội dung terminal khi chuyển `VI | EN`.
  - Xây dựng `src/components/sections/HeroSection.tsx` với bố cục 2 cột cân đối, hiệu ứng Spotlight, tiêu đề & mô tả chuyên môn, các nút CTA (`Xem Dự Án`, `Tải CV (PDF)`, `Liên hệ ngay`) và ghép nối `InteractiveTerminal` vào `src/App.tsx` (đã gỡ bỏ status badge và 3 thẻ highlight khỏi Hero theo yêu cầu người dùng).
  - Đã kiểm tra `npm run lint` (`tsc --noEmit`) và `npm run build` (`tsc -b && vite build`) thành công (0 lỗi).
- **[Phase 1 - Hoàn tất]:**
  - Khởi tạo cấu trúc Vite + React + TypeScript + Tailwind CSS (`package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `postcss.config.js`), cài đặt `lucide-react` và `framer-motion`, giữ nguyên toàn bộ 6 file `.md` gốc.
  - Áp dụng `ui-ux-pro-max` và `DESIGN.md`: cấu hình `darkMode: 'class'` trong `tailwind.config.js`, tích hợp font `Be Vietnam Pro` + `Inter` + `JetBrains Mono` trong `index.html` và `src/index.css` (kèm lưới kỹ thuật, glassmorphism, bento-card, hỗ trợ `prefers-reduced-motion`).
  - Tạo `src/types/index.ts`, `src/context/AppContext.tsx` (quản lý Theme mặc định `'dark'`, Ngôn ngữ mặc định `'vi'`, lưu `localStorage`), và `src/data/portfolioData.ts` (toàn bộ dữ liệu song ngữ `vi` / `en` theo `PRD.md`).
  - Xây dựng `src/components/layout/Navbar.tsx` (Floating Glassmorphism, nút chuyển Sáng/Tối, nút `VI | EN`, menu mobile responsive), `src/components/layout/Footer.tsx`, và `src/App.tsx` + `src/main.tsx`.
  - Đã kiểm tra `npm run lint` (`tsc --noEmit`), `npm run build` (`tsc -b && vite build`) thành công và chạy thử Vite dev server tại `http://127.0.0.1:5173/`.
- **[Khởi tạo]:** Thiết lập bộ tài liệu Context-Driven Development kết hợp tiêu chuẩn `ui-ux-pro-max`.