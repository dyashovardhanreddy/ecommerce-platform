# Order Platform Frontend

React frontend for browsing products from the Product Service.

## Requirements

- Node.js 18+
- Product Service running and reachable from the browser

## API Configuration

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Example:

```env
VITE_PRODUCT_SERVICE_URL=http://localhost:8081
```

If your Product Service runs from the existing Docker Compose setup on port `8082`, use:

```env
VITE_PRODUCT_SERVICE_URL=http://localhost:8082
```

## Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```
