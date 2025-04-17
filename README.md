# Challenge-API

A RESTful API for managing polls with real-time vote updates using WebSockets.  
Built with Node.js, Express, TypeScript, Prisma, PostgreSQL and Zod.

---

## Features

- Create, update, and delete polls
- Filter polls by status (`NOT_STARTED`, `STARTED`, `IN_PROGRESS`, `FINISHED`)
- Vote on poll options
- Automatically calculates poll status based on dates
- Real-time vote updates with Socket.IO
- Input validation with Zod
- Full API documentation with Swagger (`/docs`)

---

## Technologies

- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- Zod (input validation)
- Socket.IO (real-time)
- Swagger (API docs)
- Docker (PostgreSQL container)

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/fioravante-dev/challenge-api.git
cd challenge-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/poll_db # or your own
PORT=3333 # or your own
```

### 4. Start PostgreSQL with Docker
```bash
docker compose up -d
```

### 5. Run migrations
```bash
npx prisma migrate dev
```

### 6. Start the API
```bash
npm run dev
```

---

## API Docs

Access full Swagger documentation at:

```
http://localhost:3333/docs
```

---

## WebSocket (real-time voting)

The server emits `poll_vote_update` whenever someone votes.

### Example client:
```js
const socket = io("http://localhost:3333");

socket.on("poll_vote_update", (data) => {
  console.log("Vote updated:", data);
});

# there is a small client in the utils folder to test it
```

---

Made by Pedro Fioravante as part of the Backend Developer Challenge of Code Challenges


## License

MIT
