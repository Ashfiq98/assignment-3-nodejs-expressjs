# Node.js, Express.js, TypeScript Assignment

This project is a backend API developed using Node.js, Express.js, and TypeScript. It follows the MVC (Model-View-Controller) architecture to separate concerns, making the codebase modular and maintainable. The API allows users to manage hotel details and interact with hotel data stored in a JSON file. Several endpoints are included for CRUD operations and image uploads. Unit tests verify the functionality of each endpoint.

## Features

- **POST /hotel**: Adds new hotel details to the database (JSON file).
- **POST /image**: Uploads images related to the hotel (valid `jpg`, `jpeg`, `png` images).
- **POST /room-image**: Uploads room-specific images for a hotel.
- **GET /hotel/:hotelId**: Retrieves details of a hotel by its unique `hotelId`.
- **PUT /hotel/:hotelId**: Updates hotel details by its `hotelId`.
  
Each API has validation and error handling in place to ensure correct input and responses.

## Prerequisites

To run this project locally, you need to have the following installed:

- [Node.js](https://nodejs.org/en/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager, installed with Node.js)
- [Git](https://git-scm.com/) (for version control)

## Installation

Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```bash
     git clone https://github.com/Ashfiq98/assignment-3-nodejs-expressjs.git
   ```
2. Navigate into the project folder:
  ```bash
   cd assignment-3-nodejs-expressjs
  ```
3. Install dependencies:
  ```bash
    npm install
  ```
4. Start the development server:
   ```bash
   npm start
   ```

*** The API will be running at http://localhost:3000 ***

## API Endpoints

1. (POST) /hotel
This endpoint allows you to add new hotel details to the database.

2. (POST) /image
  This endpoint uploads an image for the hotel.

  Request Body (multipart/form-data):
   key -> images : value -> (file) jpg/jpeg/png
   key -> hotelId: value -> (string) valid hotelId

3. (POST) /room-image
  This endpoint uploads room-specific images for a hotel.
  
  Request Body (multipart/form-data):
  key -> room-image: value -> (file) jpg/jpeg/png
  key -> hotelId   : value -> (string) valid hotelId
  key -> roomSlug  : value -> (string) valid room slug

4. (GET) /hotel/:hotelId
  This endpoint retrieves hotel details by hotelId.

5. (PUT) /hotel/:hotelId
  This endpoint updates hotel details by hotelId.

## Testing
Unit tests for the API are implemented using Jest. To run the tests:

Ensure the project is installed and dependencies are set up as described above.

 1. Run the tests:
  ```bash
    npm test
  ```
This will execute all the unit tests in the __test__ folder.

## Folder Structure

- **assignment-3-nodejs-expressjs/**
  - **data/**
    - `hotel-id.json`: Hotel data stored here
    - `...`: Additional data files
  - **uploads/**: Folder where uploaded images are stored
  - **__test__/**: Folder containing unit tests
  - **src/**
    - **controllers/**: API controllers (handle the logic)
    - **models/**: Data models
    - **routes/**: API route handlers
    - `index.ts`: Main entry point of the application
  - `jest.config.ts`: Jest configuration file
  - `package.json`: Project metadata and dependencies
  - `README.md`: Project documentation
## Contributing
Feel free to fork the repository, open an issue, or submit a pull request for improvements or fixes.

### Notable Changes:
1. **Consistent formatting:** The API sections now follow a consistent format for each endpoint.
2. **Clarified the multipart/form-data request section**: Explained each key and value more clearly for image upload endpoints.


 This README provides a clear structure and instructions for someone unfamiliar with the project to get it up and running quickly.This version should work well for your project documentation! Let me know if you need further adjustments.You can customize it further if there are additional steps or specific details you want to add!





