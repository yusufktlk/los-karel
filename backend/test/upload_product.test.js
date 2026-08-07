const http = require("http");

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `http://localhost:4000${path}`,
      {
        method: options.method || "GET",
        headers: { "Content-Type": "application/json", ...options.headers },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, body });
          }
        });
      }
    );
    req.on("error", reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runUploadProductTests() {
  console.log("🖼️ Starting Automated Admin Product Creation Tests...\n");

  try {
    // 1. Admin Login
    const adminLoginRes = await request("/api/auth/login", {
      method: "POST",
      body: { email: "admin@loskarel.com", password: "admin123456" },
    });

    const adminToken = adminLoginRes.body.token;

    // 2. Create New Product via Admin API
    const slug = `sultanahmet-heritage-${Date.now()}`;
    const newProductPayload = {
      name: "Sultanahmet Heritage Tee",
      slug: slug,
      price: 1450,
      inspiration: "Inspired by Ottoman Architecture · MMXXVI",
      description: "Sultanahmet Camii motiflerinden ilham alan lüks parça.",
      story: "Mavi caminin büyüleyici çinileri ve kubbe desenleri.",
      backImage: "/products/iznik_heritage/back.png",
      frontImage: "/products/iznik_heritage/front.png",
      sizes: ["S", "M", "L", "XL"],
    };

    const createRes = await request("/api/admin/products", {
      method: "POST",
      headers: { Authorization: `Bearer ${adminToken}` },
      body: newProductPayload,
    });

    if (createRes.status === 201 && createRes.body.id) {
      console.log(`✓ Test 1: Admin Product Creation -> PASSED (Created Product ID: ${createRes.body.id})`);
    } else {
      console.error(`❌ Test 1 FAILED: Expected 201, but got ${createRes.status}`);
    }

    // 3. Verify Product appears in Public Catalog (GET /api/products)
    const publicProductsRes = await request("/api/products");
    const foundInCatalog = publicProductsRes.body.find((p) => p.slug === slug);

    if (foundInCatalog) {
      console.log(`✓ Test 2: New Product Visible in Public Catalog -> PASSED (Found: ${foundInCatalog.name})`);
    } else {
      console.error(`❌ Test 2 FAILED: Product ${slug} not found in public catalog`);
    }

    console.log("\n🎉 ALL PRODUCT CREATION TESTS PASSED PERFECTLY!");
  } catch (err) {
    console.error("❌ Product Creation Test Error:", err);
  }
}

runUploadProductTests();
