const groupOfCompanyService = require("../services/groupOfCompanyService");

exports.createGroupOfCompany = async (req, res, next) => {
  try {
    const newGroup = await groupOfCompanyService.createGroup(req.body);
    res.status(201).json(newGroup);
  } catch (err) {
    next(err);
  }
};

exports.getGroupsOfCompany = async (req, res, next) => {
  try {
    const groups = await groupOfCompanyService.getAllGroups();
    res.status(200).json(groups);
  } catch (err) {
    next(err);
  }
};

exports.getGroupOfCompanyById = async (req, res, next) => {
  try {
    const group = await groupOfCompanyService.getGroupById(req.params.id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateGroupOfCompany = async (req, res, next) => {
  try {
    const updatedGroup = await groupOfCompanyService.updateGroup(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedGroup);
  } catch (err) {
    next(err);
  }
};

exports.deleteGroupOfCompany = async (req, res, next) => {
  try {
    await groupOfCompanyService.deleteGroup(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
