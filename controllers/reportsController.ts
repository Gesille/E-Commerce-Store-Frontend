import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import { odooRequest } from "../odoo/odoo.client.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import puppeteer from "puppeteer";

// ─── helpers ────────────────────────────────────────────────────────────────

function buildDomain(dateFrom: string, dateTo: string) {
  return [
    ["state", "in", ["sale", "done"]],        // confirmed + done orders only
    ["date_order", ">=", `${dateFrom} 00:00:00`],
    ["date_order", "<=", `${dateTo} 23:59:59`],
  ];
}

function isoDate(d: Date) {
  return d.toISOString().split("T")[0];
}

// ─── Monthly report  (one row per month for a given year) ───────────────────

export const getMonthlySalesReport = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const year = parseInt(req.query.year as string) || new Date().getFullYear();

    // Pull every confirmed order for the whole year in one request
    const orders = await odooRequest("sale.order", "search_read", [
      buildDomain(`${year}-01-01`, `${year}-12-31`),
    ], {
      fields: ["name", "date_order", "amount_total", "amount_untaxed", "state"],
    });

    // Aggregate per month
    const months: Record<number, {
      month: number;
      label: string;
      orders: number;
      revenue: number;
      revenue_untaxed: number;
    }> = {};

    for (let m = 1; m <= 12; m++) {
      months[m] = {
        month: m,
        label: new Date(year, m - 1, 1).toLocaleString("en-US", { month: "long" }),
        orders: 0,
        revenue: 0,
        revenue_untaxed: 0,
      };
    }

    for (const order of orders as any[]) {
      const m = new Date(order.date_order).getMonth() + 1;
      months[m].orders += 1;
      months[m].revenue += order.amount_total;
      months[m].revenue_untaxed += order.amount_untaxed;
    }

    res.json({
      success: true,
      year,
      total_orders: orders.length,
      total_revenue: Object.values(months).reduce((s, m) => s + m.revenue, 0),
      months: Object.values(months),
    });
  }
);

// ─── Daily report  (one row per day for a given month) ──────────────────────

export const getDailySalesReport = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const year  = parseInt(req.query.year  as string) || new Date().getFullYear();
    const month = parseInt(req.query.month as string) || new Date().getMonth() + 1;

    const dateFrom = `${year}-${String(month).padStart(2, "0")}-01`;
    const lastDay  = new Date(year, month, 0).getDate(); // last day of month
    const dateTo   = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    const orders = await odooRequest("sale.order", "search_read", [
      buildDomain(dateFrom, dateTo),
    ], {
      fields: ["name", "date_order", "amount_total", "amount_untaxed", "state"],
    });

    // Aggregate per day
    const days: Record<string, {
      date: string;
      orders: number;
      revenue: number;
      revenue_untaxed: number;
    }> = {};

    for (let d = 1; d <= lastDay; d++) {
      const key = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days[key] = { date: key, orders: 0, revenue: 0, revenue_untaxed: 0 };
    }

    for (const order of orders as any[]) {
      const key = isoDate(new Date(order.date_order));
      if (days[key]) {
        days[key].orders  += 1;
        days[key].revenue += order.amount_total;
        days[key].revenue_untaxed += order.amount_untaxed;
      }
    }

    res.json({
      success: true,
      year,
      month,
      date_range: { from: dateFrom, to: dateTo },
      total_orders: orders.length,
      total_revenue: Object.values(days).reduce((s, d) => s + d.revenue, 0),
      days: Object.values(days),
    });
  }
);

// ─── Per-product breakdown for a date range ─────────────────────────────────
// Useful for "which products sold most this month"

export const getProductSalesReport = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date_from, date_to } = req.query as Record<string, string>;

    if (!date_from || !date_to) {
      return next(new ErrorHandler("date_from and date_to are required (YYYY-MM-DD)", 400));
    }

    // sale.order.line gives product-level detail
    const lines = await odooRequest("sale.order.line", "search_read", [
      [
        ["order_id.state", "in", ["sale", "done"]],
        ["order_id.date_order", ">=", `${date_from} 00:00:00`],
        ["order_id.date_order", "<=", `${date_to} 23:59:59`],
      ],
    ], {
      fields: [
        "product_id",
        "product_uom_qty",
        "price_subtotal",
        "price_total",
        "order_id",
      ],
    });

    // Aggregate per product
    const products: Record<number, {
      product_id: number;
      product_name: string;
      qty_sold: number;
      revenue: number;
      orders: Set<number>;
    }> = {};

    for (const line of lines as any[]) {
      const pid   = line.product_id[0];
      const pname = line.product_id[1];
      if (!products[pid]) {
        products[pid] = {
          product_id: pid,
          product_name: pname,
          qty_sold: 0,
          revenue: 0,
          orders: new Set(),
        };
      }
      products[pid].qty_sold += line.product_uom_qty;
      products[pid].revenue  += line.price_subtotal;
      products[pid].orders.add(line.order_id[0]);
    }

    const result = Object.values(products)
      .map(({ orders, ...p }) => ({ ...p, order_count: orders.size }))
      .sort((a, b) => b.revenue - a.revenue);

    res.json({
      success: true,
      date_from,
      date_to,
      total_products_sold: result.length,
      total_revenue: result.reduce((s, p) => s + p.revenue, 0),
      products: result,
    });
  }
);

// ─── Inventory movement report ───────────────────────────────────────────────
// Uses stock.move to show what moved in/out in a period

export const getInventoryMovementReport = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date_from, date_to } = req.query as Record<string, string>;

    if (!date_from || !date_to) {
      return next(new ErrorHandler("date_from and date_to are required (YYYY-MM-DD)", 400));
    }

    const moves = await odooRequest("stock.move", "search_read", [
      [
        ["state", "=", "done"],
        ["date", ">=", `${date_from} 00:00:00`],
        ["date", "<=", `${date_to} 23:59:59`],
      ],
    ], {
      fields: [
        "product_id",
        "product_uom_qty",
        "location_id",
        "location_dest_id",
        "date",
        "origin",
      ],
    });

    // Classify as IN (coming into main stock) or OUT (leaving stock)
    const summary: Record<number, {
      product_id: number;
      product_name: string;
      qty_in: number;
      qty_out: number;
    }> = {};

    for (const move of moves as any[]) {
      const pid   = move.product_id[0];
      const pname = move.product_id[1];
      const destName: string = move.location_dest_id[1] ?? "";
      const srcName:  string = move.location_id[1] ?? "";

      if (!summary[pid]) {
        summary[pid] = { product_id: pid, product_name: pname, qty_in: 0, qty_out: 0 };
      }

      // Heuristic: destinations containing "Customers" or "Virtual" are outbound
      const isOut = destName.toLowerCase().includes("customer") ||
                    destName.toLowerCase().includes("virtual");
      const isIn  = srcName.toLowerCase().includes("vendor") ||
                    srcName.toLowerCase().includes("supplier");

      if (isOut) summary[pid].qty_out += move.product_uom_qty;
      if (isIn)  summary[pid].qty_in  += move.product_uom_qty;
    }

    res.json({
      success: true,
      date_from,
      date_to,
      movements: Object.values(summary).sort((a, b) => b.qty_out - a.qty_out),
    });
  }
);






export const exportMonthlyReportPDF = async (req: Request, res: Response) => {
  const year = req.query.year || new Date().getFullYear();

  // 1. Open browser
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // 2. Load your FRONTEND dashboard page
  await page.goto(`http://localhost:3000/reports?year=${year}`, {
    waitUntil: "networkidle0",
  });

  // 3. Wait for charts to load
  await page.waitForSelector(".reports-root");

  // 4. Generate PDF
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  // 5. Send file
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=monthly-report-${year}.pdf`,
  });

  res.send(pdfBuffer);
};