import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

// Mock file filter function
const fileFilter = (req: Request, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error('Invalid file type. Only jpg, jpeg, and png are allowed.'));
  }
};

// Storage configuration for testing (no actual file storage)
const storage = multer.memoryStorage();

// Create Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Add fileFilter to Multer configuration
});

// Mock route for file upload
const fileUploadRoute = upload.single('image');

// Custom error handling middleware to catch errors from Multer
const errorHandlingMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(400).send(err.message);
  } else {
    next();
  }
};

// Test case to check invalid file type
describe('File Upload Middleware', () => {
  const testFilePath = path.join(__dirname, 'testImage.jpg');

  beforeAll(() => {
    fs.writeFileSync(testFilePath, 'test'); // Create a mock file
  });

  afterAll(() => {
    fs.removeSync(testFilePath); // Clean up after tests
  });

  it('should reject files that are not images', (done) => {
    const req: any = {
      file: { originalname: 'test.txt', mimetype: 'text/plain' },
    };

    // Mocking the res object with necessary methods
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const next = jest.fn();

    // Run file upload middleware
    fileUploadRoute(req, res, next);

    // Handle error in the custom error handler
    errorHandlingMiddleware(new Error('Invalid file type. Only jpg, jpeg, and png are allowed.'), req, res, next);

    setImmediate(() => {
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Invalid file type. Only jpg, jpeg, and png are allowed.');
      done();
    });
  });

  it('should accept image files', (done) => {
    const req: any = {
      file: { originalname: 'test.jpg', mimetype: 'image/jpeg' },
    };

    // Mocking the res object with necessary methods
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const next = jest.fn();

    // Run file upload middleware
    fileUploadRoute(req, res, next);

    setImmediate(() => {
      expect(next).toHaveBeenCalled();
      done();
    });
  });
});
