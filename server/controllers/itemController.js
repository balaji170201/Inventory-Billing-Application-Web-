const itemModel = require("../models/itemModel");

//add items
const addItemController = async (req, res) => {
  try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item Created Successfully!" });
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message }); 
  }
};

//get items
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update item
const editItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await itemModel.findOneAndUpdate({ _id: itemId }, req.body, {
      new: true,
    });

    res.status(201).json({ message: "Item Updated Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// delete item
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).json({ message: "Item Deleted Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
