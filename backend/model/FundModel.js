const { model } = require("mongoose");
const { FundSchema } = require("../schemas/FundSchema");

const FundModel = new model("fund", FundSchema);

module.exports = { FundModel };

