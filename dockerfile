# Establece la imagen base
FROM node:16

# Instala dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de paquetes y los instala
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . ./

# Compile TypeScript
RUN npm run build

# Expone el puerto que tu aplicación utiliza
EXPOSE 3000

# Run the web service on container startup.
CMD ["npm", "run", "start:prod" ]
