# GitOps Demo Backend

An independent, stateless Express service for Docker, Kubernetes, Helm, and
ArgoCD labs. It has no database, authentication, persistent storage, external
API, or connection to `gitops-demo-fe`

The `main` branch returns `production`. Change that value to `dev` or `uat` in
the corresponding branches when demonstrating environment promotion.

## Endpoints

| Endpoint | Purpose |
| --- | --- |
| `GET /` | Service summary |
| `GET /api` | Application status |
| `GET /health` | Readiness and liveness checks |

## Run locally

```sh
docker build -t gitops-demo-be .
docker run -d --name gitops-demo-be -p 8080:8080 gitops-demo-be
```

Test the endpoints:

```sh
curl http://localhost:8080/
curl http://localhost:8080/api
curl http://localhost:8080/health
```

The health endpoint returns `OK`.

## Continuous integration

The workflow pushes images to the `gitops-demo-be` ECR repository:

| Source | Image tag |
| --- | --- |
| Push to `dev` | `dev-<short-sha>` |
| Push to `uat` | `uat-<short-sha>` |
| Manual run from `main` | `production-<short-sha>` |

Required GitHub secrets:

```text
AWS_ACCOUNT_ID
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

The workflow creates the ECR repository if it does not already exist.
