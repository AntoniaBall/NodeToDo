var configValues = require('./config');

module.exports = {

    getDBConnectionString: function() {
        return 'mongodb+srv://'+ configValues.uname + ':' + configValues.pwd+'@cluster0-eukeb.mongodb.net/test';
    }
};