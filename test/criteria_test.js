const assert = require('assert');
const mongoose = require('mongoose');
const data = require('../src/data');

const Artist = require('../src/artist');

describe('Criteria', () => {

    before((done) => {
        Artist.insertMany(data)
            .then(() => {
                mongoose.connection.collections.artists.createIndex({ name: "text" });
                done();
            });
    });

    it('Search Artists with age between 20 & 30 years old and yearsActive between 2 & 10 years', (done) => {
        const criteria = {
            age: { min: 20, max: 30 },
            yearsActive: { min: 2, max: 10}
        };
        
        Artist.find(buildQuery(criteria))
            .then((results) => {
                //console.log('\n' + results);
                assert(results[0].age >= 20 && results[0].age <= 30);
                assert(results[1].yearsActive >= 2 && results[0].yearsActive <= 10);
                done();
            });
    });

    it('Search Artists with age between 30 & 70 years old and yearsActive between 10 & 50 years', (done) => {
        const criteria = {
            age: { min: 30, max: 70 },
            yearsActive: { min: 10, max: 50}
        };
        
        Artist.find(buildQuery(criteria))
            .then((results) => {
                //console.log('\n' + results);
                assert(results[0].age >= 30 && results[0].age <= 70);
                assert(results[1].yearsActive >= 10 && results[0].yearsActive <= 50);
                done();
            });
    });

    it('Search Artist with name Miki', (done) => {
        const criteria = {
            name: 'Miki'
        };
        
        Artist.find(buildQuery(criteria))
            .then((result) => {
                assert(result[0].name === 'Miki Jagger');
                done();
            });
    });

    after((done) => {
            mongoose.connection.collections.artists.drop()
                .then(() => {
                    done();
                })
    });

});

const buildQuery = (criteria) => {
    const query = {};

    if (criteria.name) {
        query.$text = { $search: criteria.name }
    }

    if (criteria.age) {
        query.age = {
            $gte: criteria.age.min,
            $lte: criteria.age.max
        };
    }

    if (criteria.yearsActive) {
        query.yearsActive = {
            $gte: criteria.yearsActive.min,
            $lte: criteria.yearsActive.max
        }
    }

    return query;
};