const adminService = require('../services/adminService');

const createAdmin = async (req, res) => {
    try {
        const admin = await adminService.createAdmin(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAdmins();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const admin = await adminService.loginAdmin(mobile, password);
        res.status(200).json({ message: 'Login successful', admin });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { createAdmin, getAdmins, loginAdmin };

