/** Goi Pro + thong tin nhan thanh toan (doc tu env, co fallback demo). */

export interface ProPlan {
  id: 'monthly' | 'yearly';
  name: string;
  amount: number;
  durationDays: number;
  description: string;
  badge?: string;
}

export const PRO_PLANS: ProPlan[] = [
  {
    id: 'monthly',
    name: 'Pro tháng',
    amount: 49000,
    durationDays: 30,
    description: 'Mọi tính năng Pro trong 30 ngày. Gia hạn bất cứ lúc nào.',
  },
  {
    id: 'yearly',
    name: 'Pro năm',
    amount: 490000,
    durationDays: 365,
    description: 'Tiết kiệm 2 tháng so với gói tháng. Ưu tiên hỗ trợ.',
    badge: 'Tiết kiệm 17%',
  },
];

/** Format VND: 49000 -> "49.000đ". */
export function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`;
}

/** Thong tin tai khoan nhan tien — cau hinh qua env tren Vercel. */
export function getBankInfo(): { bank: string; account: string; name: string } | null {
  const bank = process.env.NEXT_PUBLIC_BANK_CODE;
  const account = process.env.NEXT_PUBLIC_BANK_ACCOUNT;
  const name = process.env.NEXT_PUBLIC_BANK_NAME;
  if (!bank || !account || !name) return null;
  return { bank, account, name };
}

/** Link anh VietQR de user quet ma (chi co khi da cau hinh bank). */
export function getVietQRUrl(amount: number, content: string): string | null {
  const info = getBankInfo();
  if (!info) return null;
  const params = new URLSearchParams({
    amount: String(amount),
    addInfo: content,
    accountName: info.name,
  });
  return `https://img.vietqr.io/image/${info.bank}-${info.account}-compact2.png?${params.toString()}`;
}

/** Ma noi dung chuyen khoan rut gon tu order id: "CKH <8 ky tu dau>". */
export function getTransferContent(orderId: string): string {
  return `CKH ${orderId.replace(/-/g, '').slice(0, 8).toUpperCase()}`;
}

/** Trich ma CKH XXXXXXXX tu noi dung chuyen khoan cua ngan hang (tra ve null neu khong co). */
export function extractTransferCode(content: string): string | null {
  const m = content.toUpperCase().match(/CKH\s*([A-Z0-9]{8})/);
  return m?.[1] ?? null;
}

export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface Order {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  method: string;
  status: OrderStatus;
  note: string | null;
  created_at: string;
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã kích hoạt Pro',
  rejected: 'Bị từ chối',
  cancelled: 'Đã hủy',
};
