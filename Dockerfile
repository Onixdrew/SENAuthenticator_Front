# Usa una imagen base de Node.js version oficial
# FROM node:20

# # Establece el directorio de trabajo en el contenedor
# WORKDIR /AppSena

# # Copia todos los archivos que empiecen package*. archivo package.json y el package-lock.json si existe
# # en la ruta /APPSENAutenticator
# COPY package*.json ./

# # Instala las dependencias de la aplicación
# RUN npm install

# # Copia el resto de los archivos de la aplicación(codigo fuente) dentro del contenedor
# COPY . .

# # Expone el puerto que tu aplicación usará (puerto 3000 en este caso)
# EXPOSE 5173

# # Define el comando que se ejecutará cuando se inicie el contenedor
# CMD [ "npm", "run", "dev" ]





# 1. Usa una imagen de Node.js como base
FROM node:20 AS build

# 2. Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copia el archivo de dependencias (package.json y package-lock.json o yarn.lock) al contenedor
COPY package*.json ./

# 4. Instala las dependencias
RUN npm install

# 5. Copia el resto de los archivos del proyecto
COPY . .

# 6. Construye la aplicación para producción
RUN npm run build

# 7. Usa una imagen ligera de servidor para servir el contenido estático (como nginx)
FROM nginx:alpine AS production

# 8. Copia los archivos de construcción al servidor nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 9. Expone el puerto en el que Nginx servirá la aplicación
EXPOSE 5173

# 10. Inicia Nginx cuando el contenedor se ejecute
CMD ["nginx", "-g", "daemon off;"]
