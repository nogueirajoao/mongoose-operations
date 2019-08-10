const assert = require('assert');
const User = require('../src/user');

describe('Deleting Users', () => {
    
    beforeEach((done) => {
        user = new User({ name: 'John'});
        user.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        user.remove()
            .then(() => User.findOne({ name: 'John'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    
    it('class method remove', (done) => {
        User.deleteOne({ name: 'John'})
            .then(() => User.findOne({ name: 'John'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndDelete({ name: 'John'})
            .then(() => User.findOne({ name: 'John'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndDelete(user._id)
            .then(() => User.findOne({ name: 'John'}))
            .then((u) => {
                assert(u === null);
                done();
            });
    });
});