import request from 'supertest';
import express from 'express';
import { addHotel, validateAddHotel } from '../../src/controllers/hotelController';

// Mocking the model functions
jest.mock('../../src/models/hotelModel', () => ({
  addHotelToData: jest.fn().mockResolvedValue({
    hotelId: '123',
    title: 'Test Hotel',
    slug: 'test-hotel',
    description: 'A beautiful test hotel',
    location: 'Test Location',
    coordinates: '50.0,50.0',
    rooms: [],
    roomSlug: 'test-room',
  }),
  getHotels: jest.fn().mockResolvedValue([]),
  saveHotels: jest.fn(),
  updateHotelById: jest.fn(),
  getHotelById: jest.fn(),
}));

describe('POST /hotels', () => {
  const app = express();
  app.use(express.json());
  app.post('/hotels', validateAddHotel, addHotel);  // Register controller
  
  it('should successfully add a hotel', async () => {
    const response = await request(app)
      .post('/hotels')
      .send({
        title: 'Test Hotel',
        description: 'A beautiful test hotel',
        location: 'Test Location',
        coordinates: '50.0,50.0',
        rooms: [],
        roomSlug: 'test-room',
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Hotel added successfully');
  });

  it('should return error if title is missing', async () => {
    const response = await request(app)
      .post('/hotels')
      .send({
        description: 'A beautiful test hotel',
        location: 'Test Location',
        coordinates: '50.0,50.0',
        rooms: [],
        roomSlug: 'test-room',
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Title is required');
  });
});
