// Kiểu dung sai lắp ghép dùng chung.

/** Phân loại mối lắp. */
export type FitType = 'clearance' | 'transition' | 'interference';

/** Kết quả tính toán một mối lắp lỗ–trục. */
export interface ToleranceResult {
  /** Kích thước danh nghĩa (mm). */
  nominalSize: number;
  /** Ký hiệu kiểu lắp, ví dụ 'H7/g6'. */
  fitCode: string;
  fitType: FitType;
  /** Giới hạn lỗ (mm). */
  holeMin: number;
  holeMax: number;
  /** Giới hạn trục (mm). */
  shaftMin: number;
  shaftMax: number;
  /** Khe hở nhỏ nhất (mm). Âm nghĩa là độ dôi. */
  minClearance: number;
  /** Khe hở lớn nhất (mm). Âm nghĩa là độ dôi. */
  maxClearance: number;
  /** Giải thích ngắn gọn bằng tiếng Việt. */
  description: string;
}
