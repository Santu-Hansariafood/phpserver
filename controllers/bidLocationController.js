const bidLocationService = require("../services/bidLocationService");

exports.getAll = async (req, res) => {
  try {
    const locations = await bidLocationService.getAllBidLocations();
    console.log('Fetched all bid locations:', locations);
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching bid locations:', error);
    res.status(500).json({ message: "Error fetching bid locations", error });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    console.log('Create request received with name:', name);
    if (!name) {
      console.log('Name is missing in create request');
      return res.status(400).json({ message: "Name is required" });
    }

    const newLocation = await bidLocationService.createBidLocation(name);
    console.log('Created new bid location:', newLocation);
    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error creating bid location:', error);
    res.status(500).json({ message: "Error creating bid location", error });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log(`Update request received for ID: ${id} with name: ${name}`);

    if (!name) {
      console.log('Name is missing in update request');
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedLocation = await bidLocationService.updateBidLocation(id, name);
    if (!updatedLocation) {
      console.log(`Bid location with ID: ${id} not found`);
      return res.status(404).json({ message: "Location not found" });
    }

    console.log('Updated bid location:', updatedLocation);
    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error('Error updating bid location:', error);
    res.status(500).json({ message: "Error updating bid location", error });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Delete request received for ID: ${id}`);

    const deletedLocation = await bidLocationService.deleteBidLocation(id);
    if (!deletedLocation) {
      console.log(`Bid location with ID: ${id} not found`);
      return res.status(404).json({ message: "Location not found" });
    }

    console.log('Deleted bid location:', deletedLocation);
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error('Error deleting bid location:', error);
    res.status(500).json({ message: "Error deleting bid location", error });
  }
};
