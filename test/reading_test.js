const assert = require('assert');
const User = require('../src/user');

describe('Reading Users', () => {
    let john, maria, alex, alice;

    beforeEach((done) => {
        john = new User({ name: 'John' });
        maria = new User({ name: 'Maria' });
        alex = new User({ name: 'Alex' });
        alice = new User({ name: 'Alice' });

        Promise.all([john.save(), maria.save(), alex.save(), alice.save()])
            .then(() => done());
    });

    it('find a user with a name john', (done) => {
        User.find({ name: 'John'})
            .then((users) => {
                assert(users[0]._id.toString() === john._id.toString());
                done();
            });
        
    });

    it('find a user with specific id', (done) => {
        User.findById(john._id)
            .then(user => {
                assert(user.name === 'John');
                done();
            });
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
        .sort({ name: 1 })
        .skip(1)
        .limit(2)
            .then((users) => {
                assert(users.length === 2);
                done();
            })
    });
});