const assert = require('assert');
const User = require('../src/user');

describe('Reading Users', () => {

    beforeEach((done) => {
        user = new User({ name: 'John'});
        user.save()
            .then(() => done());
    });

    it('find a user with a name john', (done) => {
        User.find({ name: 'John'})
            .then((users) => {
                assert(users[0]._id.toString() === user._id.toString());
                done();
            });
        
    });

    it('find a user with specific id', (done) => {
        User.findById(user._id)
            .then(user => {
                assert(user.name === 'John');
                done();
            });
    });
});