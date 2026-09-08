/**
 * cPanel Node.js adapter for TanStack Start (fetch-handler → Node.js HTTP)
 *
 * cPanel "Node.js App" starts whatever file is set as the Application startup file.
 * Set this to:  app.mjs
 * Node.js version: 22
 * Application root: (your app folder)
 * Application URL:  / (or a subdirectory)
 */

import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import nodemailer from "nodemailer";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const ADMIN_EMAIL = process.env.ORDER_ADMIN_EMAIL || "info@shelterservicesinternational.com";

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>\"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function isValidOrder(payload) {
  return (
    payload &&
    typeof payload === "object" &&
    typeof payload.customerEmail === "string" &&
    payload.customerEmail.includes("@") &&
    typeof payload.customerName === "string" &&
    Array.isArray(payload.items) &&
    typeof payload.totalPrice === "number"
  );
}

function orderEmailHtml(order) {
  const rows = order.items
    .map(
      ({ product, quantity }) =>
        `<tr><td>${escapeHtml(product.name)}</td><td>${quantity} kg</td><td>$${(product.price * quantity).toFixed(2)}</td></tr>`,
    )
    .join("");
  return `<h2>Order #${escapeHtml(order.orderId.slice(0, 8).toUpperCase())}</h2>
    <p>Thank you, ${escapeHtml(order.customerName)}. Your order request has been received.</p>
    <table cellpadding="8" cellspacing="0" border="1"><thead><tr><th>Product</th><th>Quantity</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table>
    <p><strong>Total quantity:</strong> ${escapeHtml(order.totalQty)} kg<br><strong>Subtotal:</strong> $${order.totalPrice.toFixed(2)}</p>
    <p><strong>Company:</strong> ${escapeHtml(order.customerCompany || "-")}<br><strong>Phone:</strong> ${escapeHtml(order.customerPhone)}<br><strong>Location:</strong> ${escapeHtml(order.city || "-")}, ${escapeHtml(order.country)}<br><strong>Notes:</strong> ${escapeHtml(order.notes || "None")}</p>`;
}

async function sendOrderEmail(request, response) {
  if (request.method !== "POST" || request.url !== "/api/order-email") return false;
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  let order;
  try {
    order = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    response.writeHead(400, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "Invalid request" }));
    return true;
  }
  if (!isValidOrder(order)) {
    response.writeHead(400, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "Incomplete order" }));
    return true;
  }
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.");
    response.writeHead(503, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "Email service is not configured" }));
    return true;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_SECURE || "true") === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const html = orderEmailHtml(order);
  const from = process.env.ORDER_EMAIL_FROM || process.env.SMTP_USER;
  await transporter.sendMail({
    from,
    to: order.customerEmail,
    subject: `Order receipt #${order.orderId.slice(0, 8).toUpperCase()}`,
    html,
  });
  await transporter.sendMail({
    from,
    to: ADMIN_EMAIL,
    replyTo: order.customerEmail,
    subject: `New order #${order.orderId.slice(0, 8).toUpperCase()}`,
    html,
  });
  response.writeHead(204);
  response.end();
  return true;
}

async function sendContactEmail(request, response) {
  if (request.method !== "POST" || request.url !== "/api/contact-email") return false;
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  let message;
  try {
    message = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    response.writeHead(400, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "Invalid request" }));
    return true;
  }
  if (
    !message ||
    typeof message.email !== "string" ||
    !message.email.includes("@") ||
    typeof message.name !== "string" ||
    typeof message.message !== "string"
  ) {
    response.writeHead(400, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "Incomplete message" }));
    return true;
  }
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    response.writeHead(503, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "Email service is not configured" }));
    return true;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_SECURE || "true") === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const html = `<h2>${escapeHtml(message.kind === "newsletter" ? "Newsletter subscription" : "Contact form inquiry")}</h2>
    <p><strong>Name:</strong> ${escapeHtml(message.name)}<br><strong>Email:</strong> ${escapeHtml(message.email)}<br><strong>Phone:</strong> ${escapeHtml(message.phone || "-")}<br><strong>Company:</strong> ${escapeHtml(message.company || "-")}</p>
    <p>${escapeHtml(message.message).replace(/\n/g, "<br>")}</p>`;
  const from = process.env.ORDER_EMAIL_FROM || process.env.SMTP_USER;
  await transporter.sendMail({
    from,
    to: ADMIN_EMAIL,
    replyTo: message.email,
    subject:
      message.kind === "newsletter" ? "New newsletter subscriber" : "New contact form inquiry",
    html,
  });
  response.writeHead(204);
  response.end();
  return true;
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

async function serveStatic(request, response) {
  const requestedPath = decodeURIComponent((request.url || "/").split("?")[0]);
  const safePath = normalize(requestedPath).replace(/^([/\\])+/, "");
  const distRoot = join(process.cwd(), "dist");
  const candidates = [
    join(distRoot, safePath),
    join(distRoot, safePath, "index.html"),
    join(distRoot, "index.html"),
  ];

  for (const filePath of candidates) {
    if (!filePath.startsWith(distRoot)) continue;
    try {
      if (!(await stat(filePath)).isFile()) continue;
      response.writeHead(200, {
        "content-type": contentTypes[extname(filePath)] || "application/octet-stream",
      });
      createReadStream(filePath).pipe(response);
      return;
    } catch {
      // Try the next generated route or the root page.
    }
  }

  response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  response.end("Not Found");
}

/** Convert a Node IncomingMessage into a WHATWG Request */
async function nodeToWebRequest(req) {
  const protocol = req.headers["x-forwarded-proto"]?.split(",")[0]?.trim() ?? "http";
  const host = req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost";
  const url = `${protocol}://${host}${req.url}`;

  const method = req.method ?? "GET";
  const hasBody = method !== "GET" && method !== "HEAD";

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }

  if (hasBody) {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    return new Request(url, { method, headers, body });
  }

  return new Request(url, { method, headers });
}

/** Stream a WHATWG Response back to the Node ServerResponse */
async function webToNodeResponse(webRes, res) {
  res.statusCode = webRes.status;
  for (const [key, value] of webRes.headers.entries()) {
    res.setHeader(key, value);
  }

  if (!webRes.body) {
    res.end();
    return;
  }

  const reader = webRes.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!res.write(value)) {
      // Back-pressure: wait for drain before continuing
      await new Promise((resolve) => res.once("drain", resolve));
    }
  }
  res.end();
}

const server = createServer(async (req, res) => {
  try {
    if (await sendOrderEmail(req, res)) return;
    if (await sendContactEmail(req, res)) return;
    await serveStatic(req, res);
  } catch (err) {
    console.error("[app.mjs] Unhandled error:", err);
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "text/plain" });
    }
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
