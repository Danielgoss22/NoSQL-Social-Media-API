const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughts");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:userId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
