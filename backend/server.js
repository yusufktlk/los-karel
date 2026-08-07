const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "los_karel_luxury_secret_key_2026";

app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", brand: "LOS KAREL API v1.0" });
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

// ── ORDERS ──
app.post("/api/orders", async (req, res) => {
  try {
    const { customerInfo, items, totalAmount } = req.body;
    const order = await prisma.order.create({
      data: {
        totalAmount,
        customerInfo: JSON.stringify(customerInfo),
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });
    res.status(201).json({ message: "Order placed successfully", orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── ADMIN ENDPOINTS ──
app.get("/api/admin/stats", async (req, res) => {
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

app.get("/api/admin/orders", async (req, res) => {
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

app.put("/api/admin/orders/:id", async (req, res) => {
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
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 LOS KAREL Backend API running on http://localhost:${PORT}`);
});
