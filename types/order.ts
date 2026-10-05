/** Don mua Pro. */

export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

/** Ban ghi orders (khop migration 002_orders.sql). */
export interface OrderRow {
  id: string;
  user_id: string;
  plan: 'monthly' | 'yearly';
  amount: number;
  method: string;
  status: OrderStatus;
  note: string | null;
  created_at: string;
  decided_at: string | null;
}
