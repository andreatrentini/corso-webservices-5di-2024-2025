## Webservice RESTFul CRUD

### Container DB Server (MySQL)
```bash
docker run --name dbserver -d --network ws-db-net -e MYSQL_ROOT_PASSWORD=cisco -p 3320:3306 mysql:latest
```

### Container WebService RESTful CRUD (nodejs)
```bash
docker run --name wsserver -d -it -v /workspaces/corso-webservices-5di-2024-2025/wsserver/:/app -p 4444:4444 --network ws-db-net -w /app node:latest
```