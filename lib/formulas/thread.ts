/**
 * Công thức ren hệ mét (ISO metric thread, ren ngoài).
 * - D: đường kính danh nghĩa (mm)
 * - p: bước ren (mm)
 */

/** Bảng bước ren thô tiêu chuẩn hệ mét (size -> pitch mm). */
const METRIC_PITCH_TABLE: Record<string, number> = {
  M3: 0.5,
  M4: 0.7,
  M5: 0.8,
  M6: 1,
  M8: 1.25,
  M10: 1.5,
  M12: 1.75,
  M14: 2,
  M16: 2,
  M18: 2.5,
  M20: 2.5,
  M22: 2.5,
  M24: 3,
  M27: 3,
  M30: 3.5,
};

/**
 * Kiểm tra đường kính và bước ren đều dương.
 * @param D - Đường kính danh nghĩa (mm)
 * @param p - Bước ren (mm)
 * @throws {Error} Khi D hoặc p không hợp lệ (<= 0)
 */
function assertThreadInputs(D: number, p: number): void {
  if (!Number.isFinite(D) || D <= 0) {
    throw new Error('Đường kính danh nghĩa D phải lớn hơn 0');
  }
  if (!Number.isFinite(p) || p <= 0) {
    throw new Error('Bước ren p phải lớn hơn 0');
  }
}

/**
 * Tính đường kính chân ren (minor diameter) cho ren ngoài hệ mét.
 * Công thức: d1 = D - 1.0825 * p
 * @param D - Đường kính danh nghĩa (mm), phải > 0
 * @param p - Bước ren (mm), phải > 0
 * @returns Đường kính chân ren (mm)
 * @throws {Error} Khi D, p không hợp lệ hoặc kết quả không dương
 */
export function calcMinorDiameter(D: number, p: number): number {
  assertThreadInputs(D, p);
  const result: number = D - 1.0825 * p;
  if (result <= 0) {
    throw new Error('Bước ren p quá lớn so với đường kính D');
  }
  return result;
}

/**
 * Tính đường kính trung bình (pitch diameter) cho ren ngoài hệ mét.
 * Công thức: d2 = D - 0.6495 * p
 * @param D - Đường kính danh nghĩa (mm), phải > 0
 * @param p - Bước ren (mm), phải > 0
 * @returns Đường kính trung bình (mm)
 * @throws {Error} Khi D, p không hợp lệ hoặc kết quả không dương
 */
export function calcPitchDiameter(D: number, p: number): number {
  assertThreadInputs(D, p);
  const result: number = D - 0.6495 * p;
  if (result <= 0) {
    throw new Error('Bước ren p quá lớn so với đường kính D');
  }
  return result;
}

/**
 * Tính đường kính mũi khoan trước khi taro (drill size).
 * Công thức: D_khoan = D - p
 * @param D - Đường kính danh nghĩa (mm), phải > 0
 * @param p - Bước ren (mm), phải > 0
 * @returns Đường kính mũi khoan (mm)
 * @throws {Error} Khi D, p không hợp lệ hoặc kết quả không dương
 */
export function calcDrillSize(D: number, p: number): number {
  assertThreadInputs(D, p);
  const result: number = D - p;
  if (result <= 0) {
    throw new Error('Bước ren p quá lớn so với đường kính D');
  }
  return result;
}

/**
 * Tra bước ren thô tiêu chuẩn theo ký hiệu ren hệ mét.
 * Hỗ trợ "M10", "m10", "M10x1.5" (chỉ lấy phần trước dấu x).
 * @param size - Ký hiệu ren, ví dụ "M10"
 * @returns Bước ren tiêu chuẩn (mm)
 * @throws {Error} Khi không tìm thấy ký hiệu trong bảng tra
 */
export function lookupMetricPitch(size: string): number {
  const normalized: string = size.trim().toUpperCase().split('X')[0]?.trim() ?? '';
  const pitch: number | undefined = METRIC_PITCH_TABLE[normalized];
  if (pitch === undefined) {
    throw new Error(`Không tìm thấy bước ren cho ký hiệu: ${size}`);
  }
  return pitch;
}
