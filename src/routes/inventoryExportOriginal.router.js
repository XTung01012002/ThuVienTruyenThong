const express = require("express");
const asyncHandle = require("../helpers/asyncHandle");
const inventoryExportOriginalController = require("../controllers/inventoryExportOriginal.controller");
const { createInventoryExportValidator } = require("../validators/inventoryExport.validator");
const validate = require("../middlewares/validateMiddleware");
const router = express.Router();

router.post("/", validate(createInventoryExportValidator), asyncHandle(inventoryExportOriginalController.create));

module.exports = router;