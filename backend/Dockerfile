FROM python:3.8.5-slim


ADD    . /backend
WORKDIR /backend


ENV LANG en_US.utf8
ENV PYTHONIOENCODING UTF-8
ENV PYTHONUNBUFFERED 1

RUN    pip install --no-cache-dir -r requirements.txt

EXPOSE 8080


CMD    python manage.py runserver 0.0.0.0:8080

