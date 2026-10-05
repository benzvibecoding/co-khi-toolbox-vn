import Dexie, { type Table } from 'dexie';
import type { CalculationRecord } from '@/types/calculator';

/** IndexedDB qua Dexie.js — lich su phep tinh (Phase 5). Giu fallback localStorage khi SSR. */
class ToolboxDB extends Dexie {
  calculations!: Table<CalculationRecord, string>;

  constructor() {
    super('cokhi-toolbox');
    this.version(1).stores({
      calculations: 'id, toolId, timestamp',
    });
  }
}

let dbInstance: ToolboxDB | null = null;

/** Lay singleton DB (chi dung o client). */
export function getDB(): ToolboxDB {
  if (!dbInstance) dbInstance = new ToolboxDB();
  return dbInstance;
}

/** Ghi 1 record, gioi han 200 ban ghi moi nhat (Pro: khong gioi han — xu ly o hook). */
export async function addRecord(record: CalculationRecord, limit = 200): Promise<void> {
  const db = getDB();
  await db.calculations.put(record);
  const count = await db.calculations.count();
  if (count > limit) {
    const oldest = await db.calculations.orderBy('timestamp').limit(count - limit).primaryKeys();
    await db.calculations.bulkDelete(oldest);
  }
}

export async function getRecords(toolId?: string, limit = 200): Promise<CalculationRecord[]> {
  const db = getDB();
  const base = toolId
    ? db.calculations.where('toolId').equals(toolId)
    : db.calculations.orderBy('timestamp');
  const list = toolId
    ? await db.calculations.where('toolId').equals(toolId).sortBy('timestamp')
    : await base.reverse().limit(limit).toArray();
  // where().sortBy tra ve tang dan → dao nguoc de moi nhat truoc
  if (toolId) return list.reverse().slice(0, limit);
  return list;
}

export async function clearRecords(toolId?: string): Promise<void> {
  const db = getDB();
  if (toolId) {
    await db.calculations.where('toolId').equals(toolId).delete();
  } else {
    await db.calculations.clear();
  }
}

export async function deleteRecord(id: string): Promise<void> {
  await getDB().calculations.delete(id);
}
