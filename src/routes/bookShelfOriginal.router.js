const express = require("express");
const asyncHandle = require("../helpers/asyncHandle");
const bookShelfOriginalController = require("../controllers/bookShelfOriginal.controller");
const router = express.Router();

router.get("/", asyncHandle(bookShelfOriginalController.getAllBookShelfOriginal))
router.get("/:id", asyncHandle(bookShelfOriginalController.getBookShelf_originalById))
router.put("/:id", asyncHandle(bookShelfOriginalController.updateBookShelf_original))

module.exports = router;