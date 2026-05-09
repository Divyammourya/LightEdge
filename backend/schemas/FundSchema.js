

// const { Schema } = require("mongoose");

// const FundTransactionSchema = new Schema(
//   {
//     type: {
//       type: String,
//       enum: ["ADD", "WITHDRAW"],
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     balanceAfter: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const FundSchema = new Schema(
//   {
//     availableMargin: {
//       type: Number,
//       default: 0,
//     },
//     usedMargin: {
//       type: Number,
//       default: 0,
//     },
//     availableCash: {
//       type: Number,
//       default: 0,
//     },
//     openingBalance: {
//       type: Number,
//       default: 0,
//     },
//     payin: {
//       type: Number,
//       default: 0,
//     },
//     transactions: {
//       type: [FundTransactionSchema],
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// module.exports = { FundSchema };


//second not workalebe code
// const { Schema } = require("mongoose");

// const FundTransactionSchema = new Schema(
//   {
//     type: {
//       type: String,
//       enum: ["ADD", "WITHDRAW"],
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     balanceAfter: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const FundSchema = new Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },
//     availableMargin: {
//       type: Number,
//       default: 0,
//     },
//     usedMargin: {
//       type: Number,
//       default: 0,
//     },
//     availableCash: {
//       type: Number,
//       default: 0,
//     },
//     openingBalance: {
//       type: Number,
//       default: 0,
//     },
//     payin: {
//       type: Number,
//       default: 0,
//     },
//     transactions: {
//       type: [FundTransactionSchema],
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// module.exports = { FundSchema };



const { Schema } = require("mongoose");

const FundTransactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["ADD", "WITHDRAW"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balanceAfter: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const FundSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    availableMargin: {
      type: Number,
      default: 0,
    },
    usedMargin: {
      type: Number,
      default: 0,
    },
    availableCash: {
      type: Number,
      default: 0,
    },
    openingBalance: {
      type: Number,
      default: 0,
    },
    payin: {
      type: Number,
      default: 0,
    },
    transactions: {
      type: [FundTransactionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = { FundSchema };
