const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("thoughts");
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate(
        "thoughts"
      );
      if (!user) {
        return res.status(404).json({ message: "No user Found." });
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const update = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(update);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const deleteOneUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deleteOneUser) {
        return res.status(404).json({ message: "No user is found." });
      }

      const thought = await Thought.findOneAndUpdate(
        { user: req.params.userId },
        { $pull: { user: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }
      res.status(200).json(deleteOneUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
