# Usamos una imagen base de Node.js
FROM node:20.18.3-alpine

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de configuración primero
COPY package*.json ./
COPY nodemon.json ./

# Instalamos las dependencias
RUN npm install
RUN npm install -g nodemon

# Copiamos el resto de los archivos del proyecto
COPY ./src ./src
COPY ./test ./test
COPY ./.env ./

# Creamos el directorio para las imágenes si no existe
RUN mkdir -p ./src/public/img

# Exponemos el puerto que usa la aplicación
EXPOSE 3000

# Variables de entorno (opcional, si no están en .env)
ENV NODE_ENV=development

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]

# Configuración de healthcheck (opcional pero recomendado)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/pets || exit 1