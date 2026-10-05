// Bảng ren hệ mét ISO (M3–M30) và ren Unified UNC/UNF (1/4", 3/8", 1/2").
// Mũi khoan taro = đường kính danh nghĩa − bước ren (làm tròn xuống cấp khoan phổ biến).

export interface ThreadRow {
  /** Ký hiệu tra cứu, ví dụ 'M10' hoặc '1/4"'. */
  designation: string;
  /** Đường kính danh nghĩa (mm). Ren inch đã quy đổi ra mm. */
  diameter: number;
  /** Bước ren thô (mm). Với ren inch: 25,4 / TPI. */
  pitchCoarse: number;
  /** Bước ren tinh (mm), nếu có. */
  pitchFine?: number;
  /** Mũi khoan taro cho bước thô (mm). */
  drillCoarse: number;
  /** Mũi khoan taro cho bước tinh (mm), nếu có. */
  drillFine?: number;
  /** Số ren trên 1 inch cho bước thô (ren Unified). */
  tpiUNC?: number;
  /** Số ren trên 1 inch cho bước tinh (ren Unified). */
  tpiUNF?: number;
}

export const METRIC_THREADS: ThreadRow[] = [
  { designation: 'M3', diameter: 3, pitchCoarse: 0.5, pitchFine: 0.35, drillCoarse: 2.5, drillFine: 2.65 },
  { designation: 'M4', diameter: 4, pitchCoarse: 0.7, pitchFine: 0.5, drillCoarse: 3.3, drillFine: 3.5 },
  { designation: 'M5', diameter: 5, pitchCoarse: 0.8, pitchFine: 0.5, drillCoarse: 4.2, drillFine: 4.5 },
  { designation: 'M6', diameter: 6, pitchCoarse: 1.0, pitchFine: 0.75, drillCoarse: 5.0, drillFine: 5.25 },
  { designation: 'M8', diameter: 8, pitchCoarse: 1.25, pitchFine: 1.0, drillCoarse: 6.8, drillFine: 7.0 },
  { designation: 'M10', diameter: 10, pitchCoarse: 1.5, pitchFine: 1.25, drillCoarse: 8.5, drillFine: 8.75 },
  { designation: 'M12', diameter: 12, pitchCoarse: 1.75, pitchFine: 1.25, drillCoarse: 10.2, drillFine: 10.75 },
  { designation: 'M14', diameter: 14, pitchCoarse: 2.0, pitchFine: 1.5, drillCoarse: 12.0, drillFine: 12.5 },
  { designation: 'M16', diameter: 16, pitchCoarse: 2.0, pitchFine: 1.5, drillCoarse: 14.0, drillFine: 14.5 },
  { designation: 'M18', diameter: 18, pitchCoarse: 2.5, pitchFine: 1.5, drillCoarse: 15.5, drillFine: 16.5 },
  { designation: 'M20', diameter: 20, pitchCoarse: 2.5, pitchFine: 1.5, drillCoarse: 17.5, drillFine: 18.5 },
  { designation: 'M22', diameter: 22, pitchCoarse: 2.5, pitchFine: 1.5, drillCoarse: 19.5, drillFine: 20.5 },
  { designation: 'M24', diameter: 24, pitchCoarse: 3.0, pitchFine: 2.0, drillCoarse: 21.0, drillFine: 22.0 },
  { designation: 'M27', diameter: 27, pitchCoarse: 3.0, pitchFine: 2.0, drillCoarse: 24.0, drillFine: 25.0 },
  { designation: 'M30', diameter: 30, pitchCoarse: 3.5, pitchFine: 2.0, drillCoarse: 26.5, drillFine: 28.0 },
];

export const UNC_UNF_THREADS: ThreadRow[] = [
  {
    designation: '1/4"',
    diameter: 6.35,
    pitchCoarse: 1.27,
    pitchFine: 0.907,
    drillCoarse: 5.1,
    drillFine: 5.5,
    tpiUNC: 20,
    tpiUNF: 28,
  },
  {
    designation: '3/8"',
    diameter: 9.525,
    pitchCoarse: 1.588,
    pitchFine: 1.058,
    drillCoarse: 7.9,
    drillFine: 8.5,
    tpiUNC: 16,
    tpiUNF: 24,
  },
  {
    designation: '1/2"',
    diameter: 12.7,
    pitchCoarse: 1.954,
    pitchFine: 1.27,
    drillCoarse: 10.8,
    drillFine: 11.5,
    tpiUNC: 13,
    tpiUNF: 20,
  },
];

/** Chuẩn hoá chuỗi tra cứu: viết hoa, bỏ khoảng trắng và dấu nháy inch. */
function normalizeDesignation(input: string): string {
  return input.trim().toUpperCase().replace(/[\s"″”]/g, '');
}

/** Tra cứu 1 cỡ ren theo ký hiệu ('M10', 'M10x1.5', '1/4', '1/4-20', '3/8 UNC'...). */
export function lookupThread(designation: string): ThreadRow | undefined {
  const key = normalizeDesignation(designation);
  if (key === '') return undefined;
  const all: ThreadRow[] = [...METRIC_THREADS, ...UNC_UNF_THREADS];
  const exact = all.find((t) => normalizeDesignation(t.designation) === key);
  if (exact !== undefined) return exact;
  // Ren mét ghi kèm bước ren: 'M10X1.5' -> khớp tiền tố 'M10'.
  if (key.startsWith('M')) {
    const metricMatch = /^M(\d+)/.exec(key);
    if (metricMatch !== null && metricMatch[1] !== undefined) {
      const base = `M${metricMatch[1]}`;
      return METRIC_THREADS.find((t) => t.designation === base);
    }
  }
  // Ren inch ghi kèm TPI: '1/4-20' -> khớp '1/4'.
  const inchBase = key.split('-')[0];
  if (inchBase !== undefined && inchBase !== '') {
    return UNC_UNF_THREADS.find((t) => normalizeDesignation(t.designation) === inchBase);
  }
  return undefined;
}
