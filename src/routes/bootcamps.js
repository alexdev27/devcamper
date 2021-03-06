const express = require("express");

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampUploadPhoto
} = require("../controllers/bootcamps");

const { protectRoute, authorizeUser } = require("../middleware/auth");
const filterResults = require("../middleware/advanceFiltering");
const Bootcamp = require("../models/Bootcamp");

const courseRouter = require("./courses");

const router = express.Router();

// Reroute to other resource router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route(protectRoute, "/:id/photo").put(bootcampUploadPhoto);

router
  .route("/")
  .get(filterResults(Bootcamp), getBootcamps)
  .post(protectRoute, authorizeUser("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protectRoute, authorizeUser("publisher", "admin"), updateBootcamp)
  .delete(protectRoute, authorizeUser("publisher", "admin"), deleteBootcamp);

module.exports = router;
