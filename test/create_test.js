const assert = require('assert');
const User = require('../src/user');

describe('Creating Users', () => {
    it('saves a user', (done) => {
        const u = new User({ name: 'John'});
        u.save()
            .then(() => {
                assert(!u.isNew);
                done();
            });
    });
});