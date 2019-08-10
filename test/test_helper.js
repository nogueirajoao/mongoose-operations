const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb+srv://admin:password@dev-1zadm.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
    });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});
