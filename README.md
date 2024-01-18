## Usage

### Docker Build

Clone this repository and then run

```bash
cp .env.example .env
docker compose up -d
```

The app will be available at `127.0.0.1:3000`

### Local Build for Development

Clone this repository and then run

```bash
cp .env.example .env
```

Change `<your database url>` in `.env`

Run
```bash
yarn install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Tech Stack

- Typescript
- MySQL
- Prisma
- Tailwind
- Vue with Nuxt
- Docker

## Features

- Authentication
- Local Storage integrated Time Tracker