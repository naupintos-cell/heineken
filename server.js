const express = require('express');
const path    = require('path');

const app = express();
app.use(express.json({ limit: '50kb' }));

/* ── SECURITY HEADERS ── */
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

/* ── RATE LIMITER (no deps needed) ── */
const hits = new Map();
function rateLimit(max = 10, windowMs = 60 * 60 * 1000) {
  return (req, res, next) => {
    const ip  = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    const now = Date.now();
    const rec = hits.get(ip);
    if (!rec || now > rec.resetAt) { hits.set(ip, { count: 1, resetAt: now + windowMs }); return next(); }
    if (rec.count >= max) return res.status(429).json({ error: 'Too many requests. Try again in an hour.' });
    rec.count++;
    next();
  };
}
setInterval(() => { const now=Date.now(); for(const[ip,r]of hits) if(now>r.resetAt) hits.delete(ip); }, 3600000);

/* ── INPUT VALIDATION ── */
function validate(req, res, next) {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) return res.status(400).json({ error: 'Invalid' });
  if (messages.length > 1) return res.status(400).json({ error: 'Too many messages' });
  const c = messages[0]?.content;
  if (typeof c !== 'string' || c.length > 2000) return res.status(400).json({ error: 'Too long' });
  next();
}

/* ── STATIC ── */
app.use(express.static(path.join(__dirname, 'public')));

/* ── API PROXY ── */
app.post('/api/recommend', rateLimit(10, 3600000), validate, async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Not configured' });
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 300, messages: req.body.messages }),
    });
    res.json(await r.json());
  } catch(e) { res.status(500).json({ error: 'AI unavailable' }); }
});

/* ── HEALTH + CATCH-ALL ── */
app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Your Heineken :${PORT}`));
