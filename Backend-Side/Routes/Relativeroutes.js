// Relativeroutes.js  (CommonJS: require / module.exports)
const express = require("express");

const STATUSES = ["pending", "yes", "no"];

// "+91 98765-43210", "09876543210" -> "9876543210"
// Valid na ho to null (Indian mobile: 10 digit, 6-9 se shuru)
function cleanPhone(raw) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  const last10 = digits.slice(-10);
  return /^[6-9]\d{9}$/.test(last10) ? last10 : null;
}

function Relativeroutes(pool) {
  const router = express.Router();

  // TODO: yahan apna auth middleware lagao aur check karo ki event_id
  // isi logged-in user ka hai.

  // 1) Event ke saare guests
  router.get("/events/:eventId/guests", async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT id, name, phone, status FROM guests WHERE event_id = $1 ORDER BY id",
        [req.params.eventId]
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Guests load nahi ho paye" });
    }
  });

  // 2) Guests add karo (CSV upload): body = { guests: [{name, phone}] }
  router.post("/events/:eventId/guests", async (req, res) => {
    try {
      const incoming = Array.isArray(req.body.guests) ? req.body.guests : [];

      const names = [];
      const phones = [];
      const seen = new Set();
      let invalid = 0;

      for (const g of incoming) {
        const name = String(g.name ?? "").trim();
        const phone = cleanPhone(g.phone);
        if (!name || !phone) {
          invalid++;
          continue;
        }
        if (seen.has(phone)) continue;
        seen.add(phone);
        names.push(name);
        phones.push(phone);
      }

      if (names.length === 0) {
        return res
          .status(400)
          .json({ error: "Koi valid guest nahi mila", invalid });
      }

      const { rows } = await pool.query(
        `INSERT INTO guests (event_id, name, phone)
         SELECT $1, n, p FROM unnest($2::text[], $3::text[]) AS t(n, p)
         ON CONFLICT (event_id, phone) DO NOTHING
         RETURNING id`,
        [req.params.eventId, names, phones]
      );

      res.status(201).json({
        added: rows.length,
        duplicates: names.length - rows.length,
        invalid,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Guests save nahi ho paye" });
    }
  });

  // 3) Status badlo: body = { status: "yes" | "no" | "pending" }
  router.patch("/guests/:id", async (req, res) => {
    try {
      const { status } = req.body;
      if (!STATUSES.includes(status)) {
        return res.status(400).json({ error: "Galat status" });
      }
      const { rowCount } = await pool.query(
        "UPDATE guests SET status = $1 WHERE id = $2",
        [status, req.params.id]
      );
      if (!rowCount) return res.status(404).json({ error: "Guest nahi mila" });
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Status update nahi ho paya" });
    }
  });

  // 4) Ek guest delete
  router.delete("/guests/:id", async (req, res) => {
    try {
      await pool.query("DELETE FROM guests WHERE id = $1", [req.params.id]);
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Delete nahi ho paya" });
    }
  });

  // 5) Event ki poori guest list delete
  router.delete("/events/:eventId/guests", async (req, res) => {
    try {
      await pool.query("DELETE FROM guests WHERE event_id = $1", [
        req.params.eventId,
      ]);
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Delete nahi ho paya" });
    }
  });

  return router;
}

module.exports = Relativeroutes;
