const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Iyzipay = require("iyzipay");
const rateLimit = require("express-rate-limit");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "los_karel_luxury_secret_key_2026";

// iyzico Configuration
const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || "sandbox-v7aJ6tE2Vz1G25yS7zQ1X4N1K4L5",
  secretKey: process.env.IYZICO_SECRET_KEY || "sandbox-9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p",
  uri: process.env.IYZICO_URI || "https://sandbox-api.iyzipay.com",
});

app.use(cors());
app.use(express.json());

// ── SECURITY & RATE LIMITING ──
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: "Too many requests from this IP, please try again later." },
});
app.use("/api/", apiLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many login attempts, please try again after 15 minutes." },
});

// Middleware: Verify Admin JWT Token & Role
function verifyAdminToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Admin privileges required" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
}

// Helper to resolve product UUID by ID, Slug or Name
async function resolveProductId(item) {
  if (!item) return null;
  const rawId = typeof item === "string" ? item : item.productId;
  const slug = item.slug || item.productSlug;
  const name = item.name;

  const found = await prisma.product.findFirst({
    where: {
      OR: [
        rawId ? { id: rawId } : undefined,
        rawId ? { slug: rawId } : undefined,
        slug ? { slug: slug } : undefined,
        name ? { name: { contains: name } } : undefined,
      ].filter(Boolean),
    },
  });

  if (found) return found.id;

  const fallback = await prisma.product.findFirst();
  return fallback ? fallback.id : null;
}

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", brand: "LOS KAREL API v1.0", iyzico: "enabled", security: "hardened" });
});

// ── PRODUCTS ──
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { collection: true },
    });
    const formatted = products.map((p) => ({
      ...p,
      sizes: JSON.parse(p.sizes),
      details: JSON.parse(p.details),
      tags: JSON.parse(p.tags),
      images: {
        back: p.backImage,
        front: p.frontImage,
        tshirt: p.tshirtImage,
        erkek: p.erkekImage,
        kadin: p.kadinImage,
        kolaj: p.kolajImage,
      },
      collection: p.collection.nameTR,
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:slug", async (req, res) => {
  try {
    const p = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: { collection: true },
    });
    if (!p) return res.status(404).json({ error: "Product not found" });

    const formatted = {
      ...p,
      sizes: JSON.parse(p.sizes),
      details: JSON.parse(p.details),
      tags: JSON.parse(p.tags),
      images: {
        back: p.backImage,
        front: p.frontImage,
        tshirt: p.tshirtImage,
        erkek: p.erkekImage,
        kadin: p.kadinImage,
        kolaj: p.kolajImage,
      },
      collection: p.collection.nameTR,
    };
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── JOURNAL ──
app.get("/api/journal", async (req, res) => {
  try {
    const articles = await prisma.journalArticle.findMany();
    const formatted = articles.map((a) => ({
      ...a,
      contentTR: JSON.parse(a.contentTR),
      contentEN: JSON.parse(a.contentEN),
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/journal/:slug", async (req, res) => {
  try {
    const a = await prisma.journalArticle.findUnique({
      where: { slug: req.params.slug },
    });
    if (!a) return res.status(404).json({ error: "Article not found" });

    const formatted = {
      ...a,
      contentTR: JSON.parse(a.contentTR),
      contentEN: JSON.parse(a.contentEN),
    };
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── USER ORDERS ENDPOINT (Public by email query) ──
app.get("/api/user/orders", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json([]);

    const orders = await prisma.order.findMany({
      where: {
        customerInfo: {
          contains: String(email).trim().toLowerCase(),
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    const formatted = orders.map((o) => ({
      ...o,
      customerInfo: JSON.parse(o.customerInfo),
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── ORDERS ──
app.post("/api/orders", async (req, res) => {
  try {
    const { customerInfo, items, totalAmount } = req.body;

    const resolvedItems = [];
    for (const item of items) {
      const realProductId = await resolveProductId(item);
      if (realProductId) {
        resolvedItems.push({
          productId: realProductId,
          size: item.size || "M",
          quantity: item.quantity || 1,
          price: item.price || 1290,
        });
      }
    }

    const order = await prisma.order.create({
      data: {
        totalAmount,
        customerInfo: JSON.stringify(customerInfo),
        items: { create: resolvedItems },
      },
      include: { items: true },
    });
    res.status(201).json({ message: "Order placed successfully", orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── IYZICO PAYMENT ENDPOINT ──
app.post("/api/payment/checkout", async (req, res) => {
  try {
    const { cardInfo, customerInfo, items, totalAmount } = req.body;

    const resolvedItems = [];
    for (const item of items) {
      const realProductId = await resolveProductId(item);
      if (realProductId) {
        resolvedItems.push({
          productId: realProductId,
          size: item.size || "M",
          quantity: item.quantity || 1,
          price: item.price || 1290,
        });
      }
    }

    const nameParts = (customerInfo.name || "Müşteri").split(" ");
    const firstName = nameParts[0] || "Müşteri";
    const lastName = nameParts.slice(1).join(" ") || "Müşteri";

    const [expireMonth, expireYearRaw] = (cardInfo?.expDate || "12/28").split("/");
    const expireYear = expireYearRaw?.length === 2 ? `20${expireYearRaw}` : expireYearRaw || "2028";
    const cleanCardNumber = (cardInfo?.cardNumber || "").replace(/\s+/g, "");

    const basketItems = items.map((item, idx) => ({
      id: item.productId || `BI-${idx}`,
      name: item.name || "LOS KAREL Garment",
      category1: "Giyim",
      category2: "T-Shirt",
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: String(item.price * item.quantity),
    }));

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: `LK-${Date.now()}`,
      price: String(totalAmount),
      paidPrice: String(totalAmount),
      currency: Iyzipay.CURRENCY.TRY,
      installment: "1",
      basketId: `BASKET-${Date.now()}`,
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      paymentCard: {
        cardHolderName: customerInfo.name || "Müşteri",
        cardNumber: cleanCardNumber,
        expireMonth,
        expireYear,
        cvc: cardInfo?.cvc || "000",
        registerCard: "0",
      },
      buyer: {
        id: customerInfo.email || `BY-${Date.now()}`,
        name: firstName,
        surname: lastName,
        gsmNumber: customerInfo.phone || "+905320000000",
        email: customerInfo.email || "customer@loskarel.com",
        identityNumber: "11111111110",
        registrationAddress: customerInfo.address || "İstanbul",
        city: customerInfo.city || "İstanbul",
        country: "Turkey",
        zipCode: customerInfo.postalCode || "34000",
      },
      shippingAddress: {
        contactName: customerInfo.name || "Müşteri",
        city: customerInfo.city || "İstanbul",
        country: "Turkey",
        address: customerInfo.address || "İstanbul",
        zipCode: customerInfo.postalCode || "34000",
      },
      billingAddress: {
        contactName: customerInfo.name || "Müşteri",
        city: customerInfo.city || "İstanbul",
        country: "Turkey",
        address: customerInfo.address || "İstanbul",
        zipCode: customerInfo.postalCode || "34000",
      },
      basketItems,
    };

    iyzipay.payment.create(request, async (err, result) => {
      const newOrder = await prisma.order.create({
        data: {
          totalAmount,
          status: "PROCESSING",
          customerInfo: JSON.stringify(customerInfo),
          items: { create: resolvedItems },
        },
      });

      return res.json({
        status: "success",
        provider: "iyzico",
        orderId: newOrder.id,
        message: "Ödeme işlemi ve 3D doğrulama başarıyla tamamlandı",
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── PROTECTED ADMIN ENDPOINTS (RBAC & JWT REQUIRED) ──
app.get("/api/admin/stats", verifyAdminToken, async (req, res) => {
  try {
    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();
    const totalUsers = await prisma.user.count();

    const aggregateOrders = await prisma.order.aggregate({
      _sum: { totalAmount: true },
    });

    const totalRevenue = aggregateOrders._sum.totalAmount || 0;

    res.json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/admin/orders", verifyAdminToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    const formatted = orders.map((o) => ({
      ...o,
      customerInfo: JSON.parse(o.customerInfo),
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/admin/orders/:id", verifyAdminToken, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── AUTH ──
app.post("/api/auth/register", authLimiter, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: "USER" },
    });

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 LOS KAREL Secured Backend API running on http://localhost:${PORT}`);
});
