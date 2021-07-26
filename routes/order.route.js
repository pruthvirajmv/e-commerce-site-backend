const express = require("express");
var router = express.Router();

const { getUserOrders, createOrder, saveOrder } = require("../controllers/order.controller");

router.route("/").get(getUserOrders);
router.route("/create").post(createOrder);
router.route("/save").post(saveOrder);

module.exports = router;
