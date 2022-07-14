const Users = require('../services/userService');

const userAuth = (_request, response, next) => {
    const { email } = _request.body;
    const { name } = _request.body;
    if (email === undefined) {
      return response.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    if (!email.match(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/)) {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
    }  
    if (name === undefined || name === '') {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    next();
};

const emailAuth = async (_request, response, next) => {
    const users = await Users.findUsers();
    const usersNames = users.map((user) => user.email);
    if (usersNames.includes(_request.body.email)) {
        return response.status(409).json({ message: 'Email already registered' });
    }
    next();
};

const loginAuth = async (_request, response, next) => {
    const { email } = _request.body;
    const { password } = _request.body;
    if (email === undefined || password === undefined) {
        return response.status(401).json({ message: 'All fields must be filled' });
    }
    if (!email.match(/^[a-z0-9_.]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/)) {
        return response.status(401).json({ message: 'Incorrect username or password' });
    } 
    next();
};

const loginPasswordAuth = async (req, res, next) => {
    const { email } = req.body;
    const { password } = req.body;
    const users = await Users.findUsers();
    const usersNames = users.filter((user) => user.email === email);
if (usersNames.length < 1 || usersNames[0].password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
} 
next();
};

module.exports = { userAuth,
    emailAuth,
    loginAuth,
    loginPasswordAuth };