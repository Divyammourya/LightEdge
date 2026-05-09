
// const { Schema } = require("mongoose");

// const OrdersSchema = new Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     name: {
//       type: String,
//       required: true,
//       uppercase: true,
//       trim: true,
//     },
//     qty: {
//       type: Number,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     mode: {
//       type: String,
//       enum: ["BUY", "SELL"],
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["EXECUTED", "REJECTED"],
//       default: "EXECUTED",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = { OrdersSchema };



const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
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
    },
    price: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "EXECUTED", "CANCELLED", "REJECTED"],
      default: "PENDING",
    },
    rejectionReason: {
      type: String,
      default: "",
    },
    executedAt: {
      type: Date,
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = { OrdersSchema };
