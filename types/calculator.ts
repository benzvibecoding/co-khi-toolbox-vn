// Kieu dung chung cho calculator — mo rong dan o Phase 2+
export interface CalculatorMeta {
  id: string;
  name: string;
  description: string;
  href: string;
  group: CalculatorGroupId;
  icon: string;
  formula: string;
}

export type CalculatorGroupId =
  | 'cat-got'
  | 'ren'
  | 'dung-sai'
  | 'banh-rang'
  | 'luc'
  | 'khoi-luong'
  | 'don-vi';

export interface CalculatorGroup {
  id: CalculatorGroupId;
  name: string;
  description: string;
}

export interface CalculationRecord {
  id: string;
  toolId: string;
  toolName: string;
  inputs: Record<string, number | string>;
  outputs: Record<string, number | string>;
  timestamp: number;
}

export type UnitSystem = 'metric' | 'imperial';

export interface FieldError {
  message: string;
}
