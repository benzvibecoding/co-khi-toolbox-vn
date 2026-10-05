'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ORDER_STATUS_LABEL, type Order } from '@/lib/pro/plans';
import { createClient } from '@/lib/supabase/client';

/** Lich su don mua Pro cua user hien tai (hien trong /tai-khoan). */
export function OrderHistory() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setOrders([]);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) {
        if (!cancelled) setOrders([]);
        return;
      }
      const { data } = await supabase
        .from('orders')
        .select('id, user_id, plan, amount, method, status, note, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      if (!cancelled) setOrders((data as Order[] | null) ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (orders === null) return <p className="text-xs text-muted">Đang tải đơn hàng…</p>;
  if (orders.length === 0) {
    return (
      <p className="text-sm text-secondary">
        Chưa có đơn hàng nào.{' '}
        <Link href="/pro" className="font-semibold underline" style={{ color: 'var(--accent)' }}>
          Xem gói Pro
        </Link>
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {orders.map((o) => (
        <li
          key={o.id}
          className="flex flex-wrap items-center justify-between gap-2 rounded-input border px-3 py-2.5 text-sm"
          style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}
        >
          <span className="font-mono text-xs text-muted">
            {new Date(o.created_at).toLocaleString('vi-VN')} · {o.plan === 'yearly' ? 'Pro năm' : 'Pro tháng'}
          </span>
          <span className="font-mono text-xs font-bold text-primary">
            {o.amount.toLocaleString('vi-VN')}đ · {ORDER_STATUS_LABEL[o.status] ?? o.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
