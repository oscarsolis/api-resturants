# Servidor

## Requerimientos
- NodeJs >= 8
- NPM
- MongoDB >= 3.6.*

## Instalación

Ejecute los siguientes comandos en su terminal

```
  npm install
  npm start
``` 

El API usa autorización JWT, todas las rutas están protegidas para que solo los usuarios registrados en el sistema puedan acceder a la aplicación, inicialmente usted necesitara un usuario por default para poder iniciar sesión en el sistema, puede registrar el siguiente usuario o cambiarlo por los datos que a usted mejor le parezcan.

```json
{
    "name" : "Admin",
    "paternalSurname" : "Apellido Admin",
    "maternalSurname" : "Apellido Admin",
    "email" : "admin@gmail.com",
    "isActive" : true,
    "phone" : "5606322324",
    "password" : "$2a$10$L9QTdPG1w83.SwpgbQjrpur0XI6oP4fkQZ.mVZ3vuImoYa.S6yod2",// el siguiente hash corresponde a la clave 12345
    "createdAt" : ISODate("2018-07-19T06:18:41.256Z"),
    "updatedAt" : ISODate("2018-07-19T23:50:58.481Z"),
    "deleted" : false
}

```

