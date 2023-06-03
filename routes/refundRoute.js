/* eslint-disable prettier/prettier */
const express = require("express");
const refundController = require("../controllers/refundController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

//router.route("/approved").get(refundController.getAllApprovedRefunds);

router
  .route("/")
  .get(
    authController.restrictTo("sales_manager", "admin"),
    refundController.getAllRefunds
  )
  .post(
    //authController.restrictTo("customer"),
    refundController.refundOrderItem
  );

router
  .route("/giveApproval/:id")
  .patch(
    authController.restrictTo("sales_manager","admin"),
    refundController.approveRefund
  );

router
  .route("/:id")
  .get(refundController.getRefund)
  .patch(
    authController.restrictTo("customer", "admin", "sales_manager"),
    refundController.updateRefund
  )
  .delete(
    authController.restrictTo("customer", "admin", "sales_manager"),
    refundController.deleteRefund
  );

module.exports = router;
