const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {

    let john, blogPost, comment;

    beforeEach((done) => {
        john = new User({ name: 'John'});
        blogPost = new BlogPost({ title: 'Js is Great', content: 'Yep it really is.'});
        comment = new Comment({ content: 'Congrats on great post' });

        john.blogPosts.push(blogPost);
        blogPost.comments.push(comment); 
        comment.user = john;

        Promise.all([john.save(), blogPost.save(), comment.save()])
            .then(() => {
                done();
            })
    });

    it('saves a relation between a user and blogpost', (done) => {
        User.findOne({ name: 'John' }).populate('blogPosts').then((user) => {
            assert(user.blogPosts[0].title === 'Js is Great');
            done();
        })
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'John' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            }).then((user) => {
                assert(user.name === 'John');
                assert(user.blogPosts[0].title === 'Js is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
                assert(user.blogPosts[0].comments[0].user.name === 'John')
                done();
            })
    });

});