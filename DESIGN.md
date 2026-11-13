# DESIGN SYSTEM — MODERN CLOUD & INFRASTRUCTURE TECH

## 1. Triết lý thiết kế (`ui-ux-pro-max`)
- **Industry / Category:** Developer Portfolio / Cloud Infrastructure, System Engineering & SecOps.
- **Aesthetic Style:** **Modern Cloud & Infrastructure Tech** (lấy cảm hứng từ GitHub Dark, Cloudflare và Grafana) — cân bằng giữa chiều sâu kỹ thuật, phân cấp thị giác rõ ràng theo quy tắc **60 - 30 - 10** và độ tương phản chuẩn WCAG AA/AAA trên cả Dark Mode lẫn Light Mode.
- **Nguyên tắc phân tầng bề mặt:**
  - Không dùng đổ bóng phát sáng neon (`glow`) trên card hoặc nút bấm.
  - Card trong Dark Mode dùng hiệu ứng viền sáng mảnh cạnh trên (`border-t-white/10`) trên nền `#161B22` để tạo cảm giác khối nổi 3D tinh tế.
  - Sử dụng các badge nền mờ (`tinted badges`: Blue, Amber, Emerald, Sky) để phân loại thông tin kỹ thuật rõ ràng thay vì đơn sắc xám.

## 2. Hệ màu chuẩn 60 - 30 - 10

### Dark Mode (Mặc định)
- **60% — Nền chính (Obsidian Slate):** `#0D1117` kết hợp họa tiết chấm lưới kỹ thuật (`dot-grid`) siêu mờ.
- **30% — Bề mặt Card:** `#161B22` (`hover: #1C2128`), viền `1px` `#30363D` cùng cạnh trên sáng nhẹ `border-t-white/10`. Bề mặt lồng (`inset`/input): `#0D1117`.
- **10% — Màu nhấn chính (Cobalt / Azure Blue):** `#3B82F6` (hover `#2563EB`) cho nút CTA chính, tiêu đề/vai trò nổi bật, icon đại diện và tab đang chọn.
- **Chữ viết:** Chính `#F0F6FC`, phụ `#8B949E`.

### Light Mode
- **60% — Nền chính (GitHub Light):** `#F6F8FA` kết hợp chấm lưới kỹ thuật mờ.
- **30% — Bề mặt Card:** `#FFFFFF`, viền `1px` `#D0D7DE`, đổ bóng nhẹ `shadow-sm`. Bề mặt lồng (`inset`/input): `#F6F8FA`.
- **10% — Màu nhấn chính (Azure Blue):** `#2563EB` (hover `#1D4ED8`).
- **Chữ viết:** Chính `#1F2328`, phụ `#57606A`.

### Semantic Tech Accents (`Tinted Badges`)
- **Blue (Cloud / System / Active):** `bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20`
- **Amber (Grafana / Monitoring / Telemetry):** `bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20`
- **Emerald (SecOps / Online / Verified):** `bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20`
- **Sky (DevOps / Workflow / Code):** `bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20`

### Hero & Terminal Window
- Phía sau `InteractiveTerminal` sử dụng một vùng ánh sáng radial gradient xanh Blue/Cyan cực nhẹ (`rgba(59,130,246,0.16)` → `rgba(6,182,212,0.08)`) làm điểm nhấn thị giác.
- Cửa sổ `InteractiveTerminal` giữ nền tối `#0D1117` (header/footer `#161B22`, viền `#30363D`) trên cả 2 chế độ Sáng/Tối kèm syntax highlighting theo ngữ cảnh lệnh (`whoami`, `skills`, `projects`, `status`, `help`).

## 3. Typography & Accessibility
- **Font Tiếng Việt:** `Be Vietnam Pro` (fallback `Inter`, `system-ui`).
- **Font Kỹ thuật / Terminal:** `JetBrains Mono` (fallback `Fira Code`, `monospace`).
- **Accessibility:** Tỷ lệ tương phản chữ đạt WCAG AA/AAA, `cursor-pointer` trên toàn bộ phần tử tương tác, `focus-visible` rõ nét và hỗ trợ `prefers-reduced-motion`.
