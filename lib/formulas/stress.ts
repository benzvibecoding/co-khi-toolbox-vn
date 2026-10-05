/**
 * Công thức ứng suất, áp suất và biến dạng.
 * - F: lực tác dụng (N)
 * - A: diện tích mặt cắt (mm²)
 * - deltaL: độ dãn dài tuyệt đối (mm)
 * - L0: chiều dài ban đầu (mm)
 */

/**
 * Tính ứng suất kéo/nén.
 * Công thức: sigma = F / A (MPa, với F tính bằng N và A tính bằng mm²)
 * @param F - Lực tác dụng (N), phải > 0
 * @param A - Diện tích mặt cắt (mm²), phải > 0
 * @returns Ứng suất (MPa)
 * @throws {Error} Khi F hoặc A không hợp lệ (<= 0)
 */
export function calcStress(F: number, A: number): number {
  if (!Number.isFinite(F) || F <= 0) {
    throw new Error('Lực F phải lớn hơn 0');
  }
  if (!Number.isFinite(A) || A <= 0) {
    throw new Error('Diện tích A phải lớn hơn 0');
  }
  return F / A;
}

/**
 * Tính áp suất từ lực và diện tích.
 * Công thức: p = F / A (MPa, với F tính bằng N và A tính bằng mm²)
 * @param F - Lực tác dụng (N), phải > 0
 * @param A - Diện tích chịu lực (mm²), phải > 0
 * @returns Áp suất (MPa)
 * @throws {Error} Khi F hoặc A không hợp lệ (<= 0)
 */
export function calcPressure(F: number, A: number): number {
  if (!Number.isFinite(F) || F <= 0) {
    throw new Error('Lực F phải lớn hơn 0');
  }
  if (!Number.isFinite(A) || A <= 0) {
    throw new Error('Diện tích A phải lớn hơn 0');
  }
  return F / A;
}

/**
 * Tính biến dạng tương đối (không thứ nguyên).
 * Công thức: epsilon = deltaL / L0
 * @param deltaL - Độ dãn dài tuyệt đối (mm), phải >= 0
 * @param L0 - Chiều dài ban đầu (mm), phải > 0
 * @returns Biến dạng tương đối (không thứ nguyên)
 * @throws {Error} Khi deltaL âm hoặc L0 không hợp lệ (<= 0)
 */
export function calcStrain(deltaL: number, L0: number): number {
  if (!Number.isFinite(deltaL) || deltaL < 0) {
    throw new Error('Độ dãn dài deltaL không được âm');
  }
  if (!Number.isFinite(L0) || L0 <= 0) {
    throw new Error('Chiều dài ban đầu L0 phải lớn hơn 0');
  }
  return deltaL / L0;
}
