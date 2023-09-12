
# Newsletter-Back

![GitHub](https://img.shields.io/github/license/bjaider/newsletter-back)
![GitHub last commit](https://img.shields.io/github/last-commit/bjaider/newsletter-back)

Newsletter-Back is the backend repository for the Newsletter project, a simple web application for managing newsletters and subscriptions. This repository contains the server-side code, built with Node.js and Express.js, to handle API requests and interact with the database.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

Before you can run this project, ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database for storing newsletter and subscription data.

### Installation

Follow these steps to set up and run the Newsletter-Back project:

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/bjaider/newsletter-back.git
   ```

2. Navigate to the project directory:

   ```
   cd newsletter-back
   ```

3. Install the project dependencies using npm:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and configure it with the necessary environment variables.

5. Start the server:

   ```
   npm start
   ```

The server should now be running at the specified port in your `.env` file.

## Usage

This backend provides API endpoints for managing newsletters and subscriptions. You can integrate it with the frontend of your choice to create a fully functional newsletter management system.

## API Endpoints

Here are the available API endpoints provided by this backend:

- **POST /api/user**: Validates the request body for the presence of a username and password. Calls the loginAdmin function for admin login.

- **GET /api/newsletter**: Requires a valid token for authentication. Calls the getAllNewsletter function to fetch a list of newsletters.

- **POST /api/newsletter/send**: Requires a valid token for authentication. Calls the sendNewsletter function to send a newsletter.

- **POST /api/recipient**: Calls the addRecipient function to add a recipient for newsletters.

- **GET /api/recipient**: Requires a valid token for authentication. Calls the listRecipients function to fetch a list of recipients.

- **PUT /api/recipient/unsubscribe/**: Allows recipients to unsubscribe from newsletters.

For more details on how to use these endpoints, refer to the API documentation or the source code in the `routes` directory.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, concise commit messages.
4. Push your changes to your fork.
5. Create a pull request to the `main` branch of this repository.
