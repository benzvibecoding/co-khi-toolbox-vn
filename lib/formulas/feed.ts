/**
 * Công thức bước tiến (feed) cho gia công phay/dao nhiều răng.
 * - fz: lượng tiến dao trên mỗi răng (mm/răng)
 * - z: số răng của dao (răng)
 * - n: tốc độ trục chính (vòng/phút)
 * - Vf: tốc độ tiến dao (mm/phút)
 */

/**
 * Tính tốc độ tiến dao Vf từ chip load, số răng và RPM.
 * Công thức: Vf = fz * z * n
 * @param fz - Lượng tiến dao mỗi răng (mm/răng), phải > 0
 * @param z - Số răng của dao, phải > 0 (số nguyên)
 * @param n - Tốc độ trục chính (rpm), phải > 0
 * @returns Tốc độ tiến dao Vf (mm/phút)
 * @throws {Error} Khi fz, z hoặc n không hợp lệ (<= 0)
 */
export function calcFeedRate(fz: number, z: number, n: number): number {
  if (!Number.isFinite(fz) || fz <= 0) {
    throw new Error('Lượng tiến dao mỗi răng fz phải lớn hơn 0');
  }
  if (!Number.isFinite(z) || z <= 0) {
    throw new Error('Số răng z phải lớn hơn 0');
  }
  if (!Number.isInteger(z)) {
    throw new Error('Số răng z phải là số nguyên');
  }
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error('Tốc độ trục chính n phải lớn hơn 0');
  }
  return fz * z * n;
}

/**
 * Tính lượng tiến dao mỗi răng (chip load) từ tốc độ tiến dao.
 * Công thức: fz = Vf / (z * n)
 * @param Vf - Tốc độ tiến dao (mm/phút), phải > 0
 * @param z - Số răng của dao, phải > 0 (số nguyên)
 * @param n - Tốc độ trục chính (rpm), phải > 0
 * @returns Lượng tiến dao mỗi răng fz (mm/răng)
 * @throws {Error} Khi Vf, z hoặc n không hợp lệ (<= 0)
 */
export function calcChipLoad(Vf: number, z: number, n: number): number {
  if (!Number.isFinite(Vf) || Vf <= 0) {
    throw new Error('Tốc độ tiến dao Vf phải lớn hơn 0');
  }
  if (!Number.isFinite(z) || z <= 0) {
    throw new Error('Số răng z phải lớn hơn 0');
  }
  if (!Number.isInteger(z)) {
    throw new Error('Số răng z phải là số nguyên');
  }
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error('Tốc độ trục chính n phải lớn hơn 0');
  }
  return Vf / (z * n);
}
