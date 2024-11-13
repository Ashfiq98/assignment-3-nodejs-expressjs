import request from 'supertest';
import express from 'express';
import { uploadHotelImages, validateUploadHotelImages } from '../../src/controllers/hotelController';
import { upload } from '../../src/middlewares/uploadMiddleware';
// import {path} from 'path';
import path from 'path';

// Mocking the model functions
jest.mock('../../src/models/hotelModel', () => ({
  updateHotelImages: jest.fn().mockResolvedValue(true),
  getHotelById: jest.fn().mockResolvedValue({
    hotelId: '123',
    images: [],
    rooms: [],
  }),
}));

describe('POST /hotel/images', () => {
  const app = express();
  app.use(express.json());
  app.post('/hotel/images', upload.single('image'), validateUploadHotelImages, uploadHotelImages);

  it('should successfully upload hotel images', async () => {
    const response = await request(app)
      .post('/hotel/images')
      .attach('image', path.join(__dirname, 'testImage.jpg'))
      .field('hotelId', '123');
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Images uploaded and hotel data updated successfully');
  });

  it('should return error if no image is uploaded', async () => {
    const response = await request(app)
      .post('/hotel/images')
      .field('hotelId', '123');
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No files uploaded');
  });
});
