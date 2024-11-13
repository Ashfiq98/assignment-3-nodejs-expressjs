// import { addHotelToData, getHotels, saveHotels, getHotelById, updateHotelImages, updateHotelById, filePath, dataPath } from '../models/hotelModel';
// import fs from 'fs-extra';
// import path from 'path';

// // Mock fs-extra methods with proper type casting
// jest.mock('fs-extra', () => ({
//   readJson: jest.fn(),
//   writeJson: jest.fn(),
//   readFile: jest.fn(),  // Mocking readFile
//   writeFile: jest.fn(), // Mocking writeFile
//   pathExists: jest.fn(),
//   ensureDir: jest.fn(),
//   ensureDirSync: jest.fn(),
// }));

// describe('hotelModel', () => {
//   const mockHotel = {
//     hotelId: '123',
//     name: 'Beach Resort',
//     images: ['image1.jpg'],
//   };

//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear any mocks before each test
//   });

//   describe('addHotelToData', () => {
//     it('should add a new hotel to the data file', async () => {
//       const newHotel = {
//         hotelId: '456',
//         name: 'Mountain Resort',
//         images: ['image2.jpg'],
//       };

//       // Mocking readJson and writeJson
//       (fs.readJson as jest.Mock).mockResolvedValueOnce([mockHotel]); // Initial hotel data
//       (fs.writeJson as jest.Mock).mockResolvedValueOnce(undefined); // Simulate write success

//       const result = await addHotelToData(newHotel);

//       expect(fs.readJson).toHaveBeenCalledWith(filePath);
//       expect(fs.writeJson).toHaveBeenCalledWith(filePath, [mockHotel, newHotel], { spaces: 2 });
//       expect(result).toEqual(newHotel); // The new hotel should be returned
//     });

//     it('should throw an error if adding hotel fails', async () => {
//       const newHotel = { hotelId: '456', name: 'Mountain Resort', images: ['image2.jpg'] };
//       (fs.readJson as jest.Mock).mockRejectedValueOnce(new Error('Error reading data'));

//       await expect(addHotelToData(newHotel)).rejects.toThrow('Error adding hotel data');
//     });
//   });

//   describe('getHotels', () => {
//     it('should return an empty array if no hotels exist', async () => {
//       (fs.pathExists as jest.Mock).mockResolvedValue(true); // Path exists
//       (fs.readFile as jest.Mock).mockResolvedValueOnce('[]'); // Mock readFile to return empty array

//       const hotels = await getHotels();
//       expect(hotels).toEqual([]); // Should return an empty array
//     });

//     it('should return hotel data from the file', async () => {
//       (fs.pathExists as jest.Mock).mockResolvedValue(true);
//       (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify([mockHotel])); // Return hotels data

//       const hotels = await getHotels();
//       expect(hotels).toEqual([mockHotel]); // Should return the mock hotel
//     });
//   });

//   describe('saveHotels', () => {
//     it('should save hotels data to the file', async () => {
//       const hotelsData = [mockHotel];
//       (fs.ensureDir as jest.Mock).mockResolvedValueOnce(undefined);
//       (fs.writeFile as jest.Mock).mockResolvedValueOnce(undefined); // Simulate write success

//       await saveHotels(hotelsData);

//       expect(fs.ensureDir).toHaveBeenCalledWith(dataPath);
//       expect(fs.writeFile).toHaveBeenCalledWith(filePath, JSON.stringify(hotelsData, null, 2));
//     });
//   });

//   describe('getHotelById', () => {
//     it('should return a hotel by ID', async () => {
//       (fs.readJson as jest.Mock).mockResolvedValueOnce([mockHotel]);
//       const hotel = await getHotelById('123');
//       expect(hotel).toEqual(mockHotel);
//     });

//     it('should return undefined if the hotel is not found', async () => {
//       (fs.readJson as jest.Mock).mockResolvedValueOnce([mockHotel]);
//       const hotel = await getHotelById('999');
//       expect(hotel).toBeUndefined();
//     });
//   });

//   describe('updateHotelImages', () => {
//     it('should add new images to the hotel and save data', async () => {
//       const newImages = ['image3.jpg', 'image4.jpg'];
//       const updatedHotel = { ...mockHotel, images: [...mockHotel.images, ...newImages] };

//       (fs.readJson as jest.Mock).mockResolvedValueOnce([mockHotel]);
//       (fs.writeJson as jest.Mock).mockResolvedValueOnce(undefined); // Simulate write success

//       await updateHotelImages('123', newImages);

//       expect(fs.writeJson).toHaveBeenCalledWith(filePath, [{ ...mockHotel, images: updatedHotel.images }], { spaces: 2 });
//     });

//     it('should handle case when hotel images are not present', async () => {
//       const newImages = ['image3.jpg'];

//       const hotelWithoutImages = { ...mockHotel, images: [] };
//       const updatedHotel = { ...hotelWithoutImages, images: newImages };

//       (fs.readJson as jest.Mock).mockResolvedValueOnce([hotelWithoutImages]);
//       (fs.writeJson as jest.Mock).mockResolvedValueOnce(undefined); // Simulate write success

//       await updateHotelImages('123', newImages);

//       expect(fs.writeJson).toHaveBeenCalledWith(filePath, [{ ...hotelWithoutImages, images: updatedHotel.images }], { spaces: 2 });
//     });
//   });

//   describe('updateHotelById', () => {
//     it('should update hotel data by ID', async () => {
//       const updatedHotelData = { name: 'New Beach Resort' };

//       (fs.readJson as jest.Mock).mockResolvedValueOnce([mockHotel]);
//       (fs.writeJson as jest.Mock).mockResolvedValueOnce(undefined); // Simulate write success

//       const updatedHotel = await updateHotelById('123', updatedHotelData);

//       expect(updatedHotel.name).toBe('New Beach Resort');
//       expect(fs.writeJson).toHaveBeenCalledWith(filePath, [{ ...mockHotel, ...updatedHotelData }], { spaces: 2 });
//     });

//     it('should throw an error if the hotel is not found', async () => {
//       const updatedHotelData = { name: 'New Beach Resort' };
//       (fs.readJson as jest.Mock).mockResolvedValueOnce([mockHotel]);

//       await expect(updateHotelById('999', updatedHotelData)).rejects.toThrow('Hotel not found');
//     });

//     it('should throw an error if updating hotel fails', async () => {
//       const updatedHotelData = { name: 'New Beach Resort' };
//       (fs.readJson as jest.Mock).mockRejectedValueOnce(new Error('Error reading data'));

//       await expect(updateHotelById('123', updatedHotelData)).rejects.toThrow('Error updating hotel data');
//     });
//   });
// });

