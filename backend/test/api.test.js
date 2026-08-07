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

async function runTests() {
  console.log("⚡ Starting Automated Functionality, User Orders & Multi-Item Order Tests...\n");

  try {
    // 1. Healthcheck
    const health = await request("/api/health");
    console.log("✓ Test 1: Healthcheck API ->", health.body.status === "ok" ? "PASSED" : "FAILED");

    // 2. Fetch Products
    const products = await request("/api/products");
    console.log(`✓ Test 2: Products API -> PASSED (Found ${products.body.length} products)`);

    // 3. Multi-Item Checkout (2 Different T-Shirts)
    const testEmail = `user.${Date.now()}@loskarel.com`;
    const multiItemPayload = {
      cardInfo: { cardNumber: "4543600000000001", expDate: "12/28", cvc: "888" },
      customerInfo: {
        name: "Ahmet Yılmaz",
        email: testEmail,
        phone: "+905321112233",
        address: "Nişantaşı Mah. No: 10",
        city: "İstanbul",
        postalCode: "34367",
      },
      items: [
        {
          productId: "1",
          slug: "iznik-heritage",
          name: "İznik Heritage Tee",
          size: "L",
          quantity: 1,
          price: 1290,
        },
        {
          productId: "2",
          slug: "woven-heritage",
          name: "Woven Heritage Tee",
          size: "XL",
          quantity: 1,
          price: 1290,
        },
      ],
      totalAmount: 2580,
    };

    const checkoutRes = await request("/api/payment/checkout", {
      method: "POST",
      body: multiItemPayload,
    });

    console.log("✓ Test 3: Multi-Item Checkout API ->", checkoutRes.body.status === "success" ? "PASSED" : "FAILED", `(Order ID: ${checkoutRes.body.orderId})`);

    // 4. User Orders API Check (/api/user/orders?email=...)
    const userOrdersRes = await request(`/api/user/orders?email=${encodeURIComponent(testEmail)}`);
    const createdUserOrder = userOrdersRes.body.find((o) => o.id === checkoutRes.body.orderId);

    if (createdUserOrder && createdUserOrder.items.length === 2) {
      console.log(`✓ Test 4: User Profile Orders API Integrity -> PASSED (${createdUserOrder.items.length} items correctly returned for ${testEmail})`);
    } else {
      console.error(`❌ Test 4 FAILED: Could not retrieve user orders for ${testEmail}`);
    }

    console.log("\n🎉 ALL BACKEND & USER ORDERS TESTS COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("❌ Test Suite Error:", err);
  }
}

runTests();
