const participationService = require("../services/participationService");

// Create a new bid participation (POST)
const participateBid = async (req, res) => {
  try {
    const { bidId, mobile, rate, quantity } = req.body;

    if (!bidId || !mobile || !rate || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const participation = await participationService.participateInBid({
      bidId, mobile, rate, quantity
    });

    res.status(201).json({ message: "Bid participation successful", participation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bid participations (GET)
const getAllParticipations = async (req, res) => {
  try {
    const participations = await participationService.getAllParticipations();
    res.status(200).json(participations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bid participation by ID (GET)
const getParticipationById = async (req, res) => {
  try {
    const participation = await participationService.getParticipationById(req.params.id);

    if (!participation) {
      return res.status(404).json({ message: "Participation not found" });
    }

    res.status(200).json(participation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bid participation (PUT)
const updateParticipation = async (req, res) => {
  try {
    const updatedParticipation = await participationService.updateParticipation(req.params.id, req.body);

    if (!updatedParticipation) {
      return res.status(404).json({ message: "Participation not found" });
    }

    res.status(200).json({ message: "Participation updated successfully", updatedParticipation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a bid participation (DELETE)
const deleteParticipation = async (req, res) => {
  try {
    const deletedParticipation = await participationService.deleteParticipation(req.params.id);

    if (!deletedParticipation) {
      return res.status(404).json({ message: "Participation not found" });
    }

    res.status(200).json({ message: "Participation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  participateBid,
  getAllParticipations,
  getParticipationById,
  updateParticipation,
  deleteParticipation
};
