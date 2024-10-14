const express = require("express");
const asyncHandle = require("../helpers/asyncHandle");
const inventoryReceiptDetailOriginalController = require("../controllers/inventoryReceiptDetailOriginal.controller");
const router = express.Router();

router.post("", asyncHandle(inventoryReceiptDetailOriginalController.insert));

module.exports = router;
