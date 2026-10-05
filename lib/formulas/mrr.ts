/**
 * Công thức tốc độ bóc tách vật liệu (MRR) và thời gian gia công.
 * - ap: chiều sâu cắt (mm)
 * - ae: chiều rộng cắt (mm)
 * - Vf: tốc độ tiến dao (mm/phút)
 * - L: chiều dài cắt (mm)
 */

/**
 * Tính tốc độ bóc tách vật liệu MRR.
 * Công thức: MRR = ap * ae * Vf / 1000 (cm³/phút)
 * @param ap - Chiều sâu cắt (mm), phải > 0
 * @param ae - Chiều rộng cắt (mm), phải > 0
 * @param Vf - Tốc độ tiến dao (mm/phút), phải > 0
 * @returns Tốc độ bóc tách vật liệu (cm³/phút)
 * @throws {Error} Khi ap, ae hoặc Vf không hợp lệ (<= 0)
 */
export function calcMRR(ap: number, ae: number, Vf: number): number {
  if (!Number.isFinite(ap) || ap <= 0) {
    throw new Error('Chiều sâu cắt ap phải lớn hơn 0');
  }
  if (!Number.isFinite(ae) || ae <= 0) {
    throw new Error('Chiều rộng cắt ae phải lớn hơn 0');
  }
  if (!Number.isFinite(Vf) || Vf <= 0) {
    throw new Error('Tốc độ tiến dao Vf phải lớn hơn 0');
  }
  return (ap * ae * Vf) / 1000;
}

/**
 * Tính thời gian gia công cho một đường cắt thẳng.
 * Công thức: T = L / Vf (phút)
 * @param L - Chiều dài đường cắt (mm), phải > 0
 * @param Vf - Tốc độ tiến dao (mm/phút), phải > 0
 * @returns Thời gian gia công (phút)
 * @throws {Error} Khi L hoặc Vf không hợp lệ (<= 0)
 */
export function calcMachiningTime(L: number, Vf: number): number {
  if (!Number.isFinite(L) || L <= 0) {
    throw new Error('Chiều dài cắt L phải lớn hơn 0');
  }
  if (!Number.isFinite(Vf) || Vf <= 0) {
    throw new Error('Tốc độ tiến dao Vf phải lớn hơn 0');
  }
  return L / Vf;
}
