
# eCommerce-wellness_products

## Descripción

Este es un proyecto de eCommerce para productos de bienestar. Incluye tanto el backend como el frontend de la aplicación, con autenticación JWT y conexión con Stripe para el procesamiento de pagos.

## Requisitos

- Node.js
- Docker
- Docker Compose

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/genismartinez/eCommerce-wellness_products.git
cd eCommerce-wellness_products
```

### Configuración del Backend

1. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=yourpassword
    DB_DATABASE=ecommerce
    JWT_SECRET_KEY=your_jwt_secret_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

2. Iniciar la base de datos con Docker Compose:

    ```bash
    docker-compose up -d
    ```

3. Instalar las dependencias del backend:

    ```bash
    cd backend
    npm install
    ```

4. Ejecutar migraciones para configurar la base de datos:

    ```bash
    npm run typeorm migration:run
    ```

5. Levantar el servidor backend:

    ```bash
    npm start
    ```

### Configuración del Frontend

1. Instalar las dependencias del frontend:

    ```bash
    cd ../frontend
    npm install
    ```

2. Levantar el servidor frontend:

    ```bash
    npm start
    ```

## Uso

### Frontend

El frontend estará disponible en `http://localhost:3000`.

### Backend

El backend estará disponible en `http://localhost:4000`.

### Endpoints

- `/login` - Iniciar sesión
- `/register` - Registrarse
- `/products` - Listar productos
- `/cart` - Carrito de compras
- `/purchase` - Historial de compras

### Stripe

Asegúrate de tener una cuenta de Stripe y configurar la clave secreta en el archivo `.env` para poder procesar pagos.

## Autores

Este proyecto ha sido desarrollado por genismartinez.
