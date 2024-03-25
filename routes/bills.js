const express = require("express");
const router = express.Router();
const Bill = require("../models/bill");
const InventoryItem = require("../models/inventoryItem");

// Create a new bill
router.post("/", async (req, res) => {
  const bill = new Bill({
    items: req.body.items,
    total_amount: req.body.total_amount,
  });

  try {
    const newBill = await bill.save();
    // Update inventory quantities based on items in the bill
    await updateInventory(req.body.items);
    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get details of a specific bill
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update inventory quantities based on items in the bill
async function updateInventory(items) {
  for (const item of items) {
    const inventoryItem = await InventoryItem.findById(item.item_id);
    if (!inventoryItem) {
      continue;
    }
    inventoryItem.quantity -= item.quantity;
    await inventoryItem.save();
  }
}

module.exports = router;
