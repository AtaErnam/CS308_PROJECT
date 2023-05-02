/* eslint-disable prettier/prettier */
const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo("customer"),
    reviewController.setProductUserIds,
    reviewController.createReview
  );


router.patch('/giveApproval/:id',authController.restrictTo('product_manager') ,reviewController.giveApproval)

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo("customer", "admin"),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo("customer", "admin"),
    reviewController.deleteReview
  );

module.exports = router;
