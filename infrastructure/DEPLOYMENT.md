# Deployment Guide

1. **Configure environment variables**
   - Backend: DB URL, Redis URL, JWT secret, WhatsApp verify token, WhatsApp app secret.
   - Frontend: `NEXT_PUBLIC_API_BASE_URL`.
2. **Provision managed services**
   - PostgreSQL (AWS RDS / Cloud SQL / DO Managed DB).
   - Redis (Elasticache / Memorystore / Redis Cloud).
3. **Build and run containers**
   ```bash
   docker compose up --build -d
   ```
4. **Set WhatsApp webhook**
   - Endpoint: `https://<domain>/api/webhook/whatsapp`.
   - Verify token must match backend env value.
5. **Enable HTTPS**
   - Attach TLS cert in NGINX (Let's Encrypt or managed LB cert).
6. **CI/CD**
   - Use `.github/workflows/ci-cd.yml` to build, test, and validate compose stack.
7. **Scale**
   - Increase backend + worker replicas.
   - Run read replicas for Postgres if analytics load grows.
8. **Observability**
   - Add centralized logs, APM traces, uptime probes, and alerting.
