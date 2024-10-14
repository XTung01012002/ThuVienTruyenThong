const express = require("express");
const BookCopyService = require("../services/bookCopy.service");
const asyncHandle = require("../helpers/asyncHandle");
const router = express.Router();

router.post('/', asyncHandle(async (req, res, next) => {
    const test = await BookCopyService.insertMany({
        count: req.body.count,
        idBook: '66c010855e4fa22558bd0a57',
        prefix: req.body.prefix
    })
    res.json(test)
}))

module.exports = router;
