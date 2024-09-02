# Dockerfile.frontend.dev

# Usa una imagen de bun como base
FROM oven/bun:latest

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el bun.lockb (si existe) para aprovechar el cache de Docker
COPY ../frontend/package.json ../frontend/bun.lockb* ./

# Instala las dependencias
RUN bun install

# Copia el resto de los archivos del proyecto
COPY ../frontend .

# Mostrar las variables de entorno (Temporal)
RUN echo "Frontend Environment Variables:" && printenv

# Expone el puerto que utiliza Next.js
EXPOSE 3000

# Comando para iniciar el servidor en modo desarrollo
CMD ["bun", "dev"]
