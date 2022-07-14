const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const { JWT_SECRET } = require('../services/key');

const recipesAuth = async (_request, response, next) => {
    const { ingredients } = _request.body;
    const { name } = _request.body;
    const { preparation } = _request.body;
    if (name === undefined) {
      return response.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    if (ingredients === undefined) {
        return response.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    if (preparation === undefined) {
        return response.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    next();
};

const tokenAuth = async (req, res, next) => {
    try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, JWT_SECRET);
    if (!token || !payload) {
        return res.status(401).json({ message: 'jwt malformed' });
    } next();
} catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'jwt malformed' });
}
};

const tokenAuthUpdate = async (req, res, next) => {
    try {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'missing auth token' });
    } next();
} catch (e) {
    return res.status(401).json({ message: 'jwt malformed' });
}
};

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, callback) => {
      callback(null, `${req.params.id}.jpeg`);
    },
  });
  
const upload = multer({ storage }).single('image');

module.exports = { recipesAuth, tokenAuth, tokenAuthUpdate, upload };