import request from 'supertest';
import express from 'express';
import { updateHotel } from '../../src/controllers/hotelController';

// Mocking the model functions
jest.mock('../../src/models/hotelModel', () => ({
  updateHotelById: jest.fn().mockResolvedValue({
    hotelId: '123',
    title: 'Updated Hotel',
    slug: 'updated-hotel',
    description: 'Updated description',
  }),
  getHotels: jest.fn().mockResolvedValue([]),
  saveHotels: jest.fn(),
  getHotelById: jest.fn().mockResolvedValue({
    hotelId: '123',
    title: 'Old Hotel',
    description: 'Old description',
  }),
}));

describe('PUT /hotel/:hotelId', () => {
  const app = express();
  app.use(express.json());
  app.put('/hotel/:hotelId', updateHotel);

  it('should successfully update hotel data', async () => {
    const response = await request(app)
      .put('/hotel/123')
      .send({
        title: 'Updated Hotel',
        description: 'Updated description',
      });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hotel data updated successfully');
  });

  it('should return error if title or description is missing', async () => {
    const response = await request(app)
      .put('/hotel/123')
      .send({
        description: 'Updated description',
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Title and description are required');
  });
});
