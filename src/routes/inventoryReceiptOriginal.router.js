const express = require("express");
const asyncHandle = require("../helpers/asyncHandle");
const inventoryReceiptOriginalController = require("../controllers/inventoryReceiptOriginal.controller");
const router = express.Router();
const { inventoryReceiptValidator } = require("../validators/inventoryReceipt.validator");
const validate = require("../middlewares/validateMiddleware");


router.post("",validate(inventoryReceiptValidator) ,asyncHandle(inventoryReceiptOriginalController.create));

module.exports = router;
