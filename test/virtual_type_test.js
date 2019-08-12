const assert = require('assert');
const User = require('../src/user');

describe('virtual types', () => {
    it('postCount returns a number of posts', (done) => {
        const john = new User({
            name: 'John',
            posts: [{ title: 'PostTitle'}]
        });

        john.save()
            .then(() => User.findOne({ name: 'John'}))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });
    });
});