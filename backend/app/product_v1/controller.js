const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb');

const viewItems = (req, res) => {
    db.collection('products').find()
    .toArray()
        .then(result => (res.send(result)))
        .catch(error => (res.send(error)));
};

const getItems = (req, res) => {
    const { id } = req.params;
    db.collection('products').findOne({ _id: new ObjectId(id)})
        .then(result => (res.send(result)))
        .catch(error => (res.send(error)));
}

const addItems = (req, res) => {
    const { product, name, price } = req.body;
    const image = req.file;

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
    }

    db.collection('products').insertOne({ product, name, price, image: `http://localhost:5000/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));

};

const updateItems = (req, res) => {
    const { id } = req.params;
    const { product, name, price } = req.body;
    const image = req.file;

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        image_url = `http://localhost:5000/public/${image.originalname}`
    }

    db.collection('products').updateOne({ _id: new ObjectId(id)}, { $set: { product, name, price } })
        .then(result => (res.send(result)))
        .catch(error => (res.send(error)));
};

const deleteItems = (req, res) => {
    const { id } = req.params;
    db.collection('products').deleteOne({_id: new ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

module.exports = {
    addItems,
    getItems,
    viewItems,
    updateItems,
    deleteItems
}