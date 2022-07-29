const express = require('express');
const upload = require('../middleware/upload');
const controller = require('../controllers/hero.controller');
const  joiTodoValidation  = require('../middleware/validator.todos');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/delete/:id', controller.remove);
router.post('/',joiTodoValidation, upload.single('image'), controller.create);
router.post('/:id',joiTodoValidation, upload.single('image'), controller.update);
router.put('/:id', upload.single('image'), controller.updatePhoto);

module.exports = router; 
