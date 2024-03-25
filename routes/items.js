const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/inventoryItem");

// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new inventory item
router.post("/", async (req, res) => {
  const item = new InventoryItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get details of a specific inventory item
router.get("/:id", getInventoryItem, (req, res) => {
  res.json(res.item);
});

// Update details of a specific inventory item
router.put("/:id", getInventoryItem, async (req, res) => {
  const itemToUpdate = res.locals.item;
  try {
    if (req.body.name) {
      itemToUpdate.name = req.body.name;
    }
    if (req.body.description) {
      itemToUpdate.description = req.body.description;
    }
    if (req.body.price) {
      itemToUpdate.price = req.body.price;
    }
    if (req.body.quantity) {
      itemToUpdate.quantity = req.body.quantity;
    }
    const updatedItem = await itemToUpdate.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a specific inventory item
router.delete("/:id", getInventoryItem, async (req, res) => {
  try {
    const item = res.locals.item;
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await InventoryItem.deleteOne({ _id: item._id }); // Remove the item
    res.json({ message: "Deleted item" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get inventory item by ID
async function getInventoryItem(req, res, next) {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.locals.item = item;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
