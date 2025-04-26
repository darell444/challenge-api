# Challenge API 🚀

![Challenge API](https://img.shields.io/badge/Challenge_API-v1.0.0-brightgreen)

Welcome to the **Challenge API**! This is a RESTful API designed for managing polls with real-time voting updates using WebSockets. It provides a simple yet powerful way to create, manage, and participate in polls. Whether you're building a voting application or need a backend for your polling feature, this API has you covered.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Real-time Voting Updates](#real-time-voting-updates)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Releases](#releases)

## Features

- **Create and Manage Polls**: Easily create polls and manage them with various options.
- **Real-time Updates**: Receive real-time updates for votes using WebSockets.
- **User-friendly Interface**: Designed with a simple and clean interface for easy interaction.
- **Comprehensive Documentation**: Well-documented API with examples.
- **Secure Voting**: Ensures secure and anonymous voting.

## Technologies Used

This project uses a variety of technologies to ensure high performance and scalability:

- **Express**: A fast web framework for Node.js.
- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **PostgreSQL**: A powerful, open-source relational database.
- **Prisma**: A modern database toolkit.
- **Socket.IO**: Enables real-time, bidirectional communication.
- **Swagger**: API documentation tool.
- **TypeScript**: A typed superset of JavaScript.
- **Zod**: A TypeScript-first schema declaration and validation library.

## Installation

To get started with the Challenge API, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/darell444/challenge-api.git
   cd challenge-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   Ensure you have PostgreSQL installed and running. Create a database and update the `.env` file with your database credentials.

4. **Run the Application**:
   ```bash
   npm run start
   ```

Your API will be running on `http://localhost:3000`.

## Usage

You can interact with the API using tools like Postman or curl. Here are some examples of how to use the API.

### Create a Poll

```http
POST /api/polls
Content-Type: application/json

{
  "title": "Favorite Programming Language",
  "options": ["JavaScript", "Python", "Java", "C++"]
}
```

### Get All Polls

```http
GET /api/polls
```

### Vote on a Poll

```http
POST /api/polls/:pollId/vote
Content-Type: application/json

{
  "option": "JavaScript"
}
```

## API Endpoints

Here’s a list of the main API endpoints available:

| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/api/polls`                     | Retrieve all polls                   |
| POST   | `/api/polls`                     | Create a new poll                    |
| GET    | `/api/polls/:pollId`             | Retrieve a specific poll             |
| POST   | `/api/polls/:pollId/vote`        | Vote on a specific poll              |
| DELETE | `/api/polls/:pollId`             | Delete a specific poll               |

## Real-time Voting Updates

One of the key features of the Challenge API is real-time voting updates. By using WebSockets, the API allows clients to receive updates as votes are cast. 

### How It Works

1. When a user votes, the server updates the poll data.
2. The server then broadcasts the updated poll data to all connected clients.
3. Clients can listen for these updates and refresh their UI accordingly.

### Example Code

Here’s a simple example of how to connect to the WebSocket server:

```javascript
const socket = io('http://localhost:3000');

socket.on('pollUpdated', (poll) => {
  console.log('Poll updated:', poll);
  // Update the UI with the new poll data
});
```

## Testing

To ensure the API works as expected, you can run tests using the following command:

```bash
npm run test
```

Make sure to have a test database set up in your environment variables.

## Contributing

We welcome contributions to the Challenge API! If you have suggestions or improvements, please fork the repository and submit a pull request. 

### Steps to Contribute

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Releases

For the latest releases, please visit [Releases](https://github.com/darell444/challenge-api/releases). You can download the latest version and execute it as needed.

## Conclusion

Thank you for checking out the Challenge API! We hope it meets your needs for managing polls and real-time voting updates. If you have any questions or feedback, feel free to reach out or contribute to the project.