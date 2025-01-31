FROM ubuntu:latest
LABEL authors="vanthkrab"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["top", "-b"]