const express = require("express");
const asyncHandle = require("../helpers/asyncHandle");
const bookShelfChildOriginalController = require("../controllers/bookShelfChildOriginal.controller");
const router = express.Router();

router.get("/", asyncHandle(bookShelfChildOriginalController.getAll))
router.get("/filter", asyncHandle(bookShelfChildOriginalController.filterByFatherId))
router.get("/:id", asyncHandle(bookShelfChildOriginalController.getById))
router.put("/:id", asyncHandle(bookShelfChildOriginalController.update))

module.exports = router;