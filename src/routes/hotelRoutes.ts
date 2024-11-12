// routes/hotelRoutes.ts
import express from 'express';
import { uploadHotelImages,validateUploadHotelImages,validateUploadRoomImages,uploadRoomImages,getHotel,addHotel,updateHotel, validateAddHotel } from '../controllers/hotelController';
import { upload } from '../middlewares/uploadMiddleware';
// import { addHotel } from '../controllers/hotelController';
// import { uploadRoomImages } from '../controllers/hotelController';

const router = express.Router();

router.post('/hotel',validateAddHotel, addHotel);

router.post('/image', upload.array('images', 5),validateUploadHotelImages, uploadHotelImages);

// const router = express.Router();

router.post('/room-image', upload.array('room-image', 5),validateUploadRoomImages, uploadRoomImages);
router.get('/hotel/:hotelId', getHotel);  // Map the GET request to the controller method
router.put('/hotel/:hotelId', updateHotel); 

export default router;
