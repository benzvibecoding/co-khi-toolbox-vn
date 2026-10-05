/**
 * Công thức dung sai kích thước và lắp ghép (ISO 286 rút gọn).
 * - nominal: kích thước danh nghĩa (mm)
 * - upper/lower: sai lệch trên/dưới (mm)
 * - Đơn vị bảng IT và sai lệch cơ bản: micromet (µm)
 */

/** Loại lắp ghép. */
export type FitType = 'clearance' | 'interference' | 'transition';

/** Cấp chính xác IT được hỗ trợ trong bảng rút gọn. */
export type ITGrade = 5 | 6 | 7 | 8 | 9 | 10 | 11;

/** Mã miền dung sai được hỗ trợ (chữ hoa = lỗ, chữ thường = trục). */
export type ToleranceCode =
  | 'H'
  | 'h'
  | 'F'
  | 'f'
  | 'G'
  | 'g'
  | 'K'
  | 'k'
  | 'N'
  | 'n'
  | 'P'
  | 'p'
  | 'R'
  | 'r'
  | 'S'
  | 's';

/**
 * Tính kích thước giới hạn lớn nhất.
 * Công thức: Dmax = nominal + upper
 * @param nominal - Kích thước danh nghĩa (mm), phải > 0
 * @param upper - Sai lệch trên (mm), phải là số hữu hạn (có thể âm, 0 hoặc dương)
 * @returns Kích thước lớn nhất (mm)
 * @throws {Error} Khi nominal <= 0 hoặc các giá trị không hợp lệ
 */
export function calcMaxSize(nominal: number, upper: number): number {
  if (!Number.isFinite(nominal) || nominal <= 0) {
    throw new Error('Kích thước danh nghĩa phải lớn hơn 0');
  }
  if (!Number.isFinite(upper)) {
    throw new Error('Sai lệch trên phải là số hợp lệ');
  }
  return nominal + upper;
}

/**
 * Tính kích thước giới hạn nhỏ nhất.
 * Công thức: Dmin = nominal + lower
 * @param nominal - Kích thước danh nghĩa (mm), phải > 0
 * @param lower - Sai lệch dưới (mm), phải là số hữu hạn (có thể âm, 0 hoặc dương)
 * @returns Kích thước nhỏ nhất (mm)
 * @throws {Error} Khi nominal <= 0 hoặc các giá trị không hợp lệ
 */
export function calcMinSize(nominal: number, lower: number): number {
  if (!Number.isFinite(nominal) || nominal <= 0) {
    throw new Error('Kích thước danh nghĩa phải lớn hơn 0');
  }
  if (!Number.isFinite(lower)) {
    throw new Error('Sai lệch dưới phải là số hợp lệ');
  }
  return nominal + lower;
}

/**
 * Tính dung sai kích thước (độ rộng miền dung sai).
 * Công thức: T = upper - lower
 * @param upper - Sai lệch trên (mm), phải là số hữu hạn
 * @param lower - Sai lệch dưới (mm), phải là số hữu hạn và <= upper
 * @returns Dung sai (mm), luôn >= 0
 * @throws {Error} Khi giá trị không hợp lệ hoặc upper < lower
 */
export function calcTolerance(upper: number, lower: number): number {
  if (!Number.isFinite(upper)) {
    throw new Error('Sai lệch trên phải là số hợp lệ');
  }
  if (!Number.isFinite(lower)) {
    throw new Error('Sai lệch dưới phải là số hợp lệ');
  }
  if (upper < lower) {
    throw new Error('Sai lệch trên phải lớn hơn hoặc bằng sai lệch dưới');
  }
  return upper - lower;
}

/**
 * Xác định loại lắp ghép từ miền dung sai của lỗ và trục.
 * - clearance (lắp lỏng): shaftMax < holeMin (tức shaftUpper < holeLower)
 * - interference (lắp chặt): shaftMin > holeMax (tức shaftLower > holeUpper)
 * - transition (lắp trung gian): còn lại (miền dung sai giao nhau)
 * @param holeUpper - Sai lệch trên của lỗ (mm), phải là số hữu hạn
 * @param holeLower - Sai lệch dưới của lỗ (mm), phải là số hữu hạn và <= holeUpper
 * @param shaftUpper - Sai lệch trên của trục (mm), phải là số hữu hạn
 * @param shaftLower - Sai lệch dưới của trục (mm), phải là số hữu hạn và <= shaftUpper
 * @returns Loại lắp ghép: 'clearance' | 'interference' | 'transition'
 * @throws {Error} Khi giá trị không hợp lệ hoặc trên < dưới
 */
export function calcFitType(
  holeUpper: number,
  holeLower: number,
  shaftUpper: number,
  shaftLower: number,
): FitType {
  if (!Number.isFinite(holeUpper)) {
    throw new Error('Sai lệch trên của lỗ phải là số hợp lệ');
  }
  if (!Number.isFinite(holeLower)) {
    throw new Error('Sai lệch dưới của lỗ phải là số hợp lệ');
  }
  if (!Number.isFinite(shaftUpper)) {
    throw new Error('Sai lệch trên của trục phải là số hợp lệ');
  }
  if (!Number.isFinite(shaftLower)) {
    throw new Error('Sai lệch dưới của trục phải là số hợp lệ');
  }
  if (holeUpper < holeLower) {
    throw new Error('Sai lệch trên của lỗ phải lớn hơn hoặc bằng sai lệch dưới');
  }
  if (shaftUpper < shaftLower) {
    throw new Error('Sai lệch trên của trục phải lớn hơn hoặc bằng sai lệch dưới');
  }
  // Kích thước danh nghĩa triệt tiêu hai vế nên chỉ cần so sánh sai lệch.
  if (shaftUpper < holeLower) {
    return 'clearance';
  }
  if (shaftLower > holeUpper) {
    return 'interference';
  }
  return 'transition';
}

// Bảng IT rút gọn theo ISO 286-1, đơn vị µm.
// Mỗi dòng: cận trên của khoảng kích thước (mm) và dung sai cho IT5..IT11.
interface ITRow {
  /** Cận trên khoảng kích thước danh nghĩa (mm). */
  max: number;
  /** Dung sai theo cấp, đơn vị µm, thứ tự IT5..IT11. */
  values: readonly [number, number, number, number, number, number, number];
}

/** Bảng IT5-IT11 rút gọn cho kích thước đến 500mm (đơn vị µm). */
const IT_TABLE: readonly ITRow[] = [
  { max: 3, values: [4, 6, 10, 14, 25, 40, 60] },
  { max: 6, values: [5, 8, 12, 18, 30, 48, 75] },
  { max: 10, values: [6, 9, 15, 22, 36, 58, 90] },
  { max: 18, values: [8, 11, 18, 27, 43, 70, 110] },
  { max: 30, values: [9, 13, 21, 33, 52, 84, 130] },
  { max: 50, values: [11, 16, 25, 39, 62, 100, 160] },
  { max: 80, values: [13, 19, 30, 46, 74, 120, 190] },
  { max: 120, values: [15, 22, 35, 54, 87, 140, 220] },
  { max: 180, values: [18, 25, 40, 63, 100, 160, 250] },
  { max: 250, values: [20, 29, 46, 72, 115, 185, 290] },
  { max: 315, values: [23, 32, 52, 81, 130, 210, 320] },
  { max: 400, values: [25, 36, 57, 89, 140, 230, 360] },
  { max: 500, values: [27, 40, 63, 97, 155, 250, 400] },
];

/**
 * Tra dung sai cấp IT (IT5-IT11) theo kích thước danh nghĩa.
 * @param nominalSize - Kích thước danh nghĩa (mm), phải > 0 và <= 500
 * @param grade - Cấp chính xác (5..11)
 * @returns Dung sai IT (µm)
 * @throws {Error} Khi kích thước hoặc cấp không nằm trong bảng tra
 */
export function getITValue(nominalSize: number, grade: number): number {
  if (!Number.isFinite(nominalSize) || nominalSize <= 0) {
    throw new Error('Kích thước danh nghĩa phải lớn hơn 0');
  }
  if (nominalSize > 500) {
    throw new Error('Bảng tra rút gọn chỉ hỗ trợ đến 500mm');
  }
  if (!Number.isInteger(grade) || grade < 5 || grade > 11) {
    throw new Error('Cấp chính xác grade phải từ IT5 đến IT11');
  }
  const gradeIndex: number = grade - 5;
  for (const row of IT_TABLE) {
    if (nominalSize <= row.max) {
      const value: number | undefined = row.values[gradeIndex];
      if (value === undefined) {
        throw new Error('Không tìm thấy giá trị IT trong bảng tra');
      }
      return value;
    }
  }
  throw new Error('Không tìm thấy giá trị IT trong bảng tra');
}

// Bảng sai lệch cơ bản rút gọn (đơn vị µm), đối xứng qua đường 0:
// lỗ (chữ hoa) = -trục (chữ thường). H/h = 0.
// Mỗi dòng: cận trên khoảng kích thước và các sai lệch cho f, g, k, n, p, r, s.
// (F, G... bằng số đối của f, g...; N, P... bằng số đối của n, p...).
interface DeviationRow {
  /** Cận trên khoảng kích thước (mm). */
  max: number;
  /** Sai lệch trên es của trục f, g (âm, µm). */
  f: number;
  /** Sai lệch trên es của trục g (âm, µm). */
  g: number;
  /** Sai lệch dưới ei của trục k, n, p, r, s (dương hoặc 0, µm). */
  k: number;
  /** Sai lệch dưới ei của trục n (µm). */
  n: number;
  /** Sai lệch dưới ei của trục p (µm). */
  p: number;
  /** Sai lệch dưới ei của trục r (µm). */
  r: number;
  /** Sai lệch dưới ei của trục s (µm). */
  s: number;
}

/** Bảng sai lệch cơ bản rút gọn cho kích thước đến 500mm (đơn vị µm). */
const DEVIATION_TABLE: readonly DeviationRow[] = [
  { max: 3, f: -6, g: -2, k: 0, n: 4, p: 6, r: 10, s: 14 },
  { max: 6, f: -10, g: -4, k: 1, n: 8, p: 12, r: 15, s: 19 },
  { max: 10, f: -13, g: -5, k: 1, n: 10, p: 15, r: 19, s: 23 },
  { max: 18, f: -16, g: -6, k: 1, n: 12, p: 18, r: 23, s: 28 },
  { max: 30, f: -20, g: -7, k: 2, n: 15, p: 22, r: 28, s: 35 },
  { max: 50, f: -25, g: -9, k: 2, n: 17, p: 26, r: 34, s: 43 },
  { max: 80, f: -30, g: -10, k: 2, n: 20, p: 32, r: 41, s: 53 },
  { max: 120, f: -36, g: -12, k: 3, n: 23, p: 37, r: 48, s: 63 },
  { max: 180, f: -43, g: -14, k: 3, n: 27, p: 43, r: 60, s: 77 },
  { max: 250, f: -50, g: -15, k: 4, n: 31, p: 50, r: 65, s: 90 },
  { max: 315, f: -56, g: -17, k: 4, n: 34, p: 56, r: 73, s: 100 },
  { max: 400, f: -62, g: -18, k: 4, n: 37, p: 62, r: 80, s: 108 },
  { max: 500, f: -68, g: -20, k: 5, n: 40, p: 68, r: 88, s: 117 },
];

/**
 * Tìm dòng bảng sai lệch theo kích thước danh nghĩa.
 * @param nominalSize - Kích thước danh nghĩa (mm)
 * @returns Dòng bảng tra tương ứng
 * @throws {Error} Khi kích thước vượt ngoài bảng tra
 */
function findDeviationRow(nominalSize: number): DeviationRow {
  for (const row of DEVIATION_TABLE) {
    if (nominalSize <= row.max) {
      return row;
    }
  }
  throw new Error('Không tìm thấy sai lệch cơ bản trong bảng tra');
}

/**
 * Tra sai lệch cơ bản (fundamental deviation) theo kích thước và mã miền dung sai.
 * Quy ước rút gọn (đơn vị µm):
 * - H: EI = 0 (sai lệch dưới của lỗ); h: es = 0 (sai lệch trên của trục).
 * - F, G: EI dương (số đối của es trục f, g); f, g: es âm.
 * - K, N, P, R, S (lỗ): ES (sai lệch trên, số đối của ei trục k, n, p, r, s).
 * - k, n, p, r, s (trục): ei dương (sai lệch dưới).
 * Nói gọn: hàm trả về sai lệch lower hoặc upper (tùy mã) gần đường 0 nhất.
 * @param nominalSize - Kích thước danh nghĩa (mm), phải > 0 và <= 500
 * @param code - Mã miền dung sai: H,h,F,f,G,g,K,k,N,n,P,p,R,r,S,s
 * @returns Sai lệch cơ bản (µm): 0 với H/h; dương với F,G,k,n,p,r,s và lỗ đối xứng; âm với f,g,K,N,P,R,S
 * @throws {Error} Khi kích thước hoặc mã không nằm trong bảng tra
 */
export function getFundamentalDeviation(nominalSize: number, code: string): number {
  if (!Number.isFinite(nominalSize) || nominalSize <= 0) {
    throw new Error('Kích thước danh nghĩa phải lớn hơn 0');
  }
  if (nominalSize > 500) {
    throw new Error('Bảng tra rút gọn chỉ hỗ trợ đến 500mm');
  }
  const row: DeviationRow = findDeviationRow(nominalSize);
  switch (code) {
    case 'H':
      return 0;
    case 'h':
      return 0;
    case 'F':
      return -row.f;
    case 'f':
      return row.f;
    case 'G':
      return -row.g;
    case 'g':
      return row.g;
    case 'K':
      return -row.k;
    case 'k':
      return row.k;
    case 'N':
      return -row.n;
    case 'n':
      return row.n;
    case 'P':
      return -row.p;
    case 'p':
      return row.p;
    case 'R':
      return -row.r;
    case 'r':
      return row.r;
    case 'S':
      return -row.s;
    case 's':
      return row.s;
    default:
      throw new Error(`Mã miền dung sai không được hỗ trợ: ${code}`);
  }
}
