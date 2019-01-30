const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://venu:venugopal1234@ds255754.mlab.com:55754/users');

module.exports = { mongoose};