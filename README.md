# Snack Overflow

Snack Overflow is a full-stack retail assistance application for managing product browsing, order checkout, AI-powered recommendations, and customer support interactions. The project combines a React + Vite frontend, a FastAPI backend, a MySQL database, and AI-driven product recommendation and customer service flows.

## Overview

The app is designed around a grocery/retail workflow:

- Browse products and stock information from the catalog
- Review product reliability predictions during checkout
- Create orders and track delivery status
- Receive AI-generated substitute recommendations when stock or quality issues are detected
- Use a chat interface for customer service assistance and order-related apologies
- Validate order images using the AI validation flow

## Tech stack

- Frontend: React, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS
- Backend: FastAPI, Python 3.12, MySQL Connector
- Database: MySQL 8.0
- AI/ML: Groq-backed LLM flows and product scoring logic in the backend
- Containerization: Docker + Docker Compose

## Project structure

```text
Hackathon2025/
├── Backend/
│   ├── AI2_LLM_model/
│   ├── app/
│   ├── ML_model/
│   ├── routers/
│   ├── Dockerfile
│   ├── README.md
│   ├── requirements.txt
│   └── ...
├── Database/
│   ├── first_run.sql
│   ├── list_of_product.csv
│   ├── README.md
│   └── sample_products_40.json
├── Frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── docker-compose.yml
├── README.md
└── ...
```

## Main application flow

### Frontend

The frontend is mounted under [Frontend](Frontend) and uses route-based screens such as:

- Dashboard
- Bookings / product browsing
- Checkout / reliability warnings
- Orders / tracking
- Chat assistant

The router is defined in [Frontend/src/core/router/routes.tsx](Frontend/src/core/router/routes.tsx).

### Backend

The FastAPI app is initialized in [Backend/app/main.py](Backend/app/main.py) and includes routers for:

- Booking APIs: `/booking`
- Checkout APIs: `/checkout`
- Service bot APIs: `/service`
- Validation APIs: `/validate`
- Chat APIs: `/chat`

### Database

The MySQL database is seeded via [Database/first_run.sql](Database/first_run.sql). It contains the `Product`, `Order`, and related tables used by the backend and checkout flows.

## Environment configuration

The app expects environment variables for database and AI access. The Docker Compose stack passes these values from the host environment or defaults:

- `MYSQL_ROOT_PASSWORD` (default: `rootpassword`)
- `GROQ_API_KEY`
- `VITE_API_BASE_URL` (default: `http://localhost:8000`)

A typical `.env` file at the repo root may look like:

```env
MYSQL_ROOT_PASSWORD=rootpassword
GROQ_API_KEY=your_groq_api_key
VITE_API_BASE_URL=http://localhost:8000
```

## Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

This will start:

- MySQL at `localhost:3306`
- Backend API at `http://localhost:8000`
- Frontend app at `http://localhost:5173`

The FastAPI Swagger docs are available at:

```text
http://localhost:8000/docs
```

## Run services individually

### Backend

```bash
cd Backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Key API routes

The backend exposes several key endpoints used by the UI:

### Booking

- `GET /booking/products` — fetch all available products
- `GET /booking/orders` — fetch orders and tracking data
- `POST /booking/order` — create an order

### Checkout

- `POST /checkout/predict` — get product reliability prediction scores
- `POST /checkout/order` — store an order record

### Service bot

- `POST /service/alternative` — fetch a product and alternative suggestions
- `POST /service/missing` — handle missing products and compensation language
- `POST /service/talk` — general customer-service chat flow

### Chat

- `POST /chat/message` — send a chat prompt to the customer support LLM
- `POST /chat/clear` — clear conversation history
- `POST /chat/order-apology` — generate an apology and alternative recommendations after a failed validation

### Validation

- `POST /validate/` — validate an uploaded order image against expected quantities/products

## Important notes

- The app relies on the MySQL container initialized by Docker Compose.
- The backend uses `app.database.get_connection()` to connect to the `valioaimo` database.
- The frontend and backend are configured for local development under the default ports shown above.
- Groq credentials are required for the AI and customer service features to function.

## Useful links

- [Backend](Backend)
- [Frontend](Frontend)
- [Database](Database)
- [docker-compose.yml](docker-compose.yml)

## Development status

This project is a hackathon-style prototype combining product management, predictive warnings, chat-driven support, and order validation. It is suitable for local development and demo use with Docker Compose.
