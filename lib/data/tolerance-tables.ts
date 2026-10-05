// Bảng dung sai ISO 286-1 rút gọn: khoảng kích thước danh nghĩa, cấp chính xác IT5–IT11,
// các kiểu lắp thông dụng hệ lỗ cơ bản H7.

import type { FitType } from '@/types/tolerance';

export interface SizeRange {
  /** Cận dưới (không bao gồm), mm. */
  min: number;
  /** Cận trên (bao gồm), mm. */
  max: number;
  label: string;
}

/** 12 khoảng kích thước danh nghĩa từ 0 tới 400 mm (quy ước (min, max]). */
export const SIZE_RANGES: SizeRange[] = [
  { min: 0, max: 3, label: '0–3' },
  { min: 3, max: 6, label: '3–6' },
  { min: 6, max: 10, label: '6–10' },
  { min: 10, max: 18, label: '10–18' },
  { min: 18, max: 30, label: '18–30' },
  { min: 30, max: 50, label: '30–50' },
  { min: 50, max: 80, label: '50–80' },
  { min: 80, max: 120, label: '80–120' },
  { min: 120, max: 180, label: '120–180' },
  { min: 180, max: 250, label: '180–250' },
  { min: 250, max: 315, label: '250–315' },
  { min: 315, max: 400, label: '315–400' },
];

/**
 * Giá trị dung sai tiêu chuẩn (micron = 0,001 mm) theo cấp IT.
 * Mỗi mảng có 12 phần tử tương ứng SIZE_RANGES.
 */
export const IT_VALUES: Record<string, number[]> = {
  IT5: [4, 5, 6, 8, 9, 11, 13, 15, 18, 20, 23, 23],
  IT6: [6, 8, 9, 11, 13, 16, 19, 22, 25, 29, 32, 36],
  IT7: [10, 12, 15, 18, 21, 25, 30, 35, 40, 46, 52, 57],
  IT8: [14, 18, 22, 27, 33, 39, 46, 54, 63, 72, 81, 89],
  IT9: [25, 30, 36, 43, 52, 62, 74, 87, 100, 115, 130, 140],
  IT10: [40, 48, 58, 70, 84, 100, 120, 140, 160, 185, 210, 230],
  IT11: [60, 75, 90, 110, 130, 160, 190, 220, 250, 290, 320, 360],
};

export interface CommonFit {
  /** Ký hiệu kiểu lắp, ví dụ 'H7/g6'. */
  fit: string;
  fitType: FitType;
  /** Giải thích bản chất mối lắp. */
  description: string;
  /** Ứng dụng điển hình. */
  application: string;
}

const FIT_TYPE_LABEL: Record<FitType, string> = {
  clearance: 'Lắp lỏng (có khe hở)',
  transition: 'Lắp trung gian',
  interference: 'Lắp chặt (có độ dôi)',
};

export function getFitTypeLabel(fitType: FitType): string {
  return FIT_TYPE_LABEL[fitType];
}

/** 7 kiểu lắp thông dụng hệ lỗ cơ bản H7, từ lỏng tới chặt dần. */
export const COMMON_FITS: CommonFit[] = [
  {
    fit: 'H7/g6',
    fitType: 'clearance',
    description:
      'Lắp lỏng có khe hở nhỏ, chi tiết trượt nhẹ nhàng mà không rơ nhiều. Trục luôn nhỏ hơn lỗ nhỏ nhất.',
    application: 'Bạc lót trượt, piston trong xylanh, trục dẫn hướng tháo lắp thường xuyên.',
  },
  {
    fit: 'H7/f7',
    fitType: 'clearance',
    description:
      'Lắp lỏng vừa với khe hở rõ rệt, quay/trượt tự do ở tốc độ cao, chứa được màng dầu bôi trơn.',
    application: 'Ổ trượt tốc độ cao, bánh răng quay không trên trục, khớp trượt nóng.',
  },
  {
    fit: 'H7/k6',
    fitType: 'transition',
    description:
      'Lắp trung gian: có thể hơi lỏng hoặc hơi chặt tùy chi tiết thực tế, thường lắp bằng tay hoặc gõ nhẹ.',
    application: 'Then, chốt định vị tháo được, vòng bi lắp có thể tháo để bảo trì.',
  },
  {
    fit: 'H7/n6',
    fitType: 'transition',
    description:
      'Lắp trung gian hơi chặt: đa số trường hợp hơi dôi, cần ép nhẹ hoặc nung nhẹ khi lắp, định tâm rất tốt.',
    application: 'Bánh răng, puly cố định trên trục bằng then; bạc lót không quay tương đối.',
  },
  {
    fit: 'H7/p6',
    fitType: 'interference',
    description:
      'Lắp chặt nhẹ: luôn có độ dôi, phải ép nguội bằng lực ép vừa phải, không tự tháo được.',
    application: 'Bạc lót ép vào thân hộp, chốt cố định vĩnh viễn, vòng ngoài ổ lăn tải nhẹ.',
  },
  {
    fit: 'H7/r6',
    fitType: 'interference',
    description:
      'Lắp chặt trung bình: độ dôi đủ truyền mô-men xoắn vừa mà không cần then, cần máy ép thủy lực.',
    application: 'Bánh răng, khớp nối ép trên trục; vòng bi chịu tải nặng quay cùng trục.',
  },
  {
    fit: 'H7/s6',
    fitType: 'interference',
    description:
      'Lắp chặt nặng: độ dôi lớn, thường phải nung nóng lỗ hoặc làm lạnh trục (ép nóng) mới lắp được.',
    application: 'Vòng trong ổ lăn chịu tải va đập, bánh xe lửa trên trục, mối ghép vĩnh cửu.',
  },
];

/**
 * Lấy giá trị dung sai IT (micron) cho kích thước danh nghĩa và cấp chính xác.
 * Trả về undefined nếu size ngoài 0–400 mm hoặc grade ngoài IT5–IT11.
 */
export function getITMicron(size: number, grade: number): number | undefined {
  if (!Number.isFinite(size) || size <= 0 || size > 400) return undefined;
  if (!Number.isInteger(grade) || grade < 5 || grade > 11) return undefined;
  const index = SIZE_RANGES.findIndex((r) => size > r.min && size <= r.max);
  if (index === -1) return undefined;
  const values = IT_VALUES[`IT${grade}`];
  if (values === undefined) return undefined;
  return values[index];
}

/** Tra cứu thông tin kiểu lắp (không phân biệt hoa thường, bỏ khoảng trắng). */
export function getFitInfo(fitCode: string): CommonFit | undefined {
  const code = fitCode.trim().replace(/\s+/g, '');
  if (code === '') return undefined;
  const exact = COMMON_FITS.find((f) => f.fit === code);
  if (exact !== undefined) return exact;
  const lower = code.toLowerCase();
  return COMMON_FITS.find((f) => f.fit.toLowerCase() === lower);
}
