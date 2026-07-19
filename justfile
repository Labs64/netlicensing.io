# List available commands
default:
    @just --list

# Start the development server (use `just serve -d` to run in background)
serve *ARGS:
    @echo "🚀 Starting Jekyll development server..."
    docker compose up --build {{ARGS}}

# Stop the background service
down:
    docker compose down

# View logs
logs:
    docker compose logs -f

# Clean rebuild (clear cache)
clean:
    docker compose down -v
    docker compose up --build

# Run Jekyll doctor to check for issues
doctor:
    docker compose exec netlicensing bundle exec jekyll doctor

# Run html-proofer to check links and HTML validity
proofer:
    docker compose exec netlicensing bundle exec htmlproofer ./_site

# Create a new draft post with the given title
new-post title:
    ./_new_post.sh "{{title}}"

# Build the static site (one-off)
build:
    docker compose run --rm netlicensing bundle exec jekyll build --config _config.yml

# Install Ruby dependencies
install:
    docker compose run --rm netlicensing bundle install

# Publish a draft post to the posts directory
publish draft_filename:
    #!/usr/bin/env bash
    set -e
    DRAFT_PATH="_drafts/{{draft_filename}}"
    if [ ! -f "$DRAFT_PATH" ]; then
        echo "Error: Draft not found at $DRAFT_PATH"
        exit 1
    fi
    DATE_PREFIX=$(date +"%Y-%m-%d")
    BASE_NAME=$(basename "{{draft_filename}}" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//')
    NEW_PATH="_posts/${DATE_PREFIX}-${BASE_NAME}"
    mv "$DRAFT_PATH" "$NEW_PATH"
    echo "✅ Published $DRAFT_PATH to $NEW_PATH"
