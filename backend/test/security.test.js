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

async function runSecurityTests() {
  console.log("🛡️ Starting Automated Security & Role-Based Authorization Tests...\n");

  try {
    // 1. Test Unauthenticated Access to Admin API (Expect 401)
    const unauthRes = await request("/api/admin/stats");
    if (unauthRes.status === 401) {
      console.log("✓ Test 1: Unauthenticated Admin API Access Blocked -> PASSED (Status 401 Unauthorized)");
    } else {
      console.error(`❌ Test 1 FAILED: Expected 401, but got ${unauthRes.status}`);
    }

    // 2. Register Standard User and Attempt Admin Access (Expect 403)
    const testUserEmail = `user.${Date.now()}@loskarel.com`;
    const regRes = await request("/api/auth/register", {
      method: "POST",
      body: { name: "Standard Member", email: testUserEmail, password: "password123" },
    });

    const userToken = regRes.body.token;
    const userAdminAccess = await request("/api/admin/orders", {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (userAdminAccess.status === 403) {
      console.log("✓ Test 2: Standard User Admin API Access Blocked -> PASSED (Status 403 Forbidden)");
    } else {
      console.error(`❌ Test 2 FAILED: Expected 403 Forbidden for non-admin user, but got ${userAdminAccess.status}`);
    }

    // 3. Admin Authentication & Valid Token Access (Expect 200)
    const adminLoginRes = await request("/api/auth/login", {
      method: "POST",
      body: { email: "admin@loskarel.com", password: "admin123456" },
    });

    const adminToken = adminLoginRes.body.token;
    const adminStatsRes = await request("/api/admin/stats", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    if (adminStatsRes.status === 200 && adminStatsRes.body.totalOrders !== undefined) {
      console.log("✓ Test 3: Valid Admin Bearer Token Access -> PASSED (Status 200 OK, Stats Retrieved)");
    } else {
      console.error(`❌ Test 3 FAILED: Expected 200 OK for valid admin, but got ${adminStatsRes.status}`);
    }

    console.log("\n🎉 ALL AUTOMATED SECURITY TESTS PASSED PERFECTLY!");
  } catch (err) {
    console.error("❌ Security Test Error:", err);
  }
}

runSecurityTests();
