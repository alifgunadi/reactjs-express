const Product = require('./model');
const fs = require('fs');
const path = require('path');


const index = (req, res) => {
    Product.find().
        then(result => res.send(result))
        .catch(error => res.send(error));
};

const search = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

const store = (req, res) => {
    const {product, name, price} = req.body;
    const image = req.file;

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        image_url = `http://localhost:5000/public/${image.originalname}`

    }

    Product.create({product, name, price, image_url})
        .then(result => res.send(result))
        .catch(error => res.send(error));
};

const update = (req, res) => {
    const image = req.file;
    const info = {
        product: req.body.product,
        name: req.body.name,
        price: req.body.price,
    }
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        image_url = `http://localhost:5000/public/${image.originalname}`
    }

    Product.updateOne({ _id: req.params.id }, { $set: info } )
        .then(result => res.send(result))
        .catch(error => res.send(error));
};

const remove = (req, res) => {
    const { id } = req.params.id
    Product.deleteOne({ id })
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

module.exports = {
    index,
    search,
    store,
    update,
    remove
}