const Orders = require("./model");


module.exports = {
  addNew: async function (req, res) {
    try {
      let result = await Orders.create(req.body);
      if (!result) {
        return res.status(400).send("yaratishda hato");
      }
      return res.status(201).send(result);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  getOrders: async function (req, res) {
    try {
      let orders = await Orders.find({});
      return res.status(200).send(orders);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  getWorkId: async function (req, res) {
    try {
      let order = await Orders.findById(req.params.id);
      return res.status(200).send(order);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  deleteOrders: async function (req, res) {
    try {
      let ordersId = req.params.id;
      let result = await Orders.findByIdAndDelete(ordersId);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  updateOrders: async function (req, res) {
    try {
      let ordersId = req.params.id;
      let result = await Orders.findByIdAndUpdate(ordersId, req.body);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};
