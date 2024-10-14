const express = require("express");
const BookOriginController = require("../controllers/bookOriginal.controller.js");
const router = express.Router();
const asyncHandle = require("../helpers/asyncHandle");

router.get("/export-excel", asyncHandle(BookOriginController.exportExcel));
router.get("", asyncHandle(BookOriginController.getAll));
router.get("/:id", asyncHandle(BookOriginController.getById));
router.put("/:id", asyncHandle(BookOriginController.update));
router.post("", asyncHandle(BookOriginController.create));

module.exports = router;
