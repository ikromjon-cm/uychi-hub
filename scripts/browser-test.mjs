import { chromium } from "playwright";

const BASE = "http://localhost:3000";

// Public routes
const publicRoutes = [
  "/",
  "/startups",
  "/schedule",
  "/privacy",
  "/education",
  "/ai-center",
  "/library",
  "/ai-features",
  "/register",
  "/news",
  "/partners",
  "/jobs",
  "/events",
  "/login",
  "/companies",
  "/investors",
  "/media",
  "/apply/investor",
  "/apply/startup",
  "/startups/1",
  "/news/12",
];

// Admin routes
const adminRoutes = [
  "/admin/login",
  "/admin/dashboard",
  "/admin/coworking",
  "/admin/startups",
  "/admin/contact",
  "/admin/education",
  "/admin/content",
  "/admin/roles",
  "/admin/permissions",
  "/admin/careers",
  "/admin/students",
  "/admin/logs",
  "/admin/news",
  "/admin/partners",
  "/admin/newsletter",
  "/admin/events",
  "/admin/backup",
  "/admin/seo",
  "/admin/analytics",
  "/admin/investors",
  "/admin/media",
  "/admin/hub/startups",
  "/admin/hub/leads",
  "/admin/hub/announcements",
  "/admin/hub/hero-video",
  "/admin/hub/news",
  "/admin/hub/partners",
  "/admin/hub/jobs",
  "/admin/hub/stats",
];

const allRoutes = [...publicRoutes, ...adminRoutes];

const results = [];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });

for (const route of allRoutes) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("requestfailed", (req) => {
    const f = req.failure();
    failedRequests.push(`${req.method()} ${req.url()} :: ${f ? f.errorText : "?"}`);
  });
  page.on("response", (resp) => {
    const u = resp.url();
    const s = resp.status();
    if (s >= 400 && (u.includes("/api/") || u.startsWith(BASE))) {
      failedRequests.push(`HTTP ${s} ${u}`);
    }
  });

  let status = "OK";
  let httpStatus = null;
  try {
    const resp = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
    httpStatus = resp ? resp.status() : null;
    await page.waitForTimeout(1200);
    // detect Next.js error overlay / not-found
    const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 400));
    if (/Application error|Unhandled Runtime Error|This page could not be found|Internal Server Error/i.test(bodyText)) {
      status = "PAGE-ERROR";
    }
  } catch (e) {
    status = "NAV-FAIL";
    pageErrors.push(String(e.message || e));
  }

  results.push({
    route,
    httpStatus,
    status,
    consoleErrors: [...new Set(consoleErrors)],
    pageErrors: [...new Set(pageErrors)],
    failedRequests: [...new Set(failedRequests)],
  });
  await page.close();
}

await browser.close();

// Report
let problems = 0;
for (const r of results) {
  const hasIssue =
    r.status !== "OK" ||
    r.pageErrors.length ||
    r.consoleErrors.length ||
    r.failedRequests.length;
  const tag = hasIssue ? "❌" : "✅";
  if (hasIssue) problems++;
  console.log(`${tag} [${r.httpStatus ?? "-"}] ${r.route} (${r.status})`);
  for (const e of r.pageErrors) console.log(`     PAGEERR: ${e}`);
  for (const e of r.consoleErrors) console.log(`     CONSOLE: ${e}`);
  for (const e of r.failedRequests) console.log(`     NETFAIL: ${e}`);
}
console.log(`\n=== ${results.length} routes tested, ${problems} with issues ===`);
