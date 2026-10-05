// Thư viện công thức cơ khí: mỗi công thức kèm biến số và ví dụ số cụ thể từng bước.

export interface FormulaVariable {
  symbol: string;
  name: string;
  unit: string;
}

export interface FormulaExample {
  /** Dữ kiện đầu vào của ví dụ. */
  given: string;
  /** Kết quả cuối cùng (kèm đơn vị). */
  result: string;
  /** Các bước tính, mỗi bước một dòng. */
  steps: string[];
}

export interface FormulaEntry {
  id: string;
  category: string;
  name: string;
  formula: string;
  variables: FormulaVariable[];
  example: FormulaExample;
}

export const FORMULAS: FormulaEntry[] = [
  {
    id: 'toc-do-cat',
    category: 'Cắt gọt',
    name: 'Tốc độ cắt (Vc)',
    formula: 'Vc = (π × D × n) / 1000',
    variables: [
      { symbol: 'Vc', name: 'Tốc độ cắt', unit: 'm/ph' },
      { symbol: 'D', name: 'Đường kính dao/phôi', unit: 'mm' },
      { symbol: 'n', name: 'Vòng quay trục chính', unit: 'vòng/ph' },
    ],
    example: {
      given: 'Dao phay D = 20 mm, n = 1500 vòng/ph',
      result: 'Vc ≈ 94,2 m/ph',
      steps: [
        'Bước 1: Vc = (3,1416 × 20 × 1500) / 1000',
        'Bước 2: tử số = 3,1416 × 20 × 1500 = 94 248',
        'Bước 3: Vc = 94 248 / 1000 ≈ 94,2 m/ph',
      ],
    },
  },
  {
    id: 'rpm',
    category: 'Cắt gọt',
    name: 'Vòng quay trục chính (n)',
    formula: 'n = (1000 × Vc) / (π × D)',
    variables: [
      { symbol: 'n', name: 'Vòng quay trục chính', unit: 'vòng/ph' },
      { symbol: 'Vc', name: 'Tốc độ cắt', unit: 'm/ph' },
      { symbol: 'D', name: 'Đường kính dao/phôi', unit: 'mm' },
    ],
    example: {
      given: 'Tiện thép với Vc = 150 m/ph, phôi D = 50 mm',
      result: 'n ≈ 955 vòng/ph',
      steps: [
        'Bước 1: n = (1000 × 150) / (3,1416 × 50)',
        'Bước 2: mẫu số = 3,1416 × 50 = 157,08',
        'Bước 3: n = 150 000 / 157,08 ≈ 955 vòng/ph (chọn 950 trên máy)',
      ],
    },
  },
  {
    id: 'feed',
    category: 'Cắt gọt',
    name: 'Lượng chạy dao (Vf)',
    formula: 'Vf = fz × z × n',
    variables: [
      { symbol: 'Vf', name: 'Lượng chạy dao (bước tiến bàn)', unit: 'mm/ph' },
      { symbol: 'fz', name: 'Lượng ăn dao mỗi răng (chip load)', unit: 'mm/răng' },
      { symbol: 'z', name: 'Số lưỡi cắt', unit: 'răng' },
      { symbol: 'n', name: 'Vòng quay trục chính', unit: 'vòng/ph' },
    ],
    example: {
      given: 'fz = 0,1 mm/răng, dao 4 me (z = 4), n = 2000 vòng/ph',
      result: 'Vf = 800 mm/ph',
      steps: [
        'Bước 1: Vf = 0,1 × 4 × 2000',
        'Bước 2: 0,1 × 4 = 0,4 mm/vòng (lượng chạy dao mỗi vòng)',
        'Bước 3: Vf = 0,4 × 2000 = 800 mm/ph',
      ],
    },
  },
  {
    id: 'chip-load',
    category: 'Cắt gọt',
    name: 'Chip load (fz)',
    formula: 'fz = Vf / (z × n)',
    variables: [
      { symbol: 'fz', name: 'Lượng ăn dao mỗi răng', unit: 'mm/răng' },
      { symbol: 'Vf', name: 'Lượng chạy dao', unit: 'mm/ph' },
      { symbol: 'z', name: 'Số lưỡi cắt', unit: 'răng' },
      { symbol: 'n', name: 'Vòng quay trục chính', unit: 'vòng/ph' },
    ],
    example: {
      given: 'Vf = 600 mm/ph, dao 3 me, n = 2500 vòng/ph',
      result: 'fz = 0,08 mm/răng',
      steps: [
        'Bước 1: fz = 600 / (3 × 2500)',
        'Bước 2: mẫu số = 3 × 2500 = 7500',
        'Bước 3: fz = 600 / 7500 = 0,08 mm/răng (hợp lý cho dao Ø10 phay nhôm/thép nhẹ)',
      ],
    },
  },
  {
    id: 'mrr',
    category: 'Cắt gọt',
    name: 'Tốc độ bóc tách vật liệu (MRR)',
    formula: 'MRR = ap × ae × Vf',
    variables: [
      { symbol: 'MRR', name: 'Thể tích phoi bóc tách mỗi phút', unit: 'cm³/ph' },
      { symbol: 'ap', name: 'Chiều sâu cắt', unit: 'mm' },
      { symbol: 'ae', name: 'Chiều rộng cắt', unit: 'mm' },
      { symbol: 'Vf', name: 'Lượng chạy dao', unit: 'mm/ph' },
    ],
    example: {
      given: 'ap = 3 mm, ae = 10 mm, Vf = 500 mm/ph',
      result: 'MRR = 15 cm³/ph',
      steps: [
        'Bước 1: MRR = 3 × 10 × 500 = 15 000 mm³/ph',
        'Bước 2: đổi đơn vị: 1 cm³ = 1000 mm³',
        'Bước 3: MRR = 15 000 / 1000 = 15 cm³/ph',
      ],
    },
  },
  {
    id: 'machining-time',
    category: 'Cắt gọt',
    name: 'Thời gian gia công (Tm)',
    formula: 'Tm = L / Vf',
    variables: [
      { symbol: 'Tm', name: 'Thời gian cắt', unit: 'phút' },
      { symbol: 'L', name: 'Tổng chiều dài đường chạy dao (gồm vào/ra dao)', unit: 'mm' },
      { symbol: 'Vf', name: 'Lượng chạy dao', unit: 'mm/ph' },
    ],
    example: {
      given: 'Rãnh dài 200 mm, vào/ra dao thêm 20 mm (L = 220 mm), Vf = 400 mm/ph',
      result: 'Tm = 0,55 phút (≈ 33 giây)',
      steps: [
        'Bước 1: Tm = 220 / 400 = 0,55 phút',
        'Bước 2: đổi ra giây: 0,55 × 60 = 33 giây',
        'Bước 3: cộng thêm thời gian thay dao, gá đặt khi báo giá thực tế',
      ],
    },
  },
  {
    id: 'power',
    category: 'Cắt gọt',
    name: 'Công suất cắt (P)',
    formula: 'P = (Fc × Vc) / 60000',
    variables: [
      { symbol: 'P', name: 'Công suất cắt', unit: 'kW' },
      { symbol: 'Fc', name: 'Lực cắt chính', unit: 'N' },
      { symbol: 'Vc', name: 'Tốc độ cắt', unit: 'm/ph' },
    ],
    example: {
      given: 'Fc = 1200 N, Vc = 150 m/ph',
      result: 'P = 3 kW',
      steps: [
        'Bước 1: P = (1200 × 150) / 60000',
        'Bước 2: tử số = 180 000',
        'Bước 3: P = 180 000 / 60000 = 3 kW (chọn máy có công suất trục chính ≥ 4–5 kW để dự phòng)',
      ],
    },
  },
  {
    id: 'torque',
    category: 'Cắt gọt',
    name: 'Mô-men xoắn (T)',
    formula: 'T = (P × 9550) / n',
    variables: [
      { symbol: 'T', name: 'Mô-men xoắn', unit: 'N·m' },
      { symbol: 'P', name: 'Công suất', unit: 'kW' },
      { symbol: 'n', name: 'Vòng quay', unit: 'vòng/ph' },
    ],
    example: {
      given: 'Động cơ P = 5,5 kW tại n = 1450 vòng/ph',
      result: 'T ≈ 36,2 N·m',
      steps: [
        'Bước 1: T = (5,5 × 9550) / 1450',
        'Bước 2: tử số = 5,5 × 9550 = 52 525',
        'Bước 3: T = 52 525 / 1450 ≈ 36,2 N·m',
      ],
    },
  },
  {
    id: 'stress',
    category: 'Sức bền',
    name: 'Ứng suất kéo/nén (σ)',
    formula: 'σ = F / A',
    variables: [
      { symbol: 'σ', name: 'Ứng suất', unit: 'MPa (N/mm²)' },
      { symbol: 'F', name: 'Lực dọc trục', unit: 'N' },
      { symbol: 'A', name: 'Diện tích mặt cắt', unit: 'mm²' },
    ],
    example: {
      given: 'Thanh thép Ø20 mm chịu kéo F = 40 000 N',
      result: 'σ ≈ 127,3 MPa (an toàn cho S45C, chảy 345 MPa)',
      steps: [
        'Bước 1: A = π × 20² / 4 = 314,16 mm²',
        'Bước 2: σ = 40 000 / 314,16 ≈ 127,3 MPa',
        'Bước 3: hệ số an toàn so với chảy: 345 / 127,3 ≈ 2,7 (đạt)',
      ],
    },
  },
  {
    id: 'mass-cylinder',
    category: 'Khối lượng',
    name: 'Khối lượng phôi trụ tròn',
    formula: 'm = (π × D² / 4) × L × ρ / 1000',
    variables: [
      { symbol: 'm', name: 'Khối lượng', unit: 'kg' },
      { symbol: 'D', name: 'Đường kính phôi', unit: 'mm' },
      { symbol: 'L', name: 'Chiều dài phôi', unit: 'mm' },
      { symbol: 'ρ', name: 'Khối lượng riêng', unit: 'g/cm³' },
    ],
    example: {
      given: 'Phôi thép S45C Ø60 × 200 mm, ρ = 7,85 g/cm³',
      result: 'm ≈ 4,44 kg',
      steps: [
        'Bước 1: V = 3,1416 × 60² / 4 × 200 = 565 487 mm³ = 565,49 cm³',
        'Bước 2: m = 565,49 × 7,85 = 4 439 g',
        'Bước 3: m ≈ 4,44 kg',
      ],
    },
  },
  {
    id: 'mass-box',
    category: 'Khối lượng',
    name: 'Khối lượng phôi hộp (tấm/block)',
    formula: 'm = L × W × H × ρ / 1 000 000',
    variables: [
      { symbol: 'm', name: 'Khối lượng', unit: 'kg' },
      { symbol: 'L', name: 'Chiều dài', unit: 'mm' },
      { symbol: 'W', name: 'Chiều rộng', unit: 'mm' },
      { symbol: 'H', name: 'Chiều dày/cao', unit: 'mm' },
      { symbol: 'ρ', name: 'Khối lượng riêng', unit: 'g/cm³' },
    ],
    example: {
      given: 'Tấm nhôm A6061 500 × 300 × 20 mm, ρ = 2,7 g/cm³',
      result: 'm = 8,1 kg',
      steps: [
        'Bước 1: V = 500 × 300 × 20 = 3 000 000 mm³ = 3000 cm³',
        'Bước 2: m = 3000 × 2,7 = 8100 g',
        'Bước 3: m = 8,1 kg',
      ],
    },
  },
  {
    id: 'thread-drill',
    category: 'Ren',
    name: 'Mũi khoan taro (ren mét)',
    formula: 'D_khoan ≈ D − p',
    variables: [
      { symbol: 'D_khoan', name: 'Đường kính mũi khoan', unit: 'mm' },
      { symbol: 'D', name: 'Đường kính danh nghĩa của ren', unit: 'mm' },
      { symbol: 'p', name: 'Bước ren', unit: 'mm' },
    ],
    example: {
      given: 'Taro M10 × 1,5',
      result: 'Khoan Ø8,5 mm',
      steps: [
        'Bước 1: D_khoan = 10 − 1,5 = 8,5 mm',
        'Bước 2: chọn mũi khoan tiêu chuẩn Ø8,5 mm',
        'Bước 3: với vật liệu cứng/gang giòn có thể khoan lớn hơn 0,05–0,1 mm',
      ],
    },
  },
  {
    id: 'tolerance',
    category: 'Dung sai',
    name: 'Miền dung sai (T)',
    formula: 'T = ES − EI = max − min',
    variables: [
      { symbol: 'T', name: 'Độ lớn miền dung sai', unit: 'mm' },
      { symbol: 'ES', name: 'Sai lệch giới hạn trên', unit: 'mm' },
      { symbol: 'EI', name: 'Sai lệch giới hạn dưới', unit: 'mm' },
    ],
    example: {
      given: 'Lỗ Ø25 H7 có kích thước giới hạn 25,000–25,021 mm',
      result: 'T = 0,021 mm (21 micron, đúng IT7 của khoảng 18–30)',
      steps: [
        'Bước 1: T = 25,021 − 25,000 = 0,021 mm',
        'Bước 2: đổi ra micron: 0,021 × 1000 = 21 micron',
        'Bước 3: tra bảng IT: khoảng 18–30, IT7 = 21 micron (khớp)',
      ],
    },
  },
  {
    id: 'gear',
    category: 'Bánh răng',
    name: 'Đường kính vòng chia (d)',
    formula: 'd = m × z',
    variables: [
      { symbol: 'd', name: 'Đường kính vòng chia', unit: 'mm' },
      { symbol: 'm', name: 'Module', unit: 'mm' },
      { symbol: 'z', name: 'Số răng', unit: 'răng' },
    ],
    example: {
      given: 'Bánh răng module m = 2, z = 30 răng',
      result: 'd = 60 mm',
      steps: [
        'Bước 1: d = 2 × 30 = 60 mm',
        'Bước 2: đường kính đỉnh: da = d + 2m = 64 mm',
        'Bước 3: khoảng cách trục với bánh đối tiếp cùng module m = 2, z2 = 45: a = 2 × (30 + 45) / 2 = 75 mm',
      ],
    },
  },
];

/** Lấy công thức theo id. */
export function getFormulaById(id: string): FormulaEntry | undefined {
  return FORMULAS.find((f) => f.id === id.trim().toLowerCase());
}
