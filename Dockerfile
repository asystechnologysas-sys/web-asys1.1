FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Creamos la carpeta data por si no existe
RUN mkdir -p /app/data
EXPOSE 3000
CMD ["npm", "start"]