/**
 * Chuyển đổi đơn vị cho các đại lượng cơ khí.
 * Nguyên tắc: đổi về đơn vị gốc (base) rồi đổi sang đơn vị đích.
 */

// Kiểu đơn vị cho từng đại lượng
/** Đơn vị chiều dài. */
export type LengthUnit = 'mm' | 'cm' | 'm' | 'inch' | 'ft';
/** Đơn vị tốc độ. */
export type SpeedUnit = 'm/min' | 'ft/min' | 'm/s';
/** Đơn vị áp suất. */
export type PressureUnit = 'MPa' | 'GPa' | 'psi' | 'kgf/cm2';
/** Đơn vị lực. */
export type ForceUnit = 'N' | 'kN' | 'kgf' | 'lbf';
/** Đơn vị khối lượng. */
export type MassUnit = 'g' | 'kg' | 'lb' | 'oz';
/** Đơn vị công suất. */
export type PowerUnit = 'W' | 'kW' | 'HP';
/** Đơn vị mô-men xoắn. */
export type TorqueUnit = 'N·m' | 'kN·m' | 'kgf·m' | 'lbf·ft';

// Hệ số quy đổi về đơn vị gốc (base)
/** Hệ số chiều dài về mm: 1 inch = 25.4mm, 1 ft = 304.8mm, 1 cm = 10mm, 1 m = 1000mm. */
const LENGTH_TO_MM: Record<LengthUnit, number> = {
  mm: 1,
  cm: 10,
  m: 1000,
  inch: 25.4,
  ft: 304.8,
};

/** Hệ số tốc độ về m/min: 1 ft/min = 0.3048 m/min, 1 m/s = 60 m/min. */
const SPEED_TO_MMIN: Record<SpeedUnit, number> = {
  'm/min': 1,
  'ft/min': 0.3048,
  'm/s': 60,
};

/** Hệ số áp suất về MPa: 1 GPa = 1000 MPa, 1 psi = 0.00689476 MPa, 1 kgf/cm2 = 0.0980665 MPa. */
const PRESSURE_TO_MPA: Record<PressureUnit, number> = {
  MPa: 1,
  GPa: 1000,
  psi: 0.00689476,
  'kgf/cm2': 0.0980665,
};

/** Hệ số lực về N: 1 kN = 1000 N, 1 kgf = 9.80665 N, 1 lbf = 4.44822 N. */
const FORCE_TO_N: Record<ForceUnit, number> = {
  N: 1,
  kN: 1000,
  kgf: 9.80665,
  lbf: 4.44822,
};

/** Hệ số khối lượng về g: 1 kg = 1000 g, 1 lb = 453.592 g, 1 oz = 28.3495 g. */
const MASS_TO_G: Record<MassUnit, number> = {
  g: 1,
  kg: 1000,
  lb: 453.592,
  oz: 28.3495,
};

/** Hệ số công suất về W: 1 kW = 1000 W, 1 HP = 745.7 W. */
const POWER_TO_W: Record<PowerUnit, number> = {
  W: 1,
  kW: 1000,
  HP: 745.7,
};

/** Hệ số mô-men về N·m: 1 kN·m = 1000 N·m, 1 kgf·m = 9.80665 N·m, 1 lbf·ft = 1.35582 N·m. */
const TORQUE_TO_NM: Record<TorqueUnit, number> = {
  'N·m': 1,
  'kN·m': 1000,
  'kgf·m': 9.80665,
  'lbf·ft': 1.35582,
};

/**
 * Kiểm tra giá trị số đầu vào cho các hàm chuyển đổi.
 * @param value - Giá trị cần kiểm tra
 * @param label - Tên đại lượng để báo lỗi
 * @throws {Error} Khi value không phải số hữu hạn
 */
function assertFiniteValue(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`Giá trị ${label} phải là số hợp lệ`);
  }
}

/**
 * Chuyển đổi chiều dài giữa mm, cm, m, inch, ft.
 * @param value - Giá trị cần đổi (cho phép bằng 0, phải là số hữu hạn)
 * @param from - Đơn vị nguồn
 * @param to - Đơn vị đích
 * @returns Giá trị sau khi đổi đơn vị
 * @throws {Error} Khi giá trị không hợp lệ hoặc đơn vị không được hỗ trợ
 */
export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  assertFiniteValue(value, 'chiều dài');
  const fromFactor: number | undefined = LENGTH_TO_MM[from];
  const toFactor: number | undefined = LENGTH_TO_MM[to];
  if (fromFactor === undefined) {
    throw new Error(`Đơn vị chiều dài nguồn không được hỗ trợ: ${String(from)}`);
  }
  if (toFactor === undefined) {
    throw new Error(`Đơn vị chiều dài đích không được hỗ trợ: ${String(to)}`);
  }
  return (value * fromFactor) / toFactor;
}

/**
 * Chuyển đổi tốc độ giữa m/min, ft/min, m/s.
 * @param value - Giá trị cần đổi (phải là số hữu hạn)
 * @param from - Đơn vị nguồn
 * @param to - Đơn vị đích
 * @returns Giá trị sau khi đổi đơn vị
 * @throws {Error} Khi giá trị không hợp lệ hoặc đơn vị không được hỗ trợ
 */
export function convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number {
  assertFiniteValue(value, 'tốc độ');
  const fromFactor: number | undefined = SPEED_TO_MMIN[from];
  const toFactor: number | undefined = SPEED_TO_MMIN[to];
  if (fromFactor === undefined) {
    throw new Error(`Đơn vị tốc độ nguồn không được hỗ trợ: ${String(from)}`);
  }
  if (toFactor === undefined) {
    throw new Error(`Đơn vị tốc độ đích không được hỗ trợ: ${String(to)}`);
  }
  return (value * fromFactor) / toFactor;
}

/**
 * Chuyển đổi áp suất giữa MPa, GPa, psi, kgf/cm2.
 * @param value - Giá trị cần đổi (phải là số hữu hạn)
 * @param from - Đơn vị nguồn
 * @param to - Đơn vị đích
 * @returns Giá trị sau khi đổi đơn vị
 * @throws {Error} Khi giá trị không hợp lệ hoặc đơn vị không được hỗ trợ
 */
export function convertPressure(value: number, from: PressureUnit, to: PressureUnit): number {
  assertFiniteValue(value, 'áp suất');
  const fromFactor: number | undefined = PRESSURE_TO_MPA[from];
  const toFactor: number | undefined = PRESSURE_TO_MPA[to];
  if (fromFactor === undefined) {
    throw new Error(`Đơn vị áp suất nguồn không được hỗ trợ: ${String(from)}`);
  }
  if (toFactor === undefined) {
    throw new Error(`Đơn vị áp suất đích không được hỗ trợ: ${String(to)}`);
  }
  return (value * fromFactor) / toFactor;
}

/**
 * Chuyển đổi lực giữa N, kN, kgf, lbf.
 * @param value - Giá trị cần đổi (phải là số hữu hạn)
 * @param from - Đơn vị nguồn
 * @param to - Đơn vị đích
 * @returns Giá trị sau khi đổi đơn vị
 * @throws {Error} Khi giá trị không hợp lệ hoặc đơn vị không được hỗ trợ
 */
export function convertForce(value: number, from: ForceUnit, to: ForceUnit): number {
  assertFiniteValue(value, 'lực');
  const fromFactor: number | undefined = FORCE_TO_N[from];
  const toFactor: number | undefined = FORCE_TO_N[to];
  if (fromFactor === undefined) {
    throw new Error(`Đơn vị lực nguồn không được hỗ trợ: ${String(from)}`);
  }
  if (toFactor === undefined) {
    throw new Error(`Đơn vị lực đích không được hỗ trợ: ${String(to)}`);
  }
  return (value * fromFactor) / toFactor;
}

/**
 * Chuyển đổi khối lượng giữa g, kg, lb, oz.
 * @param value - Giá trị cần đổi (phải là số hữu hạn)
 * @param from - Đơn vị nguồn
 * @param to - Đơn vị đích
 * @returns Giá trị sau khi đổi đơn vị
 * @throws {Error} Khi giá trị không hợp lệ hoặc đơn vị không được hỗ trợ
 */
export function convertMass(value: number, from: MassUnit, to: MassUnit): number {
  assertFiniteValue(value, 'khối lượng');
  const fromFactor: number | undefined = MASS_TO_G[from];
  const toFactor: number | undefined = MASS_TO_G[to];
  if (fromFactor === undefined) {
    throw new Error(`Đơn vị khối lượng nguồn không được hỗ trợ: ${String(from)}`);
  }
  if (toFactor === undefined) {
    throw new Error(`Đơn vị khối lượng đích không được hỗ trợ: ${String(to)}`);
  }
  return (value * fromFactor) / toFactor;
}

/**
 * Chuyển đổi công suất giữa W, kW, HP.
 * @param value - Giá trị cần đổi (phải là số hữu hạn)
 * @param from - Đơn vị nguồn
 * @param to - Đơn vị đích
 * @returns Giá trị sau khi đổi đơn vị
 * @throws {Error} Khi giá trị không hợp lệ hoặc đơn vị không được hỗ trợ
 */
export function convertPower(value: number, from: PowerUnit, to: PowerUnit): number {
  assertFiniteValue(value, 'công suất');
  const fromFactor: number | undefined = POWER_TO_W[from];
  const toFactor: number | undefined = POWER_TO_W[to];
  if (fromFactor === undefined) {
    throw new Error(`Đơn vị công suất nguồn không được hỗ trợ: ${String(from)}`);
  }
  if (toFactor === undefined) {
    throw new Error(`Đơn vị công suất đích không được hỗ trợ: ${String(to)}`);
  }
  return (value * fromFactor) / toFactor;
}

/**
 * Chuyển đổi mô-men xoắn giữa N·m, kN·m, kgf·m, lbf·ft.
 * @param value - Giá trị cần đổi (phải là số hữu hạn)
 * @param from - Đơn vị nguồn
 * @param to - Đơn vị đích
 * @returns Giá trị sau khi đổi đơn vị
 * @throws {Error} Khi giá trị không hợp lệ hoặc đơn vị không được hỗ trợ
 */
export function convertTorque(value: number, from: TorqueUnit, to: TorqueUnit): number {
  assertFiniteValue(value, 'mô-men xoắn');
  const fromFactor: number | undefined = TORQUE_TO_NM[from];
  const toFactor: number | undefined = TORQUE_TO_NM[to];
  if (fromFactor === undefined) {
    throw new Error(`Đơn vị mô-men nguồn không được hỗ trợ: ${String(from)}`);
  }
  if (toFactor === undefined) {
    throw new Error(`Đơn vị mô-men đích không được hỗ trợ: ${String(to)}`);
  }
  return (value * fromFactor) / toFactor;
}
