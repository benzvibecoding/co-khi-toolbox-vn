/**
 * Công thức khối lượng và thể tích cho vật liệu cơ khí.
 * - V: thể tích (cm³)
 * - rho: khối lượng riêng (g/cm³)
 * - D, L, W, H: kích thước (mm)
 */

/**
 * Tính khối lượng từ thể tích và khối lượng riêng.
 * Công thức: m = V * rho / 1000 (kg)
 * @param V - Thể tích (cm³), phải > 0
 * @param rho - Khối lượng riêng (g/cm³), phải > 0
 * @returns Khối lượng (kg)
 * @throws {Error} Khi V hoặc rho không hợp lệ (<= 0)
 */
export function calcMass(V: number, rho: number): number {
  if (!Number.isFinite(V) || V <= 0) {
    throw new Error('Thể tích V phải lớn hơn 0');
  }
  if (!Number.isFinite(rho) || rho <= 0) {
    throw new Error('Khối lượng riêng rho phải lớn hơn 0');
  }
  return (V * rho) / 1000;
}

/**
 * Tính thể tích hình trụ tròn từ đường kính và chiều dài.
 * Công thức: V = PI * (D/20)^2 * (L/10) (cm³, với D và L tính bằng mm)
 * @param D - Đường kính (mm), phải > 0
 * @param L - Chiều dài (mm), phải > 0
 * @returns Thể tích (cm³)
 * @throws {Error} Khi D hoặc L không hợp lệ (<= 0)
 */
export function calcVolumeCylinder(D: number, L: number): number {
  if (!Number.isFinite(D) || D <= 0) {
    throw new Error('Đường kính D phải lớn hơn 0');
  }
  if (!Number.isFinite(L) || L <= 0) {
    throw new Error('Chiều dài L phải lớn hơn 0');
  }
  const radiusCm: number = D / 20;
  const lengthCm: number = L / 10;
  return Math.PI * radiusCm * radiusCm * lengthCm;
}

/**
 * Tính thể tích hình hộp chữ nhật.
 * Công thức: V = W * H * L / 1000 (cm³, với W, H, L tính bằng mm)
 * @param W - Chiều rộng (mm), phải > 0
 * @param H - Chiều cao (mm), phải > 0
 * @param L - Chiều dài (mm), phải > 0
 * @returns Thể tích (cm³)
 * @throws {Error} Khi W, H hoặc L không hợp lệ (<= 0)
 */
export function calcVolumeBox(W: number, H: number, L: number): number {
  if (!Number.isFinite(W) || W <= 0) {
    throw new Error('Chiều rộng W phải lớn hơn 0');
  }
  if (!Number.isFinite(H) || H <= 0) {
    throw new Error('Chiều cao H phải lớn hơn 0');
  }
  if (!Number.isFinite(L) || L <= 0) {
    throw new Error('Chiều dài L phải lớn hơn 0');
  }
  return (W * H * L) / 1000;
}
