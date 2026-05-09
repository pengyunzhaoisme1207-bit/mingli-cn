const PAYMENT_CENTER =
  process.env.NEXT_PUBLIC_PAYMENT_CENTER_URL || "https://pay.next-happy.com";

export interface PayCreateRequest {
  product_name: string;
  amount: number;
  project_id: string;
}

export interface PayCreateResponse {
  order_no: string;
  product_name: string;
  amount: number;
  status: "pending" | "paid" | "failed";
  pay_url: string;
}

export interface PayStatusResponse {
  code: number;
  order_no: string;
  status: "pending" | "paid" | "failed";
  amount: number;
  product_name: string;
  paid_at: string | null;
}

export async function createPayOrder(
  req: PayCreateRequest
): Promise<PayCreateResponse> {
  const res = await fetch(`${PAYMENT_CENTER}/api/v1/pay/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error("Failed to create payment order");
  return res.json();
}

export async function checkPayStatus(
  orderNo: string
): Promise<PayStatusResponse> {
  const res = await fetch(
    `${PAYMENT_CENTER}/api/v1/pay/status?order_no=${orderNo}`
  );
  if (!res.ok) throw new Error("Failed to check payment status");
  return res.json();
}
