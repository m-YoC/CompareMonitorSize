FROM node:19-bullseye-slim
# FROM debian:bullseye-slim

# Install required packages
RUN apt-get update -qq && apt-get install -y make \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Adjust permissions (verification required) and create directories
RUN umask 0000 && mkdir /frontend && mkdir /frontend/app && mkdir /frontend/default_files

WORKDIR /frontend
ENV DOCKER_WORKDIR=/frontend

# Time zone setting
ENV TZ=Asia/Tokyo

COPY ./default_files ./default_files/
COPY ./finit.sh ./

# Scripts to run at startup
COPY ./frontend_entrypoint.sh ./
RUN chmod +x frontend_entrypoint.sh
ENTRYPOINT ["./frontend_entrypoint.sh"]
