


const express = require("express");
const axios = require("axios");

const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const PROJECT_KNOWLEDGE = `
You are LightEdge AI assistant.

Project name: LIGHTEDGE.
LightEdge is a stock trading and investment web application inspired by Zerodha-style products.

Main website/frontend:
- Home page explains LightEdge, pricing, education, awards, stats, and account opening.
- Signup page lets users create an account or login.
- Product page explains Kite-style trading platform, Console, Coin, Kite Connect API, and Varsity-style learning.
- Pricing page explains brokerage/pricing.
- Support page helps users with support/ticket-related questions.
- Navbar shows Dashboard button after login.

Dashboard:
- Watchlist shows live/fallback stock prices.
- Buy/Sell windows allow placing orders.
- Orders page shows pending/executed/cancelled/rejected orders.
- Funds page supports adding and withdrawing funds.
- Holdings page shows portfolio holdings.
- Positions page shows intraday/open positions.
- Summary page shows portfolio and equity summary.
- Admin panel is available only for admin users.

Rules:
- Answer only about LightEdge, stock trading education, investing basics, app navigation, dashboard features, account/signup/login, funds, orders, holdings, positions, admin panel, and support.
- If the user asks unrelated questions, politely say you can only help with LightEdge and trading/investing related questions.
- Do not give guaranteed financial advice or promise profit.
- Explain in simple language.
`;

router.post("/", async (req, res) => {
  try {
    const question = String(req.body.question || "").trim();

    if (!question) {
      return res.status(400).json({
        message: "Question is required.",
      });
    }

    if (!OPENAI_API_KEY) {
      return res.status(500).json({
        message: "OPENAI_API_KEY is missing. Add it in backend/.env and restart backend.",
      });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/responses",
      {
        model: "gpt-4.1-mini",
        instructions: PROJECT_KNOWLEDGE,
        input: question,
        max_output_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    res.json({
      answer:
        response.data.output_text ||
        "Sorry, I could not generate an answer right now.",
    });
  } catch (error) {
    const openaiMessage =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      "Unknown chatbot error";

    console.error("Chatbot error:", openaiMessage);

    res.status(500).json({
      message: openaiMessage,
    });
  }
});

module.exports = router;
