const qualityParameterService = require("../services/qualityParameterService");

exports.createQualityParameter = async (req, res) => {
  try {
    const newQualityParameter =
      await qualityParameterService.createQualityParameter(req.body);
    res.status(201).json(newQualityParameter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating quality parameter", error });
  }
};

exports.getAllQualityParameters = async (req, res) => {
  try {
    const qualityParameters =
      await qualityParameterService.getAllQualityParameters();
    res.status(200).json(qualityParameters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching quality parameters", error });
  }
};

exports.getQualityParameterById = async (req, res) => {
  try {
    const qualityParameter =
      await qualityParameterService.getQualityParameterById(req.params.id);
    if (!qualityParameter) {
      res.status(404).json({ message: "Quality parameter not found" });
    } else {
      res.status(200).json(qualityParameter);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching quality parameter", error });
  }
};

exports.deleteQualityParameter = async (req, res) => {
  console.log("Deleting ID:", req.params.id); // Debug log
  try {
    await qualityParameterService.deleteQualityParameter(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting parameter:", error);
    res
      .status(500)
      .json({ message: "Error deleting quality parameter", error });
  }
};

exports.updateQualityParameter = async (req, res) => {
  try {
    const updatedQualityParameter =
      await qualityParameterService.updateQualityParameter(
        req.params.id,
        req.body
      );
    res.status(200).json(updatedQualityParameter);
  } catch (error) {
    console.error("Error updating parameter:", error);
    res
      .status(500)
      .json({ message: "Error updating quality parameter", error });
  }
};
