const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
