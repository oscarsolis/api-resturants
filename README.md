# Servidor

La siguiente api proporciona una api publica para el registro de usuarios, un api de autenticación y un api con autorización para el registro de restaurantes.

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

# Documentación API

## Registro de usuario

### URL
```
 /users
```
### Método
```
POST
```

### Body Parameters
Campo | Tipo De Datos | Requerido | Unico | Descripción
--- | --- | --- | --- | ---
name | string | Sí | No | Nombre del usuario a registrar
paternalSurname | string | Sí | No | Apellido paterno del usuario
maternalSurname | string | Sí | No | Apellido materno del usuario
email | string | Sí | Sí | Correo electronico del usuario.
password | string | Sí | No | Contraseña de usuario.

* **Ejemplo**

```json
{
 "name": "test",
 "paternalSurname": "test",
 "maternalSurname" : "test",
 "email": "test@gmail.com",
 "password": "12345"
}
```

### Success Response - Codigo HTTP 200

``` json
{
 "success": true, 
 "user": {
	"updatedAt": "2019-02-11T22:17:45.121Z",
	"createdAt": "2019-02-11T22:17:45.121Z",
	"name": "test",
	"paternalSurname": "test",
	"maternalSurname": "test",
	"email": "test@gmail.com",
	"password": "$2a$10$qXg2ot41YjHBnMUrZqHaGOLSsbnpHenYgc9dc4NbQe88AANraexea",
	"deleted": false,
	"_id": "5c61f48892b48948d1ab96c1"
	}
}
```

### Error de Validación - Codigo Http 422

``` json
{
 "success": false,
 "errors": [	
	"El campo paternalSurname es requerido",
	"El campo name es requerido"
 ]
}
```

## Autenticación de usuario

### URL
```
 /auth/login
```
### Método
```
POST
```

### Body Parameters
Campo | Tipo De Datos | Requerido | Descripción
--- | --- | --- | ---
email | string | Sí | Correo electronico del usuario.
password | string | Sí | Contraseña de usuario.

* **Ejemplo**

```json
{
 "email": "test@gmail.com",
 "password": "12345"
}
```

### Success Response - Codigo HTTP 200

``` json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzYxZjQ4ODkyYjQ4OTQ4ZDFhYjk2YzEiLCJuYW1lIjoidGVzdCIsInBhdGVybmFsU3VybmFtZSI6InRlc3QiLCJtYXRlcm5hbFN1cm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTU0OTkyNjQzNCwiZXhwIjoxNTUwMDE2NDM0fQ.fvHoxhDvrHaCadOnkOtaNpY2leBI059RUvLfYdXXAAI"
}
```

### Credenciales invalidas - Codigo Http 404

``` json
{
 "success": false,
 "message": "User not found"
}
```

## Listado de restaurantes

### URL
```
 /restaurants
```
### Método
```
GET
```

### Headers
```
 Authorization: Bearer <token proporcionado por el api de autenticación>
```

### Success Response - Codigo HTTP 200

``` json
{
 "success": true,
 "restaurants": [
   {
    "_id": "5c620396753ea057308e7bb9",
    "updatedAt": "2019-02-11T23:21:58.990Z",
    "createdAt": "2019-02-11T23:21:58.990Z",
    "name": "Vips",
    "lat": 19.4343886968948,
    "lng": -99.1433370212402,
    "email": "vips@gmail.com",
    "phone": "1242343432",
    "isActive": true,
    "deleted": false
    }
 ]
}
```

## Registro de restaurantes

### URL
```
 /restaurants
```
### Método
```
POST
```

### Headers
```
 Authorization: Bearer <token proporcionado por el api de autenticación>
```

### Body Parameters
Campo | Tipo De Datos | Requerido | Descripción
--- | --- | --- | ---
name | string | Sí | Nombre del restaurante.
email | string | Sí | Email de contacto de restaurante.
isActive | Boolean | Sí | Si el resturante esta activo. 
phone | string | Sí | Teléfono del resturante.
lat | Double | Sí | Latitud de la posición del restaurante.
lng | Double | Sí | Longitud de la posición del restaurante.

* **Ejemplo**

```json
{
 "name" : "Vips",
 "lat" : 19.4343886968948,
 "lng" : -99.1433370212402,
 "email" : "vips@gmail.com",
 "phone" : "1242343432",
 "isActive" : true,
}
```

### Success Response - Codigo HTTP 200

``` json
{
 "success": true, 
 "restaurant": {
    "updatedAt": "2019-02-11T23:21:58.990Z",
    "createdAt": "2019-02-11T23:21:58.990Z",
    "name": "Vips",
    "lat": 19.4343886968948,
    "lng": -99.1433370212402,
    "email": "vips@gmail.com",
    "phone": "1242343432",
    "isActive": true,
    "deleted": false,
    "_id": "5c620396753ea057308e7bb9"
 }
}
```

### Error de Validación - Codigo Http 422

``` json
{
  "success": false,
  "errors": [
    "El campo isActive es requerido",
    "El campo phone es requerido",
    "El campo email es requerido",
    "El campo lng es requerido",
    "El campo lat es requerido",
    "El campo name es requerido"
  ]
}
```

## Busqueda de restaurante por ID

### URL
```
 /restaurants/<resturantId>
```
### Método
```
GET
```

### Headers
```
 Authorization: Bearer <token proporcionado por el api de autenticación>
```

### Success Response - Codigo HTTP 200

``` json
{
 "success": true,
 "restaurant": {
  "deletedBy": "5c620396753ea057308e7bb9",
  "deletedAt": "2019-02-11T23:40:34.251Z",
  "_id": "5c620396753ea057308e7bb9",
  "updatedAt": "2019-02-11T23:40:34.254Z",
  "createdAt": "2019-02-11T23:21:58.990Z",
  "name": "Vips",
  "lat": 19.4343886968948,
  "lng": -99.1433370212402,
  "email": "vips@gmail.com",
  "phone": "1242343432",
  "isActive": true,
  "deleted": false
 }
}
```

### Not Found Restaurante - Codigo HTTP 404
``` json
{
    "success": false,
    "message": "not found Restaurant"
}
```


## Eliminación de restaurante

### URL
```
 /restaurants/<resturantId>
```
### Método
```
DELETE
```

### Headers
```
 Authorization: Bearer <token proporcionado por el api de autenticación>
```

### Success Response - Codigo HTTP 200

``` json
{
 "success": true,
 "restaurant": {
  "deletedBy": "5c620396753ea057308e7bb9",
  "deletedAt": "2019-02-11T23:40:34.251Z",
  "_id": "5c620396753ea057308e7bb9",
  "updatedAt": "2019-02-11T23:40:34.254Z",
  "createdAt": "2019-02-11T23:21:58.990Z",
  "name": "Vips",
  "lat": 19.4343886968948,
  "lng": -99.1433370212402,
  "email": "vips@gmail.com",
  "phone": "1242343432",
  "isActive": true,
  "deleted": true
 }
}
```

### Not Found Restaurante - Codigo HTTP 404
``` json
{
    "success": false,
    "message": "not found Restaurant"
}
```
