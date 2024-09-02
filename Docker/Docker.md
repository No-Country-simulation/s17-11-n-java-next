# Docker

## Requisitos

### Instalación de Docker Desktop

Para utilizar Docker en tu máquina, primero debes instalar Docker Desktop desde el [sitio oficial de Docker](https://www.docker.com/products/docker-desktop). Asegúrate de seguir las instrucciones de instalación para tu sistema operativo (Windows, macOS o Linux) y de tener Docker Desktop corriendo antes de intentar usar los comandos de Docker.

## ¿Qué es Docker y cómo se utiliza en desarrollo?

Docker es una plataforma que permite crear, desplegar y ejecutar aplicaciones en contenedores. Los contenedores son entornos ligeros y portables que encapsulan todo lo necesario para ejecutar una aplicación, incluyendo el código, las bibliotecas y las dependencias.

### Beneficios de usar Docker en desarrollo

- **Consistencia en los Entornos**: Docker asegura que tu aplicación se ejecute de la misma manera en cualquier entorno, ya sea en tu máquina local, en un servidor de pruebas o en producción.
- **Aislamiento**: Los contenedores proporcionan un entorno aislado para cada componente de tu aplicación, evitando conflictos entre diferentes versiones de librerías y dependencias.
- **Facilidad de Configuración**: Con Docker Compose, puedes definir y configurar múltiples servicios (como frontend, backend y bases de datos) en un solo archivo, simplificando la configuración y el lanzamiento de entornos complejos.
- **Portabilidad**: Los contenedores Docker se pueden ejecutar en cualquier máquina que tenga Docker instalado, lo que facilita la colaboración y el despliegue en diferentes entornos.

### Requisitos de Máquina

- **Memoria RAM**: Se recomienda tener al menos 4 GB de RAM, pero para un rendimiento óptimo, especialmente con múltiples contenedores, 8 GB o más es ideal.
- **Espacio en Disco**: Docker puede consumir una cantidad significativa de espacio en disco dependiendo de las imágenes y volúmenes utilizados. Se recomienda tener suficiente espacio libre.
- **Procesador**: Un procesador moderno con soporte para virtualización es necesario para ejecutar Docker eficientemente.

### Desventajas

- **Consumo de Recursos**: Los contenedores pueden consumir una cantidad significativa de memoria y CPU, especialmente si se ejecutan múltiples contenedores simultáneamente.
- **Complejidad Adicional**: Aunque Docker simplifica muchos aspectos del desarrollo, también puede añadir una capa adicional de complejidad, especialmente en términos de configuración y mantenimiento de contenedores y redes.
- **Aprendizaje**: Requiere tiempo y esfuerzo aprender a configurar y gestionar Docker, así como a solucionar problemas relacionados con los contenedores.

## Configuración del Proyecto

### Dockerfile.frontend.dev

Configuración para el frontend (Next.js) con Docker Compose y Dockerfile en modo de desarrollo.

### Dockerfile.backend.dev

Configuración para el backend (Java) con Docker Compose y Dockerfile en modo de desarrollo.

### Comandos

``` bash
# Construir y levantar contenedores
docker compose up --build

# Cerrar todos los contenedores
docker compose down

# Mostrar logs de todos los contenedores
docker compose logs

# Mostrar logs en tiempo real
docker compose logs -f

# Mostrar el estado de los contenedores
docker compose ps

# Reiniciar todos los contenedores
docker compose restart

# Levantar contenedores en segundo plano (detached mode)
docker compose up -d

# Levantar contenedores en segundo plano con reconstrucción
docker compose up -d --build

# Limpiar la caché de Docker (opcional, pero recomendado si hay problemas)
docker builder prune -f

# Eliminar contenedores y redes (si es necesario limpiar todo)
docker compose down --volumes --remove-orphans

# Limpiar la caché de compilación de Docker
docker builder prune -f

# Limpiar caché, imágenes, contenedores, volúmenes y redes no utilizados
docker system prune -a -f --volumes

```
