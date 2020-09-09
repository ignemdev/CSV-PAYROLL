class MongooseInstance {
    constructor() {
        this.mongoose = require('mongoose');
    }

    #_options = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }

    connect(dbstr) {
        this.mongoose.connect(dbstr, this.#_options)
    }
}

module.exports = new MongooseInstance();