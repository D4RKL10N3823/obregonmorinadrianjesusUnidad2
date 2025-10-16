# ---- Dockerfile: Django + SQLite + WhiteNoise ----
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential \
    && rm -rf /var/lib/apt/lists/*

# Instalar Python deps
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar proyecto
COPY . /app

# Vars mínimas para que Django cargue settings
ENV DJANGO_SETTINGS_MODULE=config.settings \
    PYTHONPATH=/app \
    PORT=8000

# Asegurar rutas para estáticos (STATIC_ROOT) y media
RUN mkdir -p /app/staticfiles /app/media

# Compilar estáticos (ok si no hay nada aún)
RUN python manage.py collectstatic --noinput || true

EXPOSE 8000

# Healthcheck simple
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -fsS http://localhost:${PORT}/ || exit 1

# Ejecutar migraciones y arrancar gunicorn
ENTRYPOINT ["sh", "-c", "python manage.py migrate --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:${PORT} --workers 3 --timeout 120"]