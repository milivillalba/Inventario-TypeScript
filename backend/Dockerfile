# Imagen base de Node
FROM node:23-bullseye

# Directorio de trabajo
WORKDIR /app

# Copia codigo
COPY . .
# Copia dependencias
RUN npm install

#Exponer el puerto del servidor
EXPOSE 4000

# comando para iniciar el servidor
CMD [ "npm", "start"]