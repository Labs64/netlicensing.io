# Docker Development Setup

## Prerequisites
- Docker Desktop installed and running

## Versions
- **Jekyll**: 3.10.0 (latest supported by GitHub Pages)
- **Ruby**: 3.1.x (via Jekyll 4.2.2 image)
- **Bundler**: 2.6.9
- **github-pages**: 232 (latest)
- **html-proofer**: 5.1.1

## Quick Start

1. **Start the development server:**
   ```bash
   chmod +x _serve_docker.sh
   ./_serve_docker.sh
   ```
   
   Or manually:
   ```bash
   docker compose up --build
   ```

2. **Access the site:**
   - Website: http://localhost:4000
   - LiveReload is enabled on port 35729

3. **Stop the server:**
   - Press `Ctrl+C` in the terminal

## What's Included

- **Dockerfile**: Custom Jekyll image with Bundler
- **docker-compose.yml**: Service configuration with:
  - Volume mounting for live code changes
  - Bundle cache persistence (faster rebuilds)
  - LiveReload support
  - Development configuration merged (_config.yml + _config_dev.yml)
  - Drafts and future posts enabled

## Useful Commands

### Build only (without starting)
```bash
docker compose build
```

### Start in detached mode (background)
```bash
docker compose up -d
```

### View logs
```bash
docker compose logs -f
```

### Stop background service
```bash
docker compose down
```

### Clean rebuild (clear cache)
```bash
docker compose down -v
docker compose up --build
```

### Execute Jekyll commands manually
```bash
docker compose exec netlicensing bundle exec jekyll doctor
docker compose exec netlicensing bundle exec htmlproofer ./_site
```

### Shell access to container
```bash
docker compose exec netlicensing bash
```

## Troubleshooting

### Port already in use
If port 4000 is already taken, modify `docker-compose.yml`:
```yaml
ports:
  - "4001:4000"  # Change host port
  - "35730:35729"
```

### Bundle install fails
Clear the bundle cache and rebuild:
```bash
docker compose down -v
docker compose up --build
```

### Changes not reflecting
Ensure volume mounting is working:
```bash
docker compose exec netlicensing ls -la /srv/jekyll
```

### Docker daemon not running
Start Docker Desktop before running any docker commands.

## Performance Notes

- **Volume caching** (`cached` option) improves macOS performance
- **Bundle cache** persists between container restarts
- **Incremental builds** speed up regeneration
- **LiveReload** auto-refreshes browser on changes
