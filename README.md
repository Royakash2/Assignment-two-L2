# E-commerce Product Management System

This project is an Express application developed using TypeScript and MongoDB with Mongoose for effective data management. The application allows for managing products and orders, ensuring data integrity through validation using Joi/Zod.

## Features

- **Product Management**

  - Create a new product
  - Retrieve a list of all products
  - Retrieve a specific product by ID
  - Update product information
  - Delete a product
  - Search for products

- **Order Management**
  - Create a new order
  - Retrieve all orders
  - Retrieve orders by user email

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (>=14.x)
- npm (>=6.x)
- MongoDB (running instance)

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/Royakash2/Assignment-two-L2.git
cd Assignment-two-L2

Install Dependencies > npm install

Create a .env file in the root directory of the project and add the following variables:
PORT=3000
MONGODB_URI=your mongoDB data base url

Compile the TypeScript code to JavaScript: $ tsc

To start the application, use the following command: npm start:dev

```
