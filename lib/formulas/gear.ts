/**
 * Công thức bánh răng trụ răng thẳng (mô-đun hệ mét).
 * - m: mô-đun (mm)
 * - z: số răng
 */

/**
 * Kiểm tra mô-đun và số răng hợp lệ.
 * @param m - Mô-đun (mm)
 * @param z - Số răng
 * @throws {Error} Khi m <= 0 hoặc z không phải số nguyên dương
 */
function assertGearInputs(m: number, z: number): void {
  if (!Number.isFinite(m) || m <= 0) {
    throw new Error('Mô-đun m phải lớn hơn 0');
  }
  if (!Number.isFinite(z) || z <= 0) {
    throw new Error('Số răng z phải lớn hơn 0');
  }
  if (!Number.isInteger(z)) {
    throw new Error('Số răng z phải là số nguyên');
  }
}

/**
 * Tính đường kính vòng chia (pitch diameter).
 * Công thức: d = m * z
 * @param m - Mô-đun (mm), phải > 0
 * @param z - Số răng, phải là số nguyên > 0
 * @returns Đường kính vòng chia (mm)
 * @throws {Error} Khi m hoặc z không hợp lệ
 */
export function calcPitchDiameterGear(m: number, z: number): number {
  assertGearInputs(m, z);
  return m * z;
}

/**
 * Tính đường kính vòng đỉnh (outside/addendum diameter).
 * Công thức: da = (z + 2) * m
 * @param m - Mô-đun (mm), phải > 0
 * @param z - Số răng, phải là số nguyên > 0
 * @returns Đường kính vòng đỉnh (mm)
 * @throws {Error} Khi m hoặc z không hợp lệ
 */
export function calcOutsideDiameter(m: number, z: number): number {
  assertGearInputs(m, z);
  return (z + 2) * m;
}

/**
 * Tính đường kính vòng chân (root/dedendum diameter).
 * Công thức: df = (z - 2.5) * m (hệ số chân răng 1.25)
 * @param m - Mô-đun (mm), phải > 0
 * @param z - Số răng, phải là số nguyên > 0 và đủ lớn để df dương
 * @returns Đường kính vòng chân (mm)
 * @throws {Error} Khi m, z không hợp lệ hoặc z quá nhỏ
 */
export function calcRootDiameter(m: number, z: number): number {
  assertGearInputs(m, z);
  const result: number = (z - 2.5) * m;
  if (result <= 0) {
    throw new Error('Số răng z quá nhỏ, đường kính chân răng không dương');
  }
  return result;
}

/**
 * Tính chiều cao răng.
 * Công thức: h = 2.25 * m
 * @param m - Mô-đun (mm), phải > 0
 * @returns Chiều cao răng (mm)
 * @throws {Error} Khi m không hợp lệ (<= 0)
 */
export function calcToothHeight(m: number): number {
  if (!Number.isFinite(m) || m <= 0) {
    throw new Error('Mô-đun m phải lớn hơn 0');
  }
  return 2.25 * m;
}

/**
 * Tính khoảng cách trục của cặp bánh răng ăn khớp ngoài.
 * Công thức: a = m * (z1 + z2) / 2
 * @param m - Mô-đun (mm), phải > 0
 * @param z1 - Số răng bánh 1, phải là số nguyên > 0
 * @param z2 - Số răng bánh 2, phải là số nguyên > 0
 * @returns Khoảng cách trục (mm)
 * @throws {Error} Khi m, z1 hoặc z2 không hợp lệ
 */
export function calcCenterDistance(m: number, z1: number, z2: number): number {
  if (!Number.isFinite(m) || m <= 0) {
    throw new Error('Mô-đun m phải lớn hơn 0');
  }
  if (!Number.isFinite(z1) || z1 <= 0) {
    throw new Error('Số răng z1 phải lớn hơn 0');
  }
  if (!Number.isInteger(z1)) {
    throw new Error('Số răng z1 phải là số nguyên');
  }
  if (!Number.isFinite(z2) || z2 <= 0) {
    throw new Error('Số răng z2 phải lớn hơn 0');
  }
  if (!Number.isInteger(z2)) {
    throw new Error('Số răng z2 phải là số nguyên');
  }
  return (m * (z1 + z2)) / 2;
}
