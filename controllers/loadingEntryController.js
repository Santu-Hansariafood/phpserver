const loadingEntryService = require("../services/loadingEntryService");

exports.createLoadingEntry = async (req, res) => {
  try {
    const entry = await loadingEntryService.createLoadingEntry(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllLoadingEntries = async (req, res) => {
  try {
    const entries = await loadingEntryService.getAllLoadingEntries();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLoadingEntryById = async (req, res) => {
  try {
    const entry = await loadingEntryService.getLoadingEntryById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLoadingEntry = async (req, res) => {
  try {
    const entry = await loadingEntryService.updateLoadingEntry(req.params.id, req.body);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLoadingEntry = async (req, res) => {
  try {
    const entry = await loadingEntryService.deleteLoadingEntry(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
