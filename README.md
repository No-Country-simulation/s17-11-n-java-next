# ReTrueque

API REST para una plataforma colaborativa de intercambio de servicios. Permite publicar servicios, solicitar intercambios, gestionar la aceptación de solicitudes y dejar calificaciones una vez completado el acuerdo.

## Mi aporte

Este fue un proyecto colaborativo. Mi trabajo se centró principalmente en el backend: diseño de endpoints y reglas de negocio, autenticación JWT, autorización, flujo de solicitudes, emails transaccionales, carga de imágenes en Amazon S3, migraciones de base de datos y documentación de la API.

## Tecnologías

- Java 17 y Spring Boot 3
- Spring Security con JWT
- Spring Data JPA y PostgreSQL
- Flyway para migraciones
- Amazon S3 para imágenes
- Thymeleaf y Resend para emails transaccionales
- OpenAPI / Swagger
- Docker

## Funcionalidades destacadas

- Registro, autenticación y verificación de cuentas por correo.
- Publicación, edición y eliminación de servicios con control de propiedad.
- Búsqueda paginada y filtros por categoría, provincia y departamento.
- Solicitudes entre usuarios, con aceptación o rechazo exclusivo del dueño del servicio.
- Comentarios y calificaciones disponibles tras una solicitud aceptada.
- Subida de imágenes y documentación interactiva en Swagger.

## Acceso demo

- Solicitante: `john_doe@example.com`
- Prestadora: `jane_smith@example.com`
- Contrasena para ambas: `Demo123!`

## Ejecutar el backend

1. Entra en la carpeta `retrueque`.
2. Copia `example .env` como `.env` y completa las variables con tus credenciales locales.
3. Crea una base de datos PostgreSQL vacía y ajusta `DATABASE`, `DB_USER` y `DB_PASSWORD`.
4. Inicia la aplicación en modo desarrollo:

```powershell
$env:SPRING_PROFILES_ACTIVE="dev"
.\mvnw.cmd spring-boot:run
```

Flyway creará el esquema y aplicará las migraciones. En desarrollo Hibernate puede actualizar el esquema; en la configuración base se utiliza `validate`, adecuada para despliegues donde Flyway es la fuente de verdad.

## Documentación de la API

Con la aplicación en ejecución, Swagger UI está disponible en `http://localhost:8080/swagger-ui/index.html`.

Rutas principales:

- `POST /api/v1/auth/register` y `POST /api/v1/auth/login`
- `GET|POST|PUT|DELETE /api/v1/service`
- `GET|POST|PUT /api/v1/requests`

## Decisiones técnicas

- Las operaciones de edición y borrado verifican que el recurso pertenezca al usuario autenticado.
- Las migraciones de Flyway versionan el esquema; por eso producción usa `ddl-auto: validate`.
- Las URLs del frontend para emails se inyectan por entorno con `FRONTEND_URL`.
- Las credenciales no se versionan: `.env` está excluido del repositorio y `example .env` contiene solo valores de ejemplo.
