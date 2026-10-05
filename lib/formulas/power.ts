/**
 * Công thức công suất cắt và mô-men xoắn.
 * - Fc: lực cắt (N)
 * - Vc: tốc độ cắt (m/phút)
 * - P: công suất (kW)
 * - T: mô-men xoắn (N·m)
 * - n: tốc độ trục chính (rpm)
 */

/**
 * Tính công suất cắt từ lực cắt và tốc độ cắt.
 * Công thức: P = Fc * Vc / 60000 (kW)
 * @param Fc - Lực cắt (N), phải > 0
 * @param Vc - Tốc độ cắt (m/phút), phải > 0
 * @returns Công suất cắt (kW)
 * @throws {Error} Khi Fc hoặc Vc không hợp lệ (<= 0)
 */
export function calcCuttingPower(Fc: number, Vc: number): number {
  if (!Number.isFinite(Fc) || Fc <= 0) {
    throw new Error('Lực cắt Fc phải lớn hơn 0');
  }
  if (!Number.isFinite(Vc) || Vc <= 0) {
    throw new Error('Tốc độ cắt Vc phải lớn hơn 0');
  }
  return (Fc * Vc) / 60000;
}

/**
 * Tính mô-men xoắn từ công suất và số vòng quay.
 * Công thức: T = P * 9550 / n (N·m)
 * @param P - Công suất (kW), phải > 0
 * @param n - Tốc độ trục chính (rpm), phải > 0
 * @returns Mô-men xoắn (N·m)
 * @throws {Error} Khi P hoặc n không hợp lệ (<= 0)
 */
export function calcTorque(P: number, n: number): number {
  if (!Number.isFinite(P) || P <= 0) {
    throw new Error('Công suất P phải lớn hơn 0');
  }
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error('Tốc độ trục chính n phải lớn hơn 0');
  }
  return (P * 9550) / n;
}

/**
 * Tính công suất từ mô-men xoắn và số vòng quay.
 * Công thức: P = T * n / 9550 (kW)
 * @param T - Mô-men xoắn (N·m), phải > 0
 * @param n - Tốc độ trục chính (rpm), phải > 0
 * @returns Công suất (kW)
 * @throws {Error} Khi T hoặc n không hợp lệ (<= 0)
 */
export function calcPowerFromTorque(T: number, n: number): number {
  if (!Number.isFinite(T) || T <= 0) {
    throw new Error('Mô-men xoắn T phải lớn hơn 0');
  }
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error('Tốc độ trục chính n phải lớn hơn 0');
  }
  return (T * n) / 9550;
}
