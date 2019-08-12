const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const john = new User({ name: 'John', posts: [{title: 'PostTitle'}]})
        john.save()
            .then(() => User.findOne({ name: 'John' }))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            })
    });

    it('can add subdocuments to an existing record', (done) => {
        const john = new User({ name: 'John', posts: [] });
        john.save()
            .then(() => User.findOne({ name: 'John' }))
            .then((user) => { 
                user.posts.push({title: 'New Post'});
                return user.save();
            })
            .then(() => User.findOne({ name: 'John'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('can remove an existing subdocument', (done) => {
        const john = new User({ name: 'John', posts: [{title: 'PostTitle'}] });
        john.save()
            .then(() => User.findOne({ name: 'John' }))
            .then((user) => {
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'John'}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});