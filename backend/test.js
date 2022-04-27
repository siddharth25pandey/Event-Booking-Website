process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');
let should = chai.should();
var expect = chai.expect

chai.use(chaiHttp);

describe('Events', () => {
  describe('/GET events', () => {
      it('it should GET all the events', (done) => {
        chai.request(server)
            .get('/events')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
        });
    });
  describe('/POST event', () => {
      it('it should not POST an event without all fields', (done) => {
        let event = {
            name: "The Lord of the Rings Fan Talks",
            location: "J.K.R Mall, Thane",
            duration: "2h"
        }
        chai.request(server)
            .post('/events')
            .send(event)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message');
                  expect(res.body.message).to.include('is_premier: Path `is_premier` is required.');
                  expect(res.body.message).to.include('release_date: Path `release_date` is required.');
                  expect(res.body.message).to.include('languages: Path `languages` is required.');
              done();
            });
      });
  });
});


describe('Food', () => {
    describe('/GET food', () => {
        it('it should GET all food', (done) => {
          chai.request(server)
              .get('/food')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
          });
      });
    describe('/POST food', () => {
        it('it should not POST a food item without all fields', (done) => {
          let food = {
            food_name:"Price Breakup Tub Italian Popcorn + 2 Large Coke(0) 720 COKE LARGE(2) ...",
            is_popcorn: false,
            is_coke: false
          }
          chai.request(server)
              .post('/food')
              .send(food)
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    expect(res.body.message).to.include('is_combo: Path `is_combo` is required.');
                    expect(res.body.message).to.include('food_tag: Path `food_tag` is required.');
                    expect(res.body.message).to.include('food_price: Path `food_price` is required.');
                done();
              });
        });
    });
  });


  describe('Venue', () => {
    describe('/GET venue', () => {
        it('it should GET all venues', (done) => {
          chai.request(server)
              .get('/venue')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
          });
      });
    describe('/POST venue', () => {
        it('it should not POST a venue item without all fields', (done) => {
          let venue = {
            name:"Prem Garden: DLF Avenue, Saket",
            sub_region:"Delhi",
            package:2025
          }
          chai.request(server)
              .post('/venue')
              .send(venue)
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    expect(res.body.message).to.include('image: Path `image` is required.');
                    expect(res.body.message).to.include('capacity: Path `capacity` is required.');
                    expect(res.body.message).to.include('cancellation_availability: Path `cancellation_availability` is required.');
                done();
              });
        });
    });
  });

  describe('User', () => {
    describe('/GET user', () => {
        it('it should GET all users', (done) => {
          chai.request(server)
              .get('/users')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
          });
      });
    describe('/POST user', () => {
        it('it should not POST a user without all fields', (done) => {
          let user = {
            phone: "7021904275",
            email:"user23@gmail.com",
            password:"user1"
          }
          chai.request(server)
              .post('/users')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    expect(res.body.message).to.include('name: Path `name` is required.');
                    expect(res.body.message).to.include('about: Path `about` is required.');
                    expect(res.body.message).to.include('image: Path `image` is required.');
                done();
              });
        });
    });
  });

  describe('Organizer', () => {
    describe('/GET organizers', () => {
        it('it should GET all organizers', (done) => {
          chai.request(server)
              .get('/organizers')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
          });
      });
    describe('/POST organizers', () => {
        it('it should not POST an organizer without all fields', (done) => {
          let organizer = {
            phone: "7021904275",
            email:"organizer23@gmail.com",
            password:"organizer23"
          }
          chai.request(server)
              .post('/organizers')
              .send(organizer)
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    expect(res.body.message).to.include('name: Path `name` is required.');
                    expect(res.body.message).to.include('about: Path `about` is required.');
                    expect(res.body.message).to.include('image: Path `image` is required.');
                done();
              });
        });
    });
  });

  describe('Booking', () => {
    describe('/GET booking', () => {
        it('it should GET all bookings', (done) => {
          chai.request(server)
              .get('/booking')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
          });
      });
    describe('/POST booking', () => {
        it('it should not POST an organizer without all fields', (done) => {
          let booking = {
            name:"Sunburn Music Festival",
            date:7,
            day:"Friday"
          }
          chai.request(server)
              .post('/booking')
              .send(booking)
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    expect(res.body.message).to.include('time: Path `time` is required.');
                    expect(res.body.message).to.include('price: Path `price` is required.');
                    expect(res.body.message).to.include('grade: Path `grade` is required.');
                done();
              });
        });
    });
  });
