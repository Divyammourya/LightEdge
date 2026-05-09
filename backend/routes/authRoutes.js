


// const express = require("express");
// const bcrypt = require("bcryptjs");
// const axios = require("axios");
// const { UserModel } = require("../model/UserModel");

// const router = express.Router();

// const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
// const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

// const STOCKS = [
//   { name: "INFY", symbol: "INFY", fallbackPrice: 17.5 },
//   { name: "WIPRO", symbol: "WIT", fallbackPrice: 6.2 },
//   { name: "TCS", symbol: "TCS.NS", fallbackPrice: 3900 },
//   { name: "RELIANCE", symbol: "RELIANCE.NS", fallbackPrice: 2900 },
//   { name: "ONGC", symbol: "ONGC.NS", fallbackPrice: 250 },
//   { name: "M&M", symbol: "M&M.NS", fallbackPrice: 2800 },
//   { name: "HUL", symbol: "HINDUNILVR.NS", fallbackPrice: 2400 },
//   { name: "KPITTECH", symbol: "KPITTECH.NS", fallbackPrice: 1450 },
//   { name: "QUICKHEAL", symbol: "QUICKHEAL.NS", fallbackPrice: 500 },
// ];

// const POSITIONS = [
//   { name: "INFY", symbol: "INFY", qty: 1, avg: 16.2, product: "MIS", fallbackPrice: 17.5 },
//   { name: "WIPRO", symbol: "WIT", qty: 4, avg: 5.8, product: "MIS", fallbackPrice: 6.2 },
//   { name: "TCS", symbol: "TCS.NS", qty: 2, avg: 3480, product: "MIS", fallbackPrice: 3900 },
//   { name: "RELIANCE", symbol: "RELIANCE.NS", qty: 2, avg: 2280, product: "MIS", fallbackPrice: 2900 },
//   { name: "ONGC", symbol: "ONGC.NS", qty: 10, avg: 112, product: "MIS", fallbackPrice: 250 },
// ];

// const HOLDINGS = [
//   { name: "INFY", symbol: "INFY", qty: 2, avg: 16.2, product: "CNC", fallbackPrice: 17.5 },
//   { name: "WIPRO", symbol: "WIT", qty: 5, avg: 5.8, product: "CNC", fallbackPrice: 6.2 },
//   { name: "TCS", symbol: "TCS.NS", qty: 1, avg: 3500, product: "CNC", fallbackPrice: 3900 },
//   { name: "RELIANCE", symbol: "RELIANCE.NS", qty: 3, avg: 2300, product: "CNC", fallbackPrice: 2900 },
//   { name: "HDFC", symbol: "HDB", qty: 4, avg: 58, product: "CNC", fallbackPrice: 62 },
//   { name: "ICICI", symbol: "IBN", qty: 2, avg: 26, product: "CNC", fallbackPrice: 29 },
// ];

// const finnhubClient = axios.create({
//   baseURL: FINNHUB_BASE_URL,
//   timeout: 10000,
// });

// const getRoleForEmail = (email) => {
//   const adminEmails = String(process.env.ADMIN_EMAILS || "")
//     .split(",")
//     .map((item) => item.trim().toLowerCase())
//     .filter(Boolean);

//   return adminEmails.includes(String(email).toLowerCase()) ? "admin" : "user";
// };

// const buildFallbackQuote = (item, reason = "Finnhub live data unavailable") => {
//   const price = Number(item.fallbackPrice || item.avg || 0);
//   const avg = Number(item.avg || price);
//   const change = price - avg;
//   const percent = avg ? ((change / avg) * 100).toFixed(2) : "0.00";
//   const isDown = change < 0;

//   return {
//     ...item,
//     price: price.toFixed(2),
//     percent: `${isDown ? "" : "+"}${percent}%`,
//     day: `${isDown ? "" : "+"}${percent}%`,
//     isDown,
//     isLoss: isDown,
//     isLive: false,
//     source: "fallback",
//     message: reason,
//     lastUpdated: new Date().toISOString(),
//   };
// };

// const buildFinnhubQuote = (item, quote) => {
//   const currentPrice = Number(quote.c);
//   const previousClose = Number(quote.pc || quote.o || currentPrice);

//   if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
//     return buildFallbackQuote(item, `No Finnhub price returned for ${item.symbol}`);
//   }

//   const change = currentPrice - previousClose;
//   const percent = previousClose ? ((change / previousClose) * 100).toFixed(2) : "0.00";
//   const isDown = change < 0;

//   return {
//     ...item,
//     price: currentPrice.toFixed(2),
//     percent: `${isDown ? "" : "+"}${percent}%`,
//     day: `${isDown ? "" : "+"}${percent}%`,
//     isDown,
//     isLoss: isDown,
//     isLive: true,
//     source: "finnhub",
//     lastUpdated: new Date((quote.t || Date.now() / 1000) * 1000).toISOString(),
//   };
// };

// const fetchFinnhubQuote = async (item) => {
//   if (!FINNHUB_API_KEY) {
//     return buildFallbackQuote(item, "Missing FINNHUB_API_KEY in backend .env");
//   }

//   try {
//     const response = await finnhubClient.get("/quote", {
//       params: {
//         symbol: item.symbol,
//         token: FINNHUB_API_KEY,
//       },
//     });

//     return buildFinnhubQuote(item, response.data || {});
//   } catch (error) {
//     console.error(`Finnhub quote failed for ${item.symbol}:`, error.message);
//     return buildFallbackQuote(item, `Finnhub request failed for ${item.symbol}`);
//   }
// };

// const fetchQuotes = async (items) => {
//   return Promise.all(items.map((item) => fetchFinnhubQuote(item)));
// };

// router.post("/register", async (req, res) => {
//   try {
//     const name = String(req.body.name || "").trim();
//     const email = String(req.body.email || "").trim().toLowerCase();
//     const password = String(req.body.password || "");

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Name, email and password are required." });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters." });
//     }

//     const existingUser = await UserModel.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists with this email." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const role = getRoleForEmail(email);

//     const user = await UserModel.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).json({
//       message: "Registration successful.",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ message: "Server error. Please try again." });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const email = String(req.body.email || "").trim().toLowerCase();
//     const password = String(req.body.password || "");

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required." });
//     }

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     const expectedRole = getRoleForEmail(email);

//     if (user.role !== expectedRole) {
//       user.role = expectedRole;
//       await user.save();
//     }

//     res.status(200).json({
//       message: "Login successful.",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error. Please try again." });
//   }
// });

// router.get("/stocks", async (req, res) => {
//   res.set("Cache-Control", "no-store");
//   const data = await fetchQuotes(STOCKS);
//   res.status(200).json(data);
// });

// router.get("/positions", async (req, res) => {
//   res.set("Cache-Control", "no-store");

//   const quotes = await fetchQuotes(POSITIONS);

//   res.status(200).json(
//     quotes.map((stock) => ({
//       name: stock.name,
//       symbol: stock.symbol,
//       qty: stock.qty,
//       avg: stock.avg,
//       product: stock.product,
//       price: Number(stock.price),
//       day: stock.day,
//       isLoss: stock.isLoss,
//       isLive: stock.isLive,
//       source: stock.source,
//       lastUpdated: stock.lastUpdated,
//     }))
//   );
// });

// router.get("/holdings", async (req, res) => {
//   res.set("Cache-Control", "no-store");

//   const quotes = await fetchQuotes(HOLDINGS);

//   res.status(200).json(
//     quotes.map((stock) => ({
//       name: stock.name,
//       symbol: stock.symbol,
//       qty: stock.qty,
//       avg: stock.avg,
//       product: stock.product,
//       price: Number(stock.price),
//       day: stock.day,
//       isLoss: stock.isLoss,
//       isLive: stock.isLive,
//       source: stock.source,
//       lastUpdated: stock.lastUpdated,
//     }))
//   );
// });

// router.get("/summary", async (req, res) => {
//   res.status(200).json({
//     holdings: {
//       count: 0,
//       investment: "0.00",
//       currentValue: "0.00",
//       pnl: "0.00",
//       pnlPercent: "0.00",
//       isProfit: true,
//     },
//     equity: {
//       marginAvailable: "0.00",
//       marginsUsed: "0.00",
//       openingBalance: "0.00",
//     },
//   });
// });

// module.exports = router;




// const express = require("express");
// const bcrypt = require("bcryptjs");
// const axios = require("axios");
// const { UserModel } = require("../model/UserModel");

// const router = express.Router();

// const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
// const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";


// const STOCKS = [
//   { name: "AAPL", symbol: "AAPL", fallbackPrice: 190 },
//   { name: "MSFT", symbol: "MSFT", fallbackPrice: 420 },
//   { name: "GOOGL", symbol: "GOOGL", fallbackPrice: 170 },
//   { name: "AMZN", symbol: "AMZN", fallbackPrice: 180 },
//   { name: "TSLA", symbol: "TSLA", fallbackPrice: 250 },
//   { name: "META", symbol: "META", fallbackPrice: 480 },
//   { name: "NVDA", symbol: "NVDA", fallbackPrice: 900 },
//   { name: "INFY", symbol: "INFY", fallbackPrice: 17.5 },
//   { name: "WIPRO", symbol: "WIT", fallbackPrice: 6.2 },
// ];

// const POSITIONS = [
//   { name: "AAPL", symbol: "AAPL", qty: 2, avg: 180, product: "MIS", fallbackPrice: 190 },
//   { name: "MSFT", symbol: "MSFT", qty: 1, avg: 400, product: "MIS", fallbackPrice: 420 },
//   { name: "TSLA", symbol: "TSLA", qty: 3, avg: 230, product: "MIS", fallbackPrice: 250 },
//   { name: "INFY", symbol: "INFY", qty: 4, avg: 16.2, product: "MIS", fallbackPrice: 17.5 },
//   { name: "WIPRO", symbol: "WIT", qty: 5, avg: 5.8, product: "MIS", fallbackPrice: 6.2 },
// ];

// const HOLDINGS = [
//   { name: "AAPL", symbol: "AAPL", qty: 5, avg: 175, product: "CNC", fallbackPrice: 190 },
//   { name: "MSFT", symbol: "MSFT", qty: 3, avg: 390, product: "CNC", fallbackPrice: 420 },
//   { name: "GOOGL", symbol: "GOOGL", qty: 2, avg: 155, product: "CNC", fallbackPrice: 170 },
//   { name: "NVDA", symbol: "NVDA", qty: 1, avg: 850, product: "CNC", fallbackPrice: 900 },
//   { name: "INFY", symbol: "INFY", qty: 6, avg: 16.2, product: "CNC", fallbackPrice: 17.5 },
//   { name: "WIPRO", symbol: "WIT", qty: 8, avg: 5.8, product: "CNC", fallbackPrice: 6.2 },
// ];


// const finnhubClient = axios.create({
//   baseURL: FINNHUB_BASE_URL,
//   timeout: 10000,
// });

// const sendNoCache = (res) => {
//   res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
//   res.set("Pragma", "no-cache");
//   res.set("Expires", "0");
//   res.set("Surrogate-Control", "no-store");
// };

// const getRoleForEmail = (email) => {
//   const adminEmails = String(process.env.ADMIN_EMAILS || "")
//     .split(",")
//     .map((item) => item.trim().toLowerCase())
//     .filter(Boolean);

//   return adminEmails.includes(String(email).toLowerCase()) ? "admin" : "user";
// };

// const buildFallbackQuote = (item, reason = "Finnhub live data unavailable") => {
//   const price = Number(item.fallbackPrice || item.avg || 0);
//   const avg = Number(item.avg || price);
//   const change = price - avg;
//   const percent = avg ? ((change / avg) * 100).toFixed(2) : "0.00";
//   const isDown = change < 0;

//   return {
//     ...item,
//     price: price.toFixed(2),
//     percent: `${isDown ? "" : "+"}${percent}%`,
//     day: `${isDown ? "" : "+"}${percent}%`,
//     isDown,
//     isLoss: isDown,
//     isLive: false,
//     source: "fallback",
//     message: reason,
//     lastUpdated: new Date().toISOString(),
//   };
// };

// const buildFinnhubQuote = (item, quote) => {
//   const currentPrice = Number(quote.c);
//   const previousClose = Number(quote.pc || quote.o || currentPrice);

//   if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
//     return buildFallbackQuote(item, `No Finnhub price returned for ${item.symbol}`);
//   }

//   const change = currentPrice - previousClose;
//   const percent = previousClose ? ((change / previousClose) * 100).toFixed(2) : "0.00";
//   const isDown = change < 0;

//   return {
//     ...item,
//     price: currentPrice.toFixed(2),
//     percent: `${isDown ? "" : "+"}${percent}%`,
//     day: `${isDown ? "" : "+"}${percent}%`,
//     isDown,
//     isLoss: isDown,
//     isLive: true,
//     source: "finnhub",
//     lastUpdated: new Date((quote.t || Date.now() / 1000) * 1000).toISOString(),
//   };
// };

// const fetchFinnhubQuote = async (item) => {
//   if (!FINNHUB_API_KEY) {
//     return buildFallbackQuote(item, "Missing FINNHUB_API_KEY in backend .env");
//   }

//   try {
//     const response = await finnhubClient.get("/quote", {
//       params: {
//         symbol: item.symbol,
//         token: FINNHUB_API_KEY,
//       },
//     });

//     return buildFinnhubQuote(item, response.data || {});
//   } catch (error) {
//     console.error(`Finnhub quote failed for ${item.symbol}:`, error.message);
//     return buildFallbackQuote(item, `Finnhub request failed for ${item.symbol}`);
//   }
// };

// const fetchQuotes = async (items) => {
//   return Promise.all(items.map((item) => fetchFinnhubQuote(item)));
// };

// router.post("/register", async (req, res) => {
//   try {
//     const name = String(req.body.name || "").trim();
//     const email = String(req.body.email || "").trim().toLowerCase();
//     const password = String(req.body.password || "");

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Name, email and password are required." });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters." });
//     }

//     const existingUser = await UserModel.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists with this email." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const role = getRoleForEmail(email);

//     const user = await UserModel.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).json({
//       message: "Registration successful.",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ message: "Server error. Please try again." });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const email = String(req.body.email || "").trim().toLowerCase();
//     const password = String(req.body.password || "");

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required." });
//     }

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     const expectedRole = getRoleForEmail(email);

//     if (user.role !== expectedRole) {
//       user.role = expectedRole;
//       await user.save();
//     }

//     res.status(200).json({
//       message: "Login successful.",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error. Please try again." });
//   }
// });

// router.get("/stocks", async (req, res) => {
//   sendNoCache(res);

//   const data = await fetchQuotes(STOCKS);
//   res.status(200).json(data);
// });

// router.get("/positions", async (req, res) => {
//   sendNoCache(res);

//   const quotes = await fetchQuotes(POSITIONS);

//   res.status(200).json(
//     quotes.map((stock) => ({
//       name: stock.name,
//       symbol: stock.symbol,
//       qty: stock.qty,
//       avg: stock.avg,
//       product: stock.product,
//       price: Number(stock.price),
//       day: stock.day,
//       isLoss: stock.isLoss,
//       isLive: stock.isLive,
//       source: stock.source,
//       lastUpdated: stock.lastUpdated,
//     }))
//   );
// });

// router.get("/holdings", async (req, res) => {
//   sendNoCache(res);

//   const quotes = await fetchQuotes(HOLDINGS);

//   res.status(200).json(
//     quotes.map((stock) => ({
//       name: stock.name,
//       symbol: stock.symbol,
//       qty: stock.qty,
//       avg: stock.avg,
//       product: stock.product,
//       price: Number(stock.price),
//       day: stock.day,
//       isLoss: stock.isLoss,
//       isLive: stock.isLive,
//       source: stock.source,
//       lastUpdated: stock.lastUpdated,
//     }))
//   );
// });

// router.get("/summary", async (req, res) => {
//   sendNoCache(res);

//   const quotes = await fetchQuotes(HOLDINGS);

//   const investment = quotes.reduce((sum, stock) => {
//     return sum + Number(stock.avg || 0) * Number(stock.qty || 0);
//   }, 0);

//   const currentValue = quotes.reduce((sum, stock) => {
//     return sum + Number(stock.price || 0) * Number(stock.qty || 0);
//   }, 0);

//   const pnl = currentValue - investment;
//   const pnlPercent = investment ? ((pnl / investment) * 100).toFixed(2) : "0.00";

//   res.status(200).json({
//     holdings: {
//       count: quotes.length,
//       investment: investment.toFixed(2),
//       currentValue: currentValue.toFixed(2),
//       pnl: pnl.toFixed(2),
//       pnlPercent,
//       isProfit: pnl >= 0,
//     },
//     equity: {
//       marginAvailable: "0.00",
//       marginsUsed: "0.00",
//       openingBalance: "0.00",
//     },
//     lastUpdated: new Date().toISOString(),
//   });
// });

// module.exports = router;



const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { UserModel } = require("../model/UserModel");

const router = express.Router();

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

const STOCKS = [
  { name: "AAPL", symbol: "AAPL", fallbackPrice: 190 },
  { name: "MSFT", symbol: "MSFT", fallbackPrice: 420 },
  { name: "GOOGL", symbol: "GOOGL", fallbackPrice: 170 },
  { name: "AMZN", symbol: "AMZN", fallbackPrice: 180 },
  { name: "TSLA", symbol: "TSLA", fallbackPrice: 250 },
  { name: "META", symbol: "META", fallbackPrice: 480 },
  { name: "NVDA", symbol: "NVDA", fallbackPrice: 900 },
  { name: "INFY", symbol: "INFY", fallbackPrice: 17.5 },
  { name: "WIPRO", symbol: "WIT", fallbackPrice: 6.2 },
];

const POSITIONS = [
  { name: "AAPL", symbol: "AAPL", qty: 2, avg: 180, product: "MIS", fallbackPrice: 190 },
  { name: "MSFT", symbol: "MSFT", qty: 1, avg: 400, product: "MIS", fallbackPrice: 420 },
  { name: "TSLA", symbol: "TSLA", qty: 3, avg: 230, product: "MIS", fallbackPrice: 250 },
  { name: "INFY", symbol: "INFY", qty: 4, avg: 16.2, product: "MIS", fallbackPrice: 17.5 },
  { name: "WIPRO", symbol: "WIT", qty: 5, avg: 5.8, product: "MIS", fallbackPrice: 6.2 },
];

const HOLDINGS = [
  { name: "AAPL", symbol: "AAPL", qty: 5, avg: 175, product: "CNC", fallbackPrice: 190 },
  { name: "MSFT", symbol: "MSFT", qty: 3, avg: 390, product: "CNC", fallbackPrice: 420 },
  { name: "GOOGL", symbol: "GOOGL", qty: 2, avg: 155, product: "CNC", fallbackPrice: 170 },
  { name: "NVDA", symbol: "NVDA", qty: 1, avg: 850, product: "CNC", fallbackPrice: 900 },
  { name: "INFY", symbol: "INFY", qty: 6, avg: 16.2, product: "CNC", fallbackPrice: 17.5 },
  { name: "WIPRO", symbol: "WIT", qty: 8, avg: 5.8, product: "CNC", fallbackPrice: 6.2 },
];

const finnhubClient = axios.create({
  baseURL: FINNHUB_BASE_URL,
  timeout: 10000,
});

const QUOTE_CACHE_TTL = 60 * 1000;
const quoteCache = new Map();
const errorLogCache = new Map();

const sendNoCache = (res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
};

const logFinnhubError = (symbol, message) => {
  const key = `${symbol}-${message}`;
  const now = Date.now();
  const lastLoggedAt = errorLogCache.get(key) || 0;

  if (now - lastLoggedAt > 60000) {
    console.error(`Finnhub quote failed for ${symbol}:`, message);
    errorLogCache.set(key, now);
  }
};

const getRoleForEmail = (email) => {
  const adminEmails = String(process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(String(email).toLowerCase()) ? "admin" : "user";
};

const buildFallbackQuote = (item, reason = "Finnhub live data unavailable") => {
  const price = Number(item.fallbackPrice || item.avg || 0);
  const avg = Number(item.avg || price);
  const change = price - avg;
  const percent = avg ? ((change / avg) * 100).toFixed(2) : "0.00";
  const isDown = change < 0;

  return {
    ...item,
    price: price.toFixed(2),
    percent: `${isDown ? "" : "+"}${percent}%`,
    day: `${isDown ? "" : "+"}${percent}%`,
    isDown,
    isLoss: isDown,
    isLive: false,
    source: "fallback",
    message: reason,
    lastUpdated: new Date().toISOString(),
  };
};

const buildFinnhubQuote = (item, quote) => {
  const currentPrice = Number(quote.c);
  const previousClose = Number(quote.pc || quote.o || currentPrice);

  if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
    return buildFallbackQuote(item, `No Finnhub price returned for ${item.symbol}`);
  }

  const change = currentPrice - previousClose;
  const percent = previousClose ? ((change / previousClose) * 100).toFixed(2) : "0.00";
  const isDown = change < 0;

  return {
    ...item,
    price: currentPrice.toFixed(2),
    percent: `${isDown ? "" : "+"}${percent}%`,
    day: `${isDown ? "" : "+"}${percent}%`,
    isDown,
    isLoss: isDown,
    isLive: true,
    source: "finnhub",
    message: "Live from Finnhub",
    lastUpdated: new Date((quote.t || Date.now() / 1000) * 1000).toISOString(),
  };
};

const fetchFinnhubQuote = async (item) => {
  const now = Date.now();
  const cached = quoteCache.get(item.symbol);

  if (cached && now - cached.savedAt < QUOTE_CACHE_TTL) {
    return {
      ...cached.data,
      fromCache: true,
    };
  }

  if (!FINNHUB_API_KEY) {
    const fallback = buildFallbackQuote(item, "Missing FINNHUB_API_KEY in backend .env");
    quoteCache.set(item.symbol, { savedAt: now, data: fallback });
    return fallback;
  }

  try {
    const response = await finnhubClient.get("/quote", {
      params: {
        symbol: item.symbol,
        token: FINNHUB_API_KEY,
      },
    });

    const quote = buildFinnhubQuote(item, response.data || {});
    quoteCache.set(item.symbol, { savedAt: now, data: quote });

    return quote;
  } catch (error) {
    const status = error.response?.status;

    if (status === 429 && cached) {
      return {
        ...cached.data,
        fromCache: true,
        message: "Using cached quote because Finnhub rate limit was reached.",
      };
    }

    const fallback = buildFallbackQuote(
      item,
      status === 429
        ? "Finnhub rate limit reached. Showing fallback price."
        : `Finnhub request failed for ${item.symbol}`
    );

    quoteCache.set(item.symbol, { savedAt: now, data: fallback });
    logFinnhubError(item.symbol, error.message);

    return fallback;
  }
};

const fetchQuotes = async (items) => {
  const uniqueItemsBySymbol = new Map();

  items.forEach((item) => {
    if (!uniqueItemsBySymbol.has(item.symbol)) {
      uniqueItemsBySymbol.set(item.symbol, item);
    }
  });

  const uniqueQuotes = await Promise.all(
    Array.from(uniqueItemsBySymbol.values()).map((item) => fetchFinnhubQuote(item))
  );

  const quoteBySymbol = new Map(
    uniqueQuotes.map((quote) => [quote.symbol, quote])
  );

  return items.map((item) => {
    const quote = quoteBySymbol.get(item.symbol) || buildFallbackQuote(item);

    return {
      ...item,
      price: quote.price,
      percent: quote.percent,
      day: quote.day,
      isDown: quote.isDown,
      isLoss: quote.isLoss,
      isLive: quote.isLive,
      source: quote.source,
      message: quote.message,
      fromCache: quote.fromCache || false,
      lastUpdated: quote.lastUpdated,
    };
  });
};

router.post("/register", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const role = getRoleForEmail(email);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const expectedRole = getRoleForEmail(email);

    if (user.role !== expectedRole) {
      user.role = expectedRole;
      await user.save();
    }

    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

router.get("/stocks", async (req, res) => {
  sendNoCache(res);

  const data = await fetchQuotes(STOCKS);
  res.status(200).json(data);
});

router.get("/positions", async (req, res) => {
  sendNoCache(res);

  const quotes = await fetchQuotes(POSITIONS);

  res.status(200).json(
    quotes.map((stock) => ({
      name: stock.name,
      symbol: stock.symbol,
      qty: stock.qty,
      avg: stock.avg,
      product: stock.product,
      price: Number(stock.price),
      day: stock.day,
      isLoss: stock.isLoss,
      isLive: stock.isLive,
      source: stock.source,
      message: stock.message,
      fromCache: stock.fromCache,
      lastUpdated: stock.lastUpdated,
    }))
  );
});

router.get("/holdings", async (req, res) => {
  sendNoCache(res);

  const quotes = await fetchQuotes(HOLDINGS);

  res.status(200).json(
    quotes.map((stock) => ({
      name: stock.name,
      symbol: stock.symbol,
      qty: stock.qty,
      avg: stock.avg,
      product: stock.product,
      price: Number(stock.price),
      day: stock.day,
      isLoss: stock.isLoss,
      isLive: stock.isLive,
      source: stock.source,
      message: stock.message,
      fromCache: stock.fromCache,
      lastUpdated: stock.lastUpdated,
    }))
  );
});

router.get("/summary", async (req, res) => {
  sendNoCache(res);

  const quotes = await fetchQuotes(HOLDINGS);

  const investment = quotes.reduce((sum, stock) => {
    return sum + Number(stock.avg || 0) * Number(stock.qty || 0);
  }, 0);

  const currentValue = quotes.reduce((sum, stock) => {
    return sum + Number(stock.price || 0) * Number(stock.qty || 0);
  }, 0);

  const pnl = currentValue - investment;
  const pnlPercent = investment ? ((pnl / investment) * 100).toFixed(2) : "0.00";

  res.status(200).json({
    holdings: {
      count: quotes.length,
      investment: investment.toFixed(2),
      currentValue: currentValue.toFixed(2),
      pnl: pnl.toFixed(2),
      pnlPercent,
      isProfit: pnl >= 0,
    },
    equity: {
      marginAvailable: "0.00",
      marginsUsed: "0.00",
      openingBalance: "0.00",
    },
    lastUpdated: new Date().toISOString(),
  });
});

module.exports = router;
