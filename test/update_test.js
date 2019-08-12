const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let john;

    beforeEach((done) => {
        john = new User({ name: 'John', likes: 0 });
        john.save()
            .then(() => done());
    });
    
    assertName = (operation, done) => {
        operation.then(() => User.find({}))
            .then(users => {
                assert(users.length === 1);
                assert(users[0].name === 'Joao');
                done();
            });
    }

    it('instance using type set n save', (done) => {
        john.set('name', 'Joao');
        assertName(john.save(), done);
    });

    it('A model instance can update', (done) => {
        assertName(john.update({ name: 'Joao'}), done);
    });

    it('A model class can update, update all users with name John to Joao', (done) => {
        assertName(User.update({ name: 'John' }, { name: 'Joao' }), done);
    });

    it('A model class can update one record', (done) => {
        assertName(User.findOneAndUpdate({ name: 'John' }, { name: 'Joao' }), done);
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(User.findByIdAndUpdate(john._id, { name: 'Joao'}), done);
    });

    it('A user can have their likes incremented by 1', (done) => {
        User.update({ name: 'John' }, { $inc: { likes: 1 } })
            .then(() => User.findOne({ name: 'John'}))
            .then((user) => {
                assert(user.likes === 1);
                done();
            });
    });
});