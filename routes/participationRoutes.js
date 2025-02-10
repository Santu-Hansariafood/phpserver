const express = require("express");
const {
  participateBid,
  getAllParticipations,
  getParticipationById,
  updateParticipation,
  deleteParticipation
} = require("../controllers/participationController");

const router = express.Router();

router.post("/", participateBid);
router.get("/", getAllParticipations);
router.get("/:id", getParticipationById);
router.put("/:id", updateParticipation);
router.delete("/:id", deleteParticipation);

module.exports = router;
