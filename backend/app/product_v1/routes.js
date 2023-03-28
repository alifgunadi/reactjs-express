const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const controller = require('./controller')


router.get('/product', controller.viewItems);

router.get('/product/:id', controller.getItems);

router.post('/product', upload.single('image'), controller.addItems);

router.put('/product/:id', upload.single('image'), controller.updateItems);

router.delete('/product/:id', controller.deleteItems);

module.exports = router;