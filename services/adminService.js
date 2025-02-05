const Admin = require('../models/admin');

const createAdmin = async (adminData) => {
    return await Admin.create(adminData);
};

const getAdmins = async () => {
    return await Admin.find();
};

const loginAdmin = async (mobile, password) => {
    const admin = await Admin.findOne({ mobile });
    if (admin && admin.password === password) {
        return admin;
    }
    throw new Error('Invalid mobile number or password');
};

module.exports = { createAdmin, getAdmins, loginAdmin };
