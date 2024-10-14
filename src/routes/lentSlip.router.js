const express = require("express");
const LentSlipController = require("../controllers/lentSlip.controller");
const asyncHandle = require("../helpers/asyncHandle");
const router = express.Router();
const validate = require("../middlewares/validateMiddleware");
const { createValidator } = require("../validators/lentSlip.validator");

router.post("/", validate(createValidator) , asyncHandle(LentSlipController.create));
router.put("/:id", asyncHandle(LentSlipController.returnBook));

module.exports = router;
