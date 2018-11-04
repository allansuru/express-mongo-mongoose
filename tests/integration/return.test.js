const request = require('supertest');
const {Rental} = require('../../models/rental');
const mongoose = require('mongoose');

let server;
let customerId;
let movieId;
let rental;

describe('/api/returns', () => {
    beforeEach( async ()  => { 
        server = require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId =  mongoose.Types.ObjectId();
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
        await server.close();
        await Rental.remove({}); 
    });

    it('should return 401 if client is not logged in', async () => {
        // const result = await Rental.findById(rental._id);
        // expect(result).not.toBeNull();
        // nova sintax do ECM6
     const res = await request(server)
        .post('/api/returns')
        .send({
            customerId,
             movieId
        });

        expect(res.status).toBe(401);
    });
});