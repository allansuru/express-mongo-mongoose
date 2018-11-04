const request = require('supertest');
const {Rental} = require('../../models/rental');
const mongoose = require('mongoose');

let server;
let customerId;
let movieId;
let rental;

describe('/api/returns', () => {
    beforeEach( async () => { 
        server = require('../../index'); 
        customerId = mongoose.Types.ObjectId().toHexString();
        movieId =  mongoose.Types.ObjectId().toHexString();
         rental = new Rental({
            customer: {
                _id: customerId,
                name: '123456',
                phone: '123456'
            },
            movie: {
                _id: movieId,
                title: '123456',
                dailyRentalRate: 2
            }
        });
       await rental.save();
    });

    afterEach(async () => { 
        server.close();
        await Rental.remove({}); 
    });

    it('should work!', async () => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    });
});