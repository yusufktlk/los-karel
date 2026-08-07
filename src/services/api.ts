import { Product, getAllProducts } from "@/data/products";
import { Article, articles } from "@/data/journal";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("los_karel_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchProductsAPI(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return getAllProducts();
  }
}

export async function fetchProductBySlugAPI(slug: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return getAllProducts().find((p) => p.slug === slug);
  }
}

export async function fetchJournalAPI(): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/journal`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return articles;
  }
}

export async function createOrderAPI(orderData: {
  customerInfo: any;
  items: any[];
  totalAmount: number;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

export async function processIyzicoPaymentAPI(paymentPayload: {
  cardInfo: { cardNumber: string; expDate: string; cvc: string };
  customerInfo: any;
  items: any[];
  totalAmount: number;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/payment/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentPayload),
    });
    if (!res.ok) throw new Error("Payment API error");
    return await res.json();
  } catch (err) {
    return { status: "error", message: "iyzico ödeme sunucusuna bağlanılamadı" };
  }
}

export async function fetchUserOrdersAPI(email: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/user/orders?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return [];
  }
}

export async function fetchAdminStatsAPI() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      cache: "no-store",
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchAdminOrdersAPI() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/orders`, {
      cache: "no-store",
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return [];
  }
}

export async function updateOrderStatusAPI(orderId: string, status: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}
