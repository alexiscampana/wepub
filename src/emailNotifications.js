// ── Email Notification Service ────────────────────────────────
// Sends transactional emails via Supabase Edge Functions.
// Falls back to console.log if not configured.
//
// To enable real emails:
// 1. Create a Supabase Edge Function called "send-email"
// 2. Set up Resend, SendGrid, or Postmark in that function
// 3. Add RESEND_API_KEY (or similar) to your Supabase secrets

import { supabase } from "./supabase.js";

// ── Template helpers ──────────────────────────────────────────

function formatCurrency(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function formatItems(items = []) {
  return items.map(i => `• ${i.name} × ${i.qty || 1} — ${formatCurrency((i.price || 0) * (i.qty || 1))}`).join("\n");
}

// ── Core send function ────────────────────────────────────────

async function sendEmail({ to, subject, html, text }) {
  try {
    const { error } = await supabase.functions.invoke("send-email", {
      body: { to, subject, html, text },
    });
    if (error) throw error;
    return { success: true };
  } catch (err) {
    // Fallback: log to console in development
    if (import.meta.env.DEV) {
      console.log("📧 Email (dev mode):", { to, subject, text });
    }
    return { success: false, error: err };
  }
}

// ── Order confirmation ────────────────────────────────────────

export async function sendOrderConfirmation({ order, customer }) {
  const subject = `Order confirmed — ${order.order_number || order.id}`;

  const text = `
Hi ${customer.name || "there"},

Your order has been confirmed! Here's a summary:

Order: ${order.order_number || order.id}
Date: ${new Date().toLocaleDateString()}

Items:
${formatItems(order.items)}

Subtotal: ${formatCurrency(order.subtotal)}
Shipping: ${order.shipping_cost === 0 ? "Free" : formatCurrency(order.shipping_cost)}
Total: ${formatCurrency(order.total)}

We'll send you a shipping notification once your order is on its way.

Thanks for shopping with ShopPress!
`;

  const html = `
<div style="font-family: 'DM Sans', sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
  <div style="background: #00b67a; padding: 24px 32px; border-radius: 16px 16px 0 0;">
    <h1 style="color: #fff; font-size: 24px; margin: 0;">Order confirmed! 🎉</h1>
  </div>
  <div style="background: #fff; border: 1px solid #ebebeb; border-top: none; padding: 32px; border-radius: 0 0 16px 16px;">
    <p style="font-size: 16px; color: #555;">Hi ${customer.name || "there"},</p>
    <p style="font-size: 15px; color: #555;">Thanks for your order. Here's a summary:</p>

    <div style="background: #fafafa; border-radius: 12px; padding: 20px; margin: 20px 0;">
      <p style="font-size: 13px; color: #aaa; margin: 0 0 4px;">Order number</p>
      <p style="font-size: 18px; font-weight: 700; margin: 0 0 16px;">${order.order_number || order.id}</p>

      ${(order.items || []).map(item => `
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
          <span style="font-size: 14px;">${item.emoji || "🛍️"} ${item.name} × ${item.qty || 1}</span>
          <span style="font-size: 14px; font-weight: 600;">${formatCurrency((item.price || 0) * (item.qty || 1))}</span>
        </div>
      `).join("")}

      <div style="margin-top: 12px; padding-top: 12px; border-top: 2px solid #f0f0f0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 13px; color: #888;">Subtotal</span>
          <span style="font-size: 13px;">${formatCurrency(order.subtotal)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 13px; color: #888;">Shipping</span>
          <span style="font-size: 13px; color: #00b67a;">${order.shipping_cost === 0 ? "Free" : formatCurrency(order.shipping_cost)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="font-size: 16px; font-weight: 700;">Total</span>
          <span style="font-size: 16px; font-weight: 700;">${formatCurrency(order.total)}</span>
        </div>
      </div>
    </div>

    <p style="font-size: 14px; color: #666;">We'll send you another email once your order ships.</p>
    <a href="https://shoppress.io/orders" style="display: inline-block; background: #00b67a; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600; margin-top: 8px;">Track your order →</a>
  </div>
  <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 20px;">ShopPress Inc. · Rua do Ouro 42, Lisbon, Portugal</p>
</div>
`;

  return sendEmail({ to: customer.email, subject, html, text });
}

// ── Shipping notification ─────────────────────────────────────

export async function sendShippingNotification({ order, customer, trackingNumber, carrier }) {
  const subject = `Your order is on its way! — ${order.order_number || order.id}`;

  const html = `
<div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
  <div style="background: #2196f3; padding: 24px 32px; border-radius: 16px 16px 0 0;">
    <h1 style="color: #fff; font-size: 24px; margin: 0;">Your order has shipped! 🚚</h1>
  </div>
  <div style="background: #fff; border: 1px solid #ebebeb; border-top: none; padding: 32px; border-radius: 0 0 16px 16px;">
    <p>Hi ${customer.name || "there"},</p>
    <p>Great news — your order <strong>${order.order_number || order.id}</strong> is on its way.</p>
    <div style="background: #fafafa; border-radius: 12px; padding: 20px; margin: 20px 0;">
      <p style="font-size: 13px; color: #aaa; margin: 0 0 4px;">Carrier</p>
      <p style="font-size: 16px; font-weight: 600; margin: 0 0 12px;">${carrier || "Standard carrier"}</p>
      <p style="font-size: 13px; color: #aaa; margin: 0 0 4px;">Tracking number</p>
      <p style="font-size: 16px; font-weight: 600; margin: 0;">${trackingNumber || "Will be updated shortly"}</p>
    </div>
  </div>
</div>
`;

  return sendEmail({ to: customer.email, subject, html, text: `Your order ${order.order_number || order.id} has shipped via ${carrier}. Tracking: ${trackingNumber}` });
}

// ── Low stock alert (to merchant) ────────────────────────────

export async function sendLowStockAlert({ product, merchantEmail, stock }) {
  const subject = `⚠️ Low stock alert: ${product.name}`;
  const text = `Your product "${product.name}" is running low. Only ${stock} units remaining. Please restock soon.`;
  return sendEmail({ to: merchantEmail, subject, html: `<p>${text}</p>`, text });
}

// ── Welcome email ─────────────────────────────────────────────

export async function sendWelcomeEmail({ user }) {
  const subject = "Welcome to ShopPress! 🎉";
  const html = `
<div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #00b67a, #2196f3); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
    <h1 style="color: #fff; font-size: 28px; margin: 0;">Welcome to ShopPress! 🎉</h1>
  </div>
  <div style="background: #fff; border: 1px solid #ebebeb; border-top: none; padding: 32px; border-radius: 0 0 16px 16px;">
    <p>Hi ${user.name || "there"},</p>
    <p>Your account is all set. Here's what to do next:</p>
    <ul>
      <li>Add your first product</li>
      <li>Customize your storefront theme</li>
      <li>Write your first blog post</li>
      <li>Connect a payment method</li>
    </ul>
    <a href="https://shoppress.io/dashboard" style="display: inline-block; background: #00b67a; color: #fff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; margin-top: 12px;">Go to dashboard →</a>
    <p style="font-size: 13px; color: #aaa; margin-top: 24px;">Your 14-day free trial has started. No credit card required.</p>
  </div>
</div>
`;
  return sendEmail({ to: user.email, subject, html, text: `Welcome to ShopPress, ${user.name || "there"}! Your account is ready. Visit your dashboard to get started.` });
}
