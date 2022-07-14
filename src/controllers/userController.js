const jwt = require('jsonwebtoken');
const Users = require('../services/userService');

const { JWT_SECRET } = require('../services/key');

exports.newUser = async (req, res) => {
    try {
        const newUser = { name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user',
        };
        const user = new Users(newUser);
        await user.register();
        return res.status(201).json({ user: {
            name: req.body.name,
            email: req.body.email,
            role: 'user',
        } });
        } catch (e) {
                console.log(e);
                return res.status(400).json({ error: e });
            }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newToken = await jwt.sign({ email, password }, JWT_SECRET);
       return res.status(200).json({ token: newToken });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: e });
    }
};