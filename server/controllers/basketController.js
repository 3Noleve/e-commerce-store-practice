const { Device, BasketDevice } = require('../models/models');

class BasketController {
  async addToBasket(req, res, next) {
    const user = req.user;
    const { deviceId } = req.body;
    const basket = await BasketDevice.create({ basketId: user.id, deviceId: deviceId });
    return res.json(basket);
  }

  async getBasketUser(req, res) {
    const { id } = req.user;
    const basket = await BasketDevice.findAll({
      include: {
        model: Device,
      },
      where: { basketId: id },
    });
    if (!basket) res.status(400).json('None Id');
    return res.json(basket);
  }

  async deleteBasket(req, res) {
    const { id } = req.body;
    if (!id) res.status(400).json('None Id');
    await BasketDevice.destroy({ where: { id: id } });
    return res.status(200).json('Product deleted');
  }

  async deleteAllBasket(req, res) {
    await BasketDevice.destroy({
      truncate: true,
    });
    return res.status(200).json('all deleted');
  }
}

module.exports = new BasketController();
