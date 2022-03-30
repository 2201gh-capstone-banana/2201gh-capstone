const {
	models: { User }
} = require('../db')

// const requireToken = async (req, res, next) => {
// 	try {
// 		const token = req.headers.authorization
// 		console.log(token)
// 		// console.log('HEADERS', req.headers)
// 		// const user = await User.findByToken(token);
// 		// req.user = user;
// 		if (token) {
// 			next()
// 		}
// 	} catch (error) {
// 		next(error)
// 	}
// }

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
	//   console.log('HEADERS', req.headers)
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

