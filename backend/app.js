require('./config/mongoose.js');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const productRouter = require('./app/product/routes');
const logger = require('morgan');


app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouter);
app.use((req, res, next) => {
    res.status = (404),
    res.send({
        status: 'Failed',
        message: 'Resource ' + req.originalUrl + ' not found'
    });
    next();
});

app.listen(5000, () => console.log(`Server running at: http://localhost:5000`))
