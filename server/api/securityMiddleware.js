const {
	models: { User }
} = require('../db')

const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    if (!req.user.isAdmin) {
        return res.status(403).send('Permission denied');
    } else {
        next();
    }
};

const requireToken = async (req, res, next) => {
	try {
	  const token = req.headers.authorization;
	  const user = await User.findByToken(token);
	  req.user = user;
	  next();
	} catch (error) {
	  next(error);
	}
  };

module.exports = {
	requireToken,
	isAdmin
}

