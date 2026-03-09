# Smart WhatsApp Expense Tracker

Production-ready SaaS blueprint for a WhatsApp-integrated expense tracking PWA.

## Architecture

```text
                        +-----------------------------+
                        |   WhatsApp Cloud API       |
                        |  (Inbound Webhooks / Send) |
                        +--------------+--------------+
                                       |
                                       v
+------------------+         +---------+----------+          +-------------------+
|  Next.js PWA UI  | <------ |   NGINX Reverse    | -------> |  NestJS API       |
|  (dashboard)     |  HTTPS  |   Proxy + TLS      |   /api   |  Gateway          |
+--------+---------+         +---------+----------+          +-----+-------------+
         |                             |                           |
         | Push/API                    |                           |
         v                             v                           v
+-------------------+         +--------------------+       +------+------+
| Service Worker +  |         | JWT Auth, Rate     |       | BullMQ Queue|
| Offline Cache     |         | Limiting, Security |       | + Workers    |
+-------------------+         +--------------------+       +------+------+
                                                                     |
                                                                     v
                                                           +---------+---------+
                                                           | Parser + Category |
                                                           | Rule Engine        |
                                                           +---------+---------+
                                                                     |
                                                                     v
                                                          +----------+----------+
                                                          | PostgreSQL          |
                                                          | users, txns, logs   |
                                                          +---------------------+
```

### High-Level Data Flow
1. User sends WhatsApp message (`expense 120 lunch`).
2. WhatsApp Cloud API calls `POST /api/webhook/whatsapp`.
3. NestJS verifies signature/token, finds/creates user, enqueues job in BullMQ.
4. Worker parses text, classifies category, writes transaction to PostgreSQL.
5. Worker can trigger budget alert + outgoing WhatsApp confirmation.
6. Frontend fetches transactions/analytics via JWT-protected APIs.
7. PWA caches key routes and recent API payloads for offline view.

## Monorepo Layout

```text
backend/
frontend/
infrastructure/
```

## Quickstart

```bash
docker compose up --build
```

Services:
- Frontend: http://localhost:3000
- API: http://localhost:4000
- NGINX gateway: http://localhost

## Scale Notes (10k users, 100k tx/day)
- Stateless API pods behind NGINX/load balancer.
- BullMQ worker horizontal autoscaling.
- PostgreSQL indexes + partitioning by month for transactions.
- Redis persistence + AOF enabled.
- Observability hooks (health checks, structured logs, webhook log table).
