

const express = require("express");
const { FundModel } = require("../model/FundModel");

const router = express.Router();

const getUserId = (req) => {
  return String(req.query.userId || req.body.userId || "").trim();
};

const getAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

const getFundAccount = async (userId) => {
  let fund = await FundModel.findOne({ userId });

  if (!fund) {
    fund = await FundModel.create({
      userId,
      availableMargin: 4043.1,
      usedMargin: 0,
      availableCash: 4043.1,
      openingBalance: 4043.1,
      payin: 4043.1,
      transactions: [],
    });
  }

  return fund;
};

router.get("/", async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Please login to view funds." });
    }

    const fund = await getFundAccount(userId);
    res.json(fund);
  } catch (error) {
    console.error("Get funds error:", error);
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const userId = getUserId(req);
    const amount = getAmount(req.body.amount);

    if (!userId) {
      return res.status(401).json({ message: "Please login to add funds." });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Enter a valid amount." });
    }

    const fund = await getFundAccount(userId);

    fund.availableMargin += amount;
    fund.availableCash += amount;
    fund.payin += amount;

    fund.transactions.unshift({
      type: "ADD",
      amount,
      balanceAfter: fund.availableCash,
    });

    fund.transactions = fund.transactions.slice(0, 20);

    await fund.save();

    res.json({
      message: "Funds added successfully",
      fund,
    });
  } catch (error) {
    console.error("Add funds error:", error);
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
});

router.post("/withdraw", async (req, res) => {
  try {
    const userId = getUserId(req);
    const amount = getAmount(req.body.amount);

    if (!userId) {
      return res.status(401).json({ message: "Please login to withdraw funds." });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Enter a valid amount." });
    }

    const fund = await getFundAccount(userId);

    if (amount > fund.availableCash) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    fund.availableMargin -= amount;
    fund.availableCash -= amount;

    fund.transactions.unshift({
      type: "WITHDRAW",
      amount,
      balanceAfter: fund.availableCash,
    });

    fund.transactions = fund.transactions.slice(0, 20);

    await fund.save();

    res.json({
      message: "Withdrawal successful",
      fund,
    });
  } catch (error) {
    console.error("Withdraw funds error:", error);
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
});

module.exports = router;
