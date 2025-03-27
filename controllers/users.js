const User = require("../models/user");

const index = async (req, res) => {
	try {
		const users = await User.find({}, "username");

		res.json(users);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

const get = async (req, res) => {
	try {
		if (req.user._id !== req.params.userId) {
			return res.status(403).json({ err: "Unauthorized" });
		}

		const user = await User.findById(req.params.userId);

		if (!user) {
			return res.status(404).json({ err: "User not found." });
		}

		res.json({ user });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

const addFoodOrders = async (req, res) => {
	console.log(req.params.userId)
	console.log(req.user._id)
	try {
		if (req.user._id !== req.params.userId) {
			return res.status(403).json({ err: "Unauthorized" });
		}

		const user = await User.findById(req.params.userId);
		if (!user) {
			return res.status(404).json({ err: "User not found." });
		}

		if (Array.isArray(req.body) && req.body.length > 0) {
			user.ordersList.push(...req.body);
			await user.save();
			res.status(201).json(user.ordersList.slice(-req.body.length));
		} else if (req.body && typeof req.body === "object") {
			user.ordersList.push(req.body);
			await user.save();
			res.status(201).json(req.body);
		} else {
			res.status(400).json({ err: "Request body must be an object or an array of menu items" });
		}
	} catch (error) {
		res.status(500).json({ err: error.message });
	}
};

module.exports = { index, get};
