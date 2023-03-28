require('./config/mongoose.js');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const productRouter_v1 = require('./app/product_v1/routes');
const productRouter_v2 = require('./app/product_v2/routes');
const logger = require('morgan');


app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouter_v1);
app.use('/api/v2', productRouter_v2);
app.use((req, res, next) => {
    res.status = (404),
    res.send({
        status: 'Failed',
        message: 'Resource ' + req.originalUrl + ' not found'
    });
    next();
});

app.listen(5000, () => console.log(`Server running at: http://localhost:5000`))
