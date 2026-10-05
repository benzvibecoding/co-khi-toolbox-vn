// Ký hiệu bản vẽ cơ khí thường gặp: kích thước, hình học (GD&T), nhám, ren, hàn, vật liệu.

export type DrawingSymbolCategory =
  | 'size'
  | 'geometric'
  | 'roughness'
  | 'thread'
  | 'weld'
  | 'material';

export interface DrawingSymbol {
  id: string;
  symbol: string;
  name: string;
  category: DrawingSymbolCategory;
  description: string;
  unit?: string;
  example?: string;
  note?: string;
}

export const DRAWING_CATEGORIES: { id: DrawingSymbolCategory; label: string }[] = [
  { id: 'size', label: 'Kích thước' },
  { id: 'geometric', label: 'Dung sai hình học (GD&T)' },
  { id: 'roughness', label: 'Độ nhám bề mặt' },
  { id: 'thread', label: 'Ren' },
  { id: 'weld', label: 'Mối hàn' },
  { id: 'material', label: 'Vật liệu / Độ cứng' },
];

export const DRAWING_SYMBOLS: DrawingSymbol[] = [
  {
    id: 'diameter',
    symbol: 'Ø',
    name: 'Đường kính',
    category: 'size',
    description:
      'Đặt trước con số để chỉ đó là đường kính của lỗ hoặc trục tròn xoay, thay cho chữ "phi".',
    example: 'Ø25 H7 (lỗ đường kính 25, cấp dung sai H7)',
    note: 'Không nhầm với ký hiệu mặt cầu SØ.',
  },
  {
    id: 'radius',
    symbol: 'R',
    name: 'Bán kính',
    category: 'size',
    description: 'Chỉ bán kính cung tròn, góc lượn. Con số sau R là giá trị bán kính.',
    example: 'R5 (cung tròn bán kính 5 mm)',
  },
  {
    id: 'chamfer',
    symbol: 'C',
    name: 'Vát mép (Chamfer)',
    category: 'size',
    description:
      'Chỉ kích thước vát mép 45°. Ghi dạng C × chiều dài cạnh vát để xưởng không phải đo góc.',
    example: 'C2 × 45° (vát mép 2 mm)',
    note: 'Vát mép giúp lắp ghép dễ và an toàn khi cầm nắm.',
  },
  {
    id: 'spherical-radius',
    symbol: 'SR',
    name: 'Bán kính cầu',
    category: 'size',
    description: 'Chỉ bán kính của bề mặt cầu (mặt chỏm cầu), ví dụ đầu chỏm cầu, rãnh bi.',
    example: 'SR10 (mặt cầu bán kính 10 mm)',
  },
  {
    id: 'spherical-diameter',
    symbol: 'SØ',
    name: 'Đường kính cầu',
    category: 'size',
    description: 'Chỉ đường kính của viên bi hoặc bề mặt cầu hoàn chỉnh.',
    example: 'SØ20 (viên bi đường kính 20 mm)',
  },
  {
    id: 'perpendicularity',
    symbol: '⊥',
    name: 'Độ vuông góc',
    category: 'geometric',
    description:
      'Vùng dung sai giới hạn độ lệch khỏi góc 90° so với chuẩn. Trị số trong khung là bề rộng vùng dung sai.',
    example: '⊥ 0,02 A (vuông góc với mặt chuẩn A trong phạm vi 0,02 mm)',
  },
  {
    id: 'parallelism',
    symbol: '∥',
    name: 'Độ song song',
    category: 'geometric',
    description:
      'Kiểm soát hai mặt (hoặc đường) luôn song song nhau trong phạm vi dung sai so với chuẩn.',
    example: '∥ 0,03 A (song song với mặt A, sai lệch cho phép 0,03 mm)',
  },
  {
    id: 'roundness',
    symbol: '○',
    name: 'Độ tròn',
    category: 'geometric',
    description:
      'Mặt cắt ngang của trục/lỗ phải nằm giữa hai vòng tròn đồng tâm cách nhau bằng trị số dung sai.',
    example: '○ 0,01 (sai lệch tròn cho phép 0,01 mm)',
  },
  {
    id: 'flatness',
    symbol: '□',
    name: 'Độ phẳng',
    category: 'geometric',
    description:
      'Bề mặt phải nằm giữa hai mặt phẳng song song cách nhau bằng trị số dung sai. Trên bản vẽ ISO chuẩn vẽ dạng hình bình hành.',
    example: '0,02 (mặt bích phẳng trong phạm vi 0,02 mm)',
    note: 'Ký hiệu ISO chính xác là hình bình hành; □ là cách viết gọn thường gặp.',
  },
  {
    id: 'cylindricity',
    symbol: '⌭',
    name: 'Độ trụ',
    category: 'geometric',
    description:
      'Toàn bộ bề mặt trụ phải nằm giữa hai mặt trụ đồng trục. Là yêu cầu khắt khe gộp cả tròn, thẳng và song song đường sinh.',
    example: '⌭ 0,015 (mặt trụ sai lệch cho phép 0,015 mm)',
  },
  {
    id: 'straightness',
    symbol: '—',
    name: 'Độ thẳng',
    category: 'geometric',
    description:
      'Đường sinh hoặc trục chi tiết phải thẳng trong phạm vi dung sai. Có thể áp cho một đường trên mặt hoặc toàn bộ trục.',
    example: '0,02/100 (thẳng 0,02 mm trên chiều dài 100 mm)',
  },
  {
    id: 'position',
    symbol: '⌖',
    name: 'Vị trí (Position)',
    category: 'geometric',
    description:
      'Tâm lỗ hoặc điểm phải nằm trong vùng dung sai (thường là hình tròn) quanh vị trí lý thuyết so với các chuẩn.',
    example: '⌖ Ø0,1 A B (tâm lỗ lệch cho phép trong vòng Ø0,1 so với chuẩn A, B)',
  },
  {
    id: 'runout',
    symbol: '↗',
    name: 'Độ đảo (Runout)',
    category: 'geometric',
    description:
      'Độ đảo hướng kính hoặc hướng trục khi quay chi tiết một vòng quanh chuẩn. Thường kiểm bằng đồng hồ so.',
    example: '↗ 0,05 A (độ đảo cho phép 0,05 mm so với trục chuẩn A)',
    note: 'Độ đảo tổng (total runout) áp cho toàn bộ bề mặt, ký hiệu mũi tên đôi.',
  },
  {
    id: 'roughness-ra',
    symbol: 'Ra',
    name: 'Nhám trung bình Ra',
    category: 'roughness',
    description:
      'Giá trị trung bình số học của biên độ nhám bề mặt. Là chỉ tiêu nhám phổ biến nhất trên bản vẽ Việt Nam.',
    unit: 'µm',
    example: 'Ra 3,2 (tiện thô) — Ra 0,8 (tiện/mài tinh)',
    note: 'Số càng nhỏ bề mặt càng bóng nhưng gia công càng đắt.',
  },
  {
    id: 'roughness-rz',
    symbol: 'Rz',
    name: 'Nhám Rz (chiều cao lớn nhất)',
    category: 'roughness',
    description:
      'Trung bình chiều cao từ đỉnh cao nhất tới đáy thấp nhất của 5 đoạn đo. Nhạy với vết xước đơn lẻ hơn Ra.',
    unit: 'µm',
    example: 'Rz 16 tương đương khoảng Ra 3,2',
  },
  {
    id: 'roughness-rmax',
    symbol: 'Rmax',
    name: 'Nhám Rmax (cũ) / Rt',
    category: 'roughness',
    description:
      'Khoảng cách lớn nhất đỉnh–đáy trên toàn chiều dài đánh giá. Ký hiệu Rmax thường gặp trên bản vẽ cũ, nay ghi là Rt.',
    unit: 'µm',
    example: 'Rmax 20 (bản vẽ cũ)',
    note: 'Bản vẽ mới nên dùng Ra hoặc Rz theo ISO 21920.',
  },
  {
    id: 'thread-metric',
    symbol: 'M',
    name: 'Ren hệ mét',
    category: 'thread',
    description:
      'Ren tam giác hệ mét ISO. Ghi đường kính danh nghĩa × bước ren; bước thô có thể lược bỏ.',
    example: 'M10 × 1,5 (ren thô) — M10 × 1,25 (ren tinh)',
  },
  {
    id: 'thread-g',
    symbol: 'G',
    name: 'Ren ống trụ (BSPP)',
    category: 'thread',
    description:
      'Ren ống song song hệ inch (British Standard Pipe Parallel), dùng cho mối nối kín bằng gioăng, long đen.',
    example: 'G1/2 (ren ống danh nghĩa 1/2 inch)',
    note: 'Không tự làm kín: cần thêm băng tan hoặc gioăng.',
  },
  {
    id: 'thread-rc',
    symbol: 'Rc',
    name: 'Ren ống côn (BSPT)',
    category: 'thread',
    description:
      'Ren ống côn trong hệ inch, tự làm kín nhờ độ côn 1:16 khi siết chặt với ren côn ngoài R.',
    example: 'Rc3/4 (ren côn trong 3/4 inch)',
  },
  {
    id: 'thread-unc',
    symbol: 'UNC',
    name: 'Ren Unified bước thô',
    category: 'thread',
    description:
      'Ren hệ inch kiểu Mỹ bước thô (Unified Coarse). Ghi đường kính – số ren trên 1 inch – UNC.',
    example: '1/4"-20 UNC (đường kính 1/4 inch, 20 ren/inch)',
  },
  {
    id: 'thread-unf',
    symbol: 'UNF',
    name: 'Ren Unified bước tinh',
    category: 'thread',
    description:
      'Ren hệ inch kiểu Mỹ bước tinh (Unified Fine), chịu rung và điều chỉnh tinh tốt hơn UNC.',
    example: '1/4"-28 UNF (đường kính 1/4 inch, 28 ren/inch)',
  },
  {
    id: 'fillet-weld',
    symbol: '⊿',
    name: 'Mối hàn góc (Fillet)',
    category: 'weld',
    description:
      'Ký hiệu tam giác vuông chỉ mối hàn góc chữ T hoặc hàn chồng. Con số cạnh tam giác là chiều cao mối hàn (cạnh góc vuông).',
    example: '⊿ 6 (mối hàn góc cao 6 mm)',
    note: 'Vẽ ở phía đường mũi tên nếu hàn mặt phía mũi tên.',
  },
  {
    id: 'field-weld',
    symbol: '○',
    name: 'Hàn tại công trường (Field weld)',
    category: 'weld',
    description:
      'Vòng tròn nhỏ tại "nút" ký hiệu hàn cho biết mối hàn thực hiện tại hiện trường lắp dựng, không hàn ở xưởng.',
    example: 'Ký hiệu hàn có thêm vòng tròn ○ tại điểm giao',
  },
  {
    id: 'hardness-hrc',
    symbol: 'HRC',
    name: 'Độ cứng Rockwell C',
    category: 'material',
    description:
      'Độ cứng Rockwell thang C (mũi kim cương, tải 150 kgf), dùng cho thép đã tôi cứng.',
    example: '58–60 HRC (dao, khuôn dập nguội)',
    note: 'Ghi kèm vị trí đo nếu chi tiết chỉ cứng cục bộ.',
  },
  {
    id: 'hardness-hb',
    symbol: 'HB',
    name: 'Độ cứng Brinell',
    category: 'material',
    description:
      'Độ cứng Brinell (bi thép/carbide ép lõm), dùng cho vật liệu mềm đến trung bình: gang, thép ủ, nhôm.',
    example: '180–220 HB (thép S45C)',
  },
];

/** Lấy ký hiệu theo id. */
export function getSymbolById(id: string): DrawingSymbol | undefined {
  return DRAWING_SYMBOLS.find((s) => s.id === id.trim().toLowerCase());
}

/** Lọc ký hiệu theo nhóm. */
export function getSymbolsByCategory(category: DrawingSymbolCategory): DrawingSymbol[] {
  return DRAWING_SYMBOLS.filter((s) => s.category === category);
}
