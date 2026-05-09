const express = require("express");
const { UserModel } = require("../model/UserModel");
const { OrdersModel } = require("../model/OrdersModel");
const { FundModel } = require("../model/FundModel");
const { PortfolioModel } = require("../model/PortfolioModel");

const router = express.Router();

const checkAdmin = async (req, res, next) => {
  try {
    const userId = String(req.headers["x-user-id"] || "").trim();

    if (!userId) {
      return res.status(401).json({
        message: "Admin login required.",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin accounts can access this panel.",
      });
    }

    req.adminUser = user;
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    res.status(500).json({
      message: "Failed to verify admin access.",
    });
  }
};

router.get("/overview", checkAdmin, async (req, res) => {
  try {
    const users = await UserModel.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    const orders = await OrdersModel.find({}).sort({ createdAt: -1 });
    const funds = await FundModel.find({}).sort({ updatedAt: -1 });
    const holdings = await PortfolioModel.find({}).sort({ updatedAt: -1 });

    const totalFunds = funds.reduce((sum, fund) => {
      return sum + Number(fund.availableCash || 0);
    }, 0);

    const stats = {
      totalUsers: users.length,
      totalOrders: orders.length,
      totalFunds: totalFunds.toFixed(2),
      totalHoldings: holdings.length,
      pendingOrders: orders.filter((order) => order.status === "PENDING").length,
      executedOrders: orders.filter((order) => order.status === "EXECUTED").length,
      cancelledOrders: orders.filter((order) => order.status === "CANCELLED").length,
      rejectedOrders: orders.filter((order) => order.status === "REJECTED").length,
    };

    res.json({
      admin: {
        id: req.adminUser._id,
        name: req.adminUser.name,
        email: req.adminUser.email,
        role: req.adminUser.role,
      },
      stats,
      users,
      orders,
      funds,
      holdings,
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    res.status(500).json({
      message: "Failed to load admin overview.",
    });
  }
});

module.exports = router;
