# Build dependencies only when needed
FROM python:3.11-slim-bullseye AS builder

# Install apt packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        # dependencies for building python packages
        build-essential

# Create python dependencies wheels
COPY requirements.txt /tmp/requirements.txt
RUN pip wheel --wheel-dir /usr/src/app/wheels -r /tmp/requirements.txt

FROM python:3.11-slim-bullseye AS runner

ENV PYTHONBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN useradd -U fastapi

# Install apt packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    # clear apt-get cache & remove unnecessary files
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy python dependencies wheels from builder
COPY --from=builder /usr/src/app/wheels  /wheels/

# Use wheels to install python dependencies
RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
    && rm -rf /wheels/

# Copy application code
WORKDIR /app
COPY --chown=fastapi:fastapi . .

USER fastapi:fastapi

EXPOSE 8000

# Start server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port" ,"8000", "--workers" ,"2", "--log-level", "debug"]
