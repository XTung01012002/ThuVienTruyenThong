const express = require("express");
const router = express.Router();

router.use("/api/book-original", require("./bookOriginal.router"));
router.use('/api/bookShelf-original', require('./bookShelfOriginal.router'));
router.use('/api/bookShelfChild-original', require('./bookShelfChildOriginal.router'));
router.use('/api/book-copy', require('./bookCopy.router'))
router.use('/api/lent-Slip', require('./lentSlip.router'))
router.use('/api/inventory-receipt', require('./inventoryReceiptOriginal.router'))
router.use('/api/inventory-receipt-detail', require('./inventoryReceiptDetailOriginal.router'))


module.exports = router;
