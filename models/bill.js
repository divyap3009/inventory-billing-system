const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  items: [
    {
      item_id: { type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem" },
      quantity: { type: Number, required: true },
    },
  ],
  total_amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
