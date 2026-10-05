/**
 * Công thức tốc độ cắt (cutting speed) cho gia công cơ khí.
 * - D: đường kính dao/phôi (mm)
 * - n: tốc độ trục chính (vòng/phút)
 * - Vc: tốc độ cắt (m/phút)
 */

/**
 * Tính tốc độ cắt Vc từ đường kính và số vòng quay.
 * Công thức: Vc = (PI * D * n) / 1000
 * @param D - Đường kính dao/phôi (mm), phải > 0
 * @param n - Tốc độ trục chính (rpm), phải > 0
 * @returns Tốc độ cắt Vc (m/phút)
 * @throws {Error} Khi D hoặc n không hợp lệ (<= 0)
 */
export function calcCuttingSpeed(D: number, n: number): number {
  if (!Number.isFinite(D) || D <= 0) {
    throw new Error('Đường kính D phải lớn hơn 0');
  }
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error('Tốc độ trục chính n phải lớn hơn 0');
  }
  return (Math.PI * D * n) / 1000;
}

/**
 * Tính số vòng quay trục chính n từ tốc độ cắt và đường kính.
 * Công thức: n = (1000 * Vc) / (PI * D)
 * @param Vc - Tốc độ cắt (m/phút), phải > 0
 * @param D - Đường kính dao/phôi (mm), phải > 0
 * @returns Tốc độ trục chính n (rpm)
 * @throws {Error} Khi Vc hoặc D không hợp lệ (<= 0)
 */
export function calcRPM(Vc: number, D: number): number {
  if (!Number.isFinite(Vc) || Vc <= 0) {
    throw new Error('Tốc độ cắt Vc phải lớn hơn 0');
  }
  if (!Number.isFinite(D) || D <= 0) {
    throw new Error('Đường kính D phải lớn hơn 0');
  }
  return (1000 * Vc) / (Math.PI * D);
}
