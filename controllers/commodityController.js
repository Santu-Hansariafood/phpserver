const commodityService = require('../services/commodityService');

exports.createCommodity = async (req, res) => {
  try {
    const { commodityName, hsnCode, parameters } = req.body;

    const newCommodity = await commodityService.createCommodity({
      name: commodityName,
      hsnCode,
      parameters,
    });

    res.status(201).json(newCommodity);
  } catch (error) {
    console.error('Error creating commodity:', error);
    res.status(500).json({ message: 'Error creating commodity', error });
  }
};

exports.getAllCommodities = async (req, res) => {
  try {
    const commodities = await commodityService.getAllCommodities();
    res.status(200).json(commodities);
  } catch (error) {
    console.error('Error fetching commodities:', error);
    res.status(500).json({ message: 'Error fetching commodities', error });
  }
};

exports.getCommodityById = async (req, res) => {
  try {
    const commodity = await commodityService.getCommodityById(req.params.id);
    if (!commodity) {
      return res.status(404).json({ message: 'Commodity not found' });
    }
    res.status(200).json(commodity);
  } catch (error) {
    console.error('Error fetching commodity:', error);
    res.status(500).json({ message: 'Error fetching commodity', error });
  }
};

exports.updateCommodity = async (req, res) => {
  try {
    const updatedCommodity = await commodityService.updateCommodity(req.params.id, req.body);
    if (!updatedCommodity) {
      return res.status(404).json({ message: 'Commodity not found' });
    }
    res.status(200).json(updatedCommodity);
  } catch (error) {
    console.error('Error updating commodity:', error);
    res.status(500).json({ message: 'Error updating commodity', error });
  }
};

exports.deleteCommodity = async (req, res) => {
  try {
    const deletedCommodity = await commodityService.deleteCommodity(req.params.id);
    if (!deletedCommodity) {
      return res.status(404).json({ message: 'Commodity not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting commodity:', error);
    res.status(500).json({ message: 'Error deleting commodity', error });
  }
};
