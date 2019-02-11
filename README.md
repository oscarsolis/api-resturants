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
Campo | Tipo De Datos | Requerido | Descripción
--- | --- | --- | ---
name | string | Sí | Nombre del usuario a registrar
paternalSurname | string | Sí | Apellido paterno del usuario
maternalSurname | string | Sí | Apellido materno del usuario
email | string | Sí | Correo electronico del usuario.
password | string | Sí | Contraseña de usuario.

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
