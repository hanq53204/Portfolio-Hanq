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

## Branch `theme-carbon` — Tactile Carbon & Precision Engineering Redesign

- **Ngày thực hiện:** 2026-11-13
- **Nhánh Git:** `theme-carbon` (tách từ `main` để giữ nguyên bản v1)
- **Thay đổi hệ thống màu & quy chuẩn giao diện (`DESIGN.md`, `tailwind.config.js`, `src/index.css`, `index.html`, `src/App.tsx`):**
  - Loại bỏ hoàn toàn chữ gradient (`bg-clip-text text-transparent`), hiệu ứng đổ bóng phát sáng neon (`glow-emerald`, `glow-cyan`, radial blur blobs) và kính mờ dày đặc (`backdrop-blur-xl`).
  - Chuyển toàn bộ bảng màu sang hệ **Neutral Zinc / Carbon**:
    - **Dark Mode:** Nền chính `#0A0A0B`, bề mặt Card `#121214`, hover `#18181B`, viền `1px` sắc nét `#27272A` (`border-zinc-800`), chữ chính `#FAFAFA`, chữ phụ `#A1A1AA`.
    - **Light Mode:** Nền chính `#FAFAFA`, bề mặt Card `#FFFFFF`, viền `1px` `#E4E4E7` (`border-zinc-200`), chữ chính `#09090B`, chữ phụ `#52525B`.
  - Tiết chế màu nhấn: Nút CTA chính sử dụng độ tương phản cao đơn sắc (Trắng `#FAFAFA` trên nền tối / Đen `#09090B` trên nền sáng); màu xanh Emerald `#10B981` chỉ dùng làm điểm tín hiệu cho chấm trạng thái `Online` nhỏ (`Footer`, `ContactSection`) và dấu nhắc lệnh / con trỏ trong `InteractiveTerminal`.
  - Cố định `InteractiveTerminal` trên nền tối `#09090B` với viền `#27272A` trên cả hai chế độ Sáng và Tối.
- **Cập nhật toàn bộ Components:** `Navbar.tsx`, `Footer.tsx`, `SectionHeading.tsx`, `InteractiveTerminal.tsx`, `ProjectCard.tsx`, `HeroSection.tsx`, `AboutSection.tsx`, `ProjectsSection.tsx`, `ExperienceSection.tsx`, `ContactSection.tsx` (giữ nguyên 100% logic, dữ liệu song ngữ `VI`/`EN` từ `src/data/portfolioData.ts` và hiệu ứng Framer Motion).
- **Kiểm tra Build & TypeScript:** `npm run lint` (`tsc --noEmit`) và `npm run build` (`tsc -b && vite build`) thành công với **0 lỗi** (1945 modules, CSS `31.98 kB`, JS `362.61 kB`).

## Branch `theme-carbon` — Tactile Carbon & Precision Engineering Redesign

- **Ngày thực hiện:** 2026-11-13
- **Nhánh Git:** `theme-carbon` (tách từ `main` để giữ nguyên bản v1)
- **Thay đổi hệ thống màu & quy chuẩn giao diện (`DESIGN.md`, `tailwind.config.js`, `src/index.css`, `index.html`, `src/App.tsx`):**
  - Loại bỏ hoàn toàn chữ gradient (`bg-clip-text text-transparent`), hiệu ứng đổ bóng phát sáng neon (`glow-emerald`, `glow-cyan`, radial blur blobs) và kính mờ dày đặc (`backdrop-blur-xl`).
  - Chuyển toàn bộ bảng màu sang hệ **Neutral Zinc / Carbon**:
    - **Dark Mode:** Nền chính `#0A0A0B`, bề mặt Card `#121214`, hover `#18181B`, viền `1px` sắc nét `#27272A` (`border-zinc-800`), chữ chính `#FAFAFA`, chữ phụ `#A1A1AA`.
    - **Light Mode:** Nền chính `#FAFAFA`, bề mặt Card `#FFFFFF`, viền `1px` `#E4E4E7` (`border-zinc-200`), chữ chính `#09090B`, chữ phụ `#52525B`.
  - Tiết chế màu nhấn: Nút CTA chính sử dụng độ tương phản cao đơn sắc (Trắng `#FAFAFA` trên nền tối / Đen `#09090B` trên nền sáng); màu xanh Emerald `#10B981` chỉ dùng làm điểm tín hiệu cho chấm trạng thái `Online` nhỏ (`Footer`, `ContactSection`) và dấu nhắc lệnh / con trỏ trong `InteractiveTerminal`.
  - Cố định `InteractiveTerminal` trên nền tối `#09090B` với viền `#27272A` trên cả hai chế độ Sáng và Tối.
- **Cập nhật toàn bộ Components:** `Navbar.tsx`, `Footer.tsx`, `SectionHeading.tsx`, `InteractiveTerminal.tsx`, `ProjectCard.tsx`, `HeroSection.tsx`, `AboutSection.tsx`, `ProjectsSection.tsx`, `ExperienceSection.tsx`, `ContactSection.tsx` (giữ nguyên 100% logic, dữ liệu song ngữ `VI`/`EN` từ `src/data/portfolioData.ts` và hiệu ứng Framer Motion).
- **Kiểm tra Build & TypeScript:** `npm run lint` (`tsc --noEmit`) và `npm run build` (`tsc -b && vite build`) thành công với **0 lỗi** (1945 modules, CSS `31.98 kB`, JS `362.61 kB`).

## Branch `theme-carbon` — Modern Cloud & Infrastructure Tech (60-30-10)

- **Ngày thực hiện:** 2026-11-13
- **Cập nhật thiết kế & hệ màu (`DESIGN.md`, `tailwind.config.js`, `src/index.css`, `index.html`, `src/App.tsx`):**
  - Áp dụng quy tắc **60 - 30 - 10** theo phong cách **Modern Cloud & Infrastructure Tech** (GitHub Dark, Cloudflare, Grafana):
    - **Dark Mode (60/30/10):** Nền chính `#0D1117` (Obsidian Slate) kết hợp chấm lưới kỹ thuật `.bg-dot-grid` siêu mờ; bề mặt Card `#161B22` (hover `#1C2128`) với viền `#30363D` + cạnh trên sáng nhẹ `border-t-white/10`; màu nhấn chính **Cobalt/Azure Blue (`#3B82F6` / `#2563EB`)**.
    - **Light Mode:** Nền chính `#F6F8FA` (GitHub Light), bề mặt Card `#FFFFFF` viền `#D0D7DE`, màu nhấn chính **Azure Blue (`#2563EB`)**.
    - **Semantic Tinted Badges:** Phân loại kỹ thuật bằng các badge nền mờ chuẩn tương phản (`Blue` cho Cloud/System, `Amber` cho Grafana/Monitoring, `Emerald` cho SecOps/Online/Verified, `Sky` cho Workflow/Code).
- **Cập nhật Components & Terminal:**
  - `HeroSection.tsx`: Nút CTA chính Azure/Cobalt Blue nổi bật, tiêu đề phụ/chức danh nhấn màu xanh Blue, thêm vùng ánh sáng radial gradient xanh blue/cyan nhẹ phía sau `InteractiveTerminal`.
  - `InteractiveTerminal.tsx`: Giữ cửa sổ tối `#0D1117` (header/footer `#161B22`, viền `#30363D`) trên cả 2 chế độ Sáng/Tối và bổ sung **syntax highlighting** cho đầu ra các lệnh `whoami`, `skills`, `projects`, `status`, `help`.
  - Đồng bộ toàn bộ `Navbar.tsx`, `Footer.tsx`, `SectionHeading.tsx`, `AboutSection.tsx`, `ProjectCard.tsx`, `ProjectsSection.tsx`, `ExperienceSection.tsx`, `ContactSection.tsx` (giữ nguyên 100% dữ liệu song ngữ `VI`/`EN` từ `src/data/portfolioData.ts`).
- **Kiểm tra Build & TypeScript:** `npm run lint` (`tsc --noEmit`) và `npm run build` (`tsc -b && vite build`) thành công với **0 lỗi** (1945 modules, CSS `35.08 kB`, JS `366.34 kB`).

### Bổ sung Scroll Progress Bar trên `Navbar.tsx` (`2026-11-13`)
- Thêm thanh tiến trình cuộn trang (`Scroll Progress Bar`) sát cạnh dưới của `Navbar` trong `src/components/layout/Navbar.tsx` bằng `useScroll` + `useSpring` (`stiffness: 100, damping: 30, restDelta: 0.001`) từ `framer-motion`.
- Thiết kế mảnh `h-[2.5px]`, định vị `absolute bottom-0` kết hợp `overflow-hidden` trên `<nav>` để bo góc khớp thanh Navbar floating mà không làm lệch bố cục Desktop/Mobile, dùng dải màu `#2563EB` → `#3B82F6` → `#06B6D4` đồng bộ `DESIGN.md`.
- Kiểm tra `npm run lint` và `npm run build` đạt **0 lỗi** (CSS `35.87 kB`, JS `366.74 kB`).

### Cập nhật thông tin liên hệ chính thức (`2026-11-13`)
- Đồng bộ thông tin liên hệ chính thức vào cả hai nhánh `vi` và `en` trong `src/data/portfolioData.ts`:
  - **Email:** `ha.nq53204@gmail.com` (`mailto:ha.nq53204@gmail.com`)
  - **GitHub:** `https://github.com/hanq53204`
  - **LinkedIn:** `https://www.linkedin.com/in/qh8/`
- Bổ sung dòng thông tin liên hệ vào kết quả lệnh `whoami` trong `InteractiveTerminal` (cả `VI` và `EN`); dữ liệu trong `ContactSection` và `Footer` tự động đồng bộ từ `contact.socialLinks`.
- Cập nhật mục **Liên hệ** ở cuối `README.md`.
- Xác nhận liên kết GitHub/LinkedIn mở tab mới (`target="_blank" rel="noopener noreferrer"`), nút Copy Email truyền đúng `item.value` (`ha.nq53204@gmail.com`), và chạy `npm run lint` + `npm run build` đạt **0 lỗi** (CSS `35.87 kB`, JS `366.90 kB`).

### Tích hợp gửi Email thật qua Web3Forms API (`2026-11-13`)
- Cập nhật `src/components/sections/ContactSection.tsx` sử dụng `fetch` `POST` JSON tới `https://api.web3forms.com/submit` với `access_key` của Web3Forms (sau đó đã chuyển sang biến môi trường `VITE_WEB3FORMS_ACCESS_KEY` trong `.env`) và tiêu đề `[Portfolio Contact] Tin nhắn mới từ <Tên người gửi>`.
- Bổ sung `errorMessage` song ngữ `VI`/`EN` vào `src/types/index.ts` và `src/data/portfolioData.ts` giữ nguyên quy tắc tách dữ liệu khỏi giao diện.
- Hoàn thiện đủ 3 trạng thái form: Đang gửi (khóa nút bấm + icon `Loader2` xoay), Thành công (hiện thông báo xác nhận + reset form) và Thất bại (hiển thị hộp cảnh báo `role="alert"` theo ngôn ngữ đang chọn).
- Kiểm tra `npm run lint` và `npm run build` thành công với **0 lỗi** (CSS `36.25 kB`, JS `368.67 kB`).

### Đợt Rà soát Bảo mật, Dọn dẹp & Hardening (`2026-11-13`)
- **Bảo mật & Chống Spam:**
  - Chuyển Web3Forms `access_key` khỏi mã nguồn sang biến môi trường `VITE_WEB3FORMS_ACCESS_KEY` trong `.env` (đã được `.gitignore` chặn tuyệt đối); thêm file mẫu `.env.example` và khai báo TypeScript tại `src/vite-env.d.ts`.
  - Bổ sung trường bẫy chống spam honeypot (`botcheck`) và validate chặt chẽ độ dài/định dạng email trước khi gọi API trong `src/components/sections/ContactSection.tsx`.
  - Xác nhận 100% thẻ `<a>` có `target="_blank"` đều kèm `rel="noopener noreferrer"`, không dùng `dangerouslySetInnerHTML`, `eval`, hay `innerHTML`.
- **Kiểm tra cấu trúc & Data-UI Separation:**
  - Đối chiếu sâu giữa 2 nhánh `vi` và `en` trong `src/data/portfolioData.ts` xác nhận `VI_EN_PARITY_ISSUES: 0` (khớp 100% cấu trúc và số lượng trường); toàn bộ văn bản hiển thị trong `src/components/` đều lấy từ `portfolioData.ts`.
- **Dọn dẹp mã thừa (`Code Cleanup`):**
  - Xóa cấu trúc thừa `PhaseShellData` / `phaseShell` và field `accent` không còn dùng khỏi `src/types/index.ts` và `src/data/portfolioData.ts`.
  - Loại bỏ CSS variables không sử dụng trong `src/index.css` (`--surface-card`, `--border-default`, `--text-secondary`) và block `colors.cloud` thừa trong `tailwind.config.js`.
  - Kiểm tra `package.json`: toàn bộ 4 dependencies và 8 devDependencies đều đang dùng thực tế, không có gói thừa.
- **Tài liệu & Build:**
  - Cập nhật cây thư mục và hướng dẫn tạo `.env` từ `.env.example` trong `README.md`.
  - Chạy `npm run lint` (`tsc --noEmit`) và `npm run build` (`tsc -b && vite build`) thành công với **0 lỗi** (1945 modules, CSS `36.10 kB`, JS `367.55 kB`).
