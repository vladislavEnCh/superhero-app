const Hero = require('../models/Hero');
const errorHandler = require('../utils/errorHandler');

let heroContainer;

class HeroClass {
  getAll = async (req, res) => {
    let limit = req.query.limit >= 1 ? req.query.limit : 2;
    try {
      const heroes = await Hero.find().limit(limit);
      res.status(200).json(heroes);
    } catch (e) {
      errorHandler(res, e);
    }
  };

  getById = async (req, res) => {
    try {
      const heroes = await Hero.findById(req.params.id);
      res.status(200).json(heroes);
    } catch (e) {
      errorHandler(res, e);
    }
  };

  remove = async (req, res) => {
    try {
      await Hero.remove({ _id: req.query.id });

      res.status(200).json({
        message: 'the hero has been deleted',
      });
    } catch (e) {
      errorHandler(res, e);
    }
  };

  create = async (req, res) => {
    try {
      const {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      } = req.body;
      const category = new Hero({
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        imageSrc: req.file ? req.file.path : '',
      });
      await category.save();
      res.status(201).json(category);
    } catch (e) {
      errorHandler(res, e);
    }
  };

  update = async (req, res) => {
    try { 
      const updated = {
        nickname: req.body.nickname,
        real_name: req.body.real_name,
        origin_description: req.body.origin_description,
        superpowers: req.body.superpowers,
        catch_phrase: req.body.catch_phrase,
        imageSrc: req.file ? req.file.path : '',
      };

      const newHero = await Hero.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updated },
        { new: true }
      );
      res.status(201).json(newHero);
    } catch (e) {
      errorHandler(res, e);
    }
  };
  updatePhoto = async (req, res) => {
    try { 
      const updated = {
        imageSrc: req.file ? req.file.path : '',
      };

       await Hero.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updated },
        { new: true }
      );
      res.status(201).json({
        message: 'Photo has been updated',
      });
    } catch (e) {
      errorHandler(res, e);
    }
  };
}

const initHeroContainer = () => {
  if (!heroContainer) {
    heroContainer = new HeroClass();
  }
  return heroContainer;
};

module.exports = initHeroContainer();
// export default initHeroContainer();
