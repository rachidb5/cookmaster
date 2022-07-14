const usersModel = require('../models/UsersModel');

function users(body) {
    this.body = body;
    this.errors = [];
    this.users = null;
}

users.prototype.register = async function register() {
    this.users = await usersModel.create(this.body);
};

users.findUsers = async () => {
    const usuarios = await usersModel.find();
    return usuarios;
};

users.findByEmail = async (email) => {
    const user = await usersModel.findOne({ where: { email } });
    return user;
};

module.exports = users;