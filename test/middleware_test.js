const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    beforeEach((done) => {
        john = new User({ name: 'John'});
        blogPost = new BlogPost({ title: 'Js is Great', content: 'Yep it really is.'});

        john.blogPosts.push(blogPost);

        Promise.all([john.save(), blogPost.save()])
            .then(() => {
                done();
            })
    });

    it('user clean up dangling blogposts on remove', (done) => {
        john.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            })
    })
});