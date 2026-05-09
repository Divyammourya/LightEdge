


require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { PortfolioModel } = require("./model/PortfolioModel");
const { FundModel } = require("./model/FundModel");


const authRoutes = require("./routes/authRoutes");
const fundRoutes = require("./routes/fundRoutes");


const adminRoutes = require("./routes/adminRoutes");

const chatbotRoutes = require("./routes/chatbotRoutes");

const PORT = process.env.PORT || 3003;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/funds", fundRoutes);


app.use("/api/admin", adminRoutes);

app.use("/api/chatbot", chatbotRoutes);


const getUserId = (req) => {
  return String(req.query.userId || req.body.userId || "").trim();
};

const validateOrderInput = (body) => {
  const userId = String(body.userId || "").trim();
  const name = String(body.name || "").trim().toUpperCase();
  const qty = Number(body.qty);
  const price = Number(body.price);
  const mode = String(body.mode || "").trim().toUpperCase();

  if (!userId) {
    return { error: "User ID is required." };
  }

  if (!name) {
    return { error: "Stock name is required." };
  }

  if (!Number.isFinite(qty) || qty <= 0) {
    return { error: "Enter a valid quantity." };
  }

  if (!Number.isFinite(price) || price < 0) {
    return { error: "Enter a valid price." };
  }

  if (!["BUY", "SELL"].includes(mode)) {
    return { error: "Invalid order mode." };
  }

  return {
    userId,
    name,
    qty,
    price,
    mode,
  };
};

const executeOrder = async (order) => {
  if (order.status !== "PENDING") {
    return {
      success: false,
      message: `Order is already ${order.status}.`,
    };
  }

  let holding = await PortfolioModel.findOne({
    userId: order.userId,
    name: order.name,
  });

  if (order.mode === "BUY") {
    if (!holding) {
      holding = await PortfolioModel.create({
        userId: order.userId,
        name: order.name,
        qty: order.qty,
        avg: order.price,
        price: order.price,
        product: "CNC",
      });
    } else {
      const oldValue = holding.avg * holding.qty;
      const newValue = order.price * order.qty;
      const totalQty = holding.qty + order.qty;

      holding.qty = totalQty;
      holding.avg = totalQty > 0 ? (oldValue + newValue) / totalQty : 0;
      holding.price = order.price;

      await holding.save();
    }
  }

  if (order.mode === "SELL") {
    if (!holding || holding.qty < order.qty) {
      order.status = "REJECTED";
      order.rejectionReason = "Insufficient holding quantity.";
      await order.save();

      return {
        success: false,
        message: "Order rejected because holding quantity is insufficient.",
        order,
      };
    }

    holding.qty -= order.qty;
    holding.price = order.price;

    if (holding.qty === 0) {
      await PortfolioModel.deleteOne({ _id: holding._id });
    } else {
      await holding.save();
    }
  }

  order.status = "EXECUTED";
  order.executedAt = new Date();
  order.rejectionReason = "";
  await order.save();

  return {
    success: true,
    message: "Order executed successfully.",
    order,
  };
};

app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  try {
    const data = validateOrderInput(req.body);

    if (data.error) {
      return res.status(400).json({ message: data.error });
    }

    const newOrder = await OrdersModel.create({
      userId: data.userId,
      name: data.name,
      qty: data.qty,
      price: data.price,
      mode: data.mode,
      status: "PENDING",
    });

    res.status(201).json({
      message: "Order placed successfully and is pending execution.",
      order: newOrder,
    });
  } catch (error) {
    console.error("New order error:", error);
    res.status(500).json({ message: "Server error while placing order." });
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "User ID is required." });
    }

    const allOrders = await OrdersModel.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(allOrders);
  } catch (error) {
    console.error("Orders fetch error:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

app.post("/orders/:orderId/execute", async (req, res) => {
  try {
    const userId = getUserId(req);
    const orderId = req.params.orderId;

    if (!userId) {
      return res.status(401).json({ message: "User ID is required." });
    }

    const order = await OrdersModel.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const result = await executeOrder(order);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error("Execute order error:", error);
    res.status(500).json({ message: "Failed to execute order." });
  }
});

app.post("/orders/:orderId/cancel", async (req, res) => {
  try {
    const userId = getUserId(req);
    const orderId = req.params.orderId;

    if (!userId) {
      return res.status(401).json({ message: "User ID is required." });
    }

    const order = await OrdersModel.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({
        message: `Only pending orders can be cancelled. Current status: ${order.status}.`,
      });
    }

    order.status = "CANCELLED";
    order.cancelledAt = new Date();
    await order.save();

    res.json({
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ message: "Failed to cancel order." });
  }
});

app.get("/api/portfolio/holdings", async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "User ID is required." });
    }

    const holdings = await PortfolioModel.find({ userId }).sort({
      updatedAt: -1,
    });

    const formattedHoldings = holdings.map((stock) => {
      const pnl = stock.price * stock.qty - stock.avg * stock.qty;

      return {
        _id: stock._id,
        name: stock.name,
        qty: stock.qty,
        avg: stock.avg,
        price: stock.price,
        product: stock.product,
        day: pnl >= 0 ? "+0.00%" : "-0.00%",
        isLoss: pnl < 0,
      };
    });

    res.json(formattedHoldings);
  } catch (error) {
    console.error("Portfolio holdings error:", error);
    res.status(500).json({ message: "Failed to fetch portfolio holdings." });
  }
});

app.get("/api/portfolio/summary", async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "User ID is required." });
    }

    const holdings = await PortfolioModel.find({ userId });
    const fund = await FundModel.findOne({ userId });

    const investment = holdings.reduce((sum, stock) => {
      return sum + Number(stock.avg || 0) * Number(stock.qty || 0);
    }, 0);

    const currentValue = holdings.reduce((sum, stock) => {
      return sum + Number(stock.price || 0) * Number(stock.qty || 0);
    }, 0);

    const pnl = currentValue - investment;
    const pnlPercent = investment ? ((pnl / investment) * 100).toFixed(2) : "0.00";

    res.json({
      holdings: {
        count: holdings.length,
        investment: investment.toFixed(2),
        currentValue: currentValue.toFixed(2),
        pnl: pnl.toFixed(2),
        pnlPercent,
        isProfit: pnl >= 0,
      },
      equity: {
        marginAvailable: Number(fund?.availableMargin || 0).toFixed(2),
        marginsUsed: Number(fund?.usedMargin || 0).toFixed(2),
        openingBalance: Number(fund?.openingBalance || 0).toFixed(2),
      },
    });
  } catch (error) {
    console.error("Portfolio summary error:", error);
    res.status(500).json({ message: "Failed to fetch portfolio summary." });
  }
});


// app.get("/api/portfolio/summary", async (req, res) => {
//   try {
//     const userId = getUserId(req);

//     if (!userId) {
//       return res.status(401).json({ message: "User ID is required." });
//     }

//     const holdings = await PortfolioModel.find({ userId });

//     const investment = holdings.reduce((sum, stock) => {
//       return sum + stock.avg * stock.qty;
//     }, 0);

//     const currentValue = holdings.reduce((sum, stock) => {
//       return sum + stock.price * stock.qty;
//     }, 0);

//     const pnl = currentValue - investment;
//     const pnlPercent = investment
//       ? ((pnl / investment) * 100).toFixed(2)
//       : "0.00";

//     res.json({
//       holdings: {
//         count: holdings.length,
//         investment: investment.toFixed(2),
//         currentValue: currentValue.toFixed(2),
//         pnl: pnl.toFixed(2),
//         pnlPercent,
//         isProfit: pnl >= 0,
//       },
//       equity: {
//         marginAvailable: "0.00",
//         marginsUsed: "0.00",
//         openingBalance: "0.00",
//       },
//     });
//   } catch (error) {
//     console.error("Portfolio summary error:", error);
//     res.status(500).json({ message: "Failed to fetch portfolio summary." });
//   }
// });

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB started!");
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
