const { Schema } = require("mongoose");

const PortfolioSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
      default: 0,
    },
    avg: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    product: {
      type: String,
      default: "CNC",
    },
  },
  { timestamps: true }
);

PortfolioSchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = { PortfolioSchema };
