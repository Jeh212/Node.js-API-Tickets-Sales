FROM debian:stable

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash \
    && apt-get install -y nodejs \
    && apt-get clean -y

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4005

CMD [ "npm", "run", "dev" ]
