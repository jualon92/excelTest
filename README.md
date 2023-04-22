 
# Comenzar proyecto

First, run the development server:
 
npm run dev
 
yarn dev
 

Abrir [http://localhost:3000](http://localhost:3000) 
 
 
## Como se realizo el proyecto
Se inicializo con git init un repo,  git remote add origin url   
Se utilizo npx create-next-app@latest para esqueleto de proyecto(se eligio utilizar typescript, eslint,)  [https://nextjs.org/docs/api-reference/create-next-app]

### Leer contenido de sheet
1. onSubmit acepta solo archivos excel para evitar problemas
2. se inicializa FileReader
2. al tomar un archivo excel, se utiliza funcion auxiliar sheetToJson() de xlsx  

### Trabajar con datos obtenidos
1. Comprobar la integridad de los datos. Dentro de try catch se valida con Yup.
2. Libreria notistack para notificar a usuario si paso o no la validacion 
3. Al pasar validacion,  se comienza a construir tabla  (opte por mover  logica de construir tabla a xlsx.ts)
4. Para construir tabla se utilizan los elementos que aparecieron mas de una vez segun su id, 
y los elementos sin id . 
5. luego de construir la tabla en base a ambas lista, se procede a colorear las celdas sin id. Respecto a styling, se procedio a utilizar una libreria basada en xlsx que si soporta styling 

## Extra
#### Adaptar la consigna a un desafio laboral, app como excel checker
El objetivo de la app  pasa a ser un editor de excel que devuelve una tabla que remarca errores y permite aumentar montos sin tener que editar el monto de esa persona.
1. a las personas con campos incompletos marcarlos en rojo, y ubicarlos en cierta posicion 
2. si el usuario agrega personas con el mismo id, reemplazarlos por una sola entrada, cuyo monto es el total de los montos bajo ese id.
Si el monto de un eventual aumenta,  el usuario solo debe agregar una nueva entrada con el monto extra. 
La tabla resultante tendra una unica entrada con los datos de la persona, y un monto que representa la sumatoria de montos bajo el mismo id en la tabla inicial.

 

## Dependencias utilizadas
 - Next + typescript + eslint. Puede aprovechar Static site generation
 - Typescript me parecio esencial al trabajar con objetos.
 - Para diseño Material UI + emotion 
 - Image + sharp.  Optimizacion de imagenes, fonts.
 - Validacion Yup de datos en tabla ej: amount debe ser numero, no puede ser menor a 0. Es una herramienta muy util tambien en el caso de utilizarse backend
 - xlsx-js-style : Libreria xlsx con posibilidad de styling, permite convertir tabla a json, crear sheets,
 - notistack: notificaciones a usuario(paso validacion, no paso). Estaria bueno expandir para mensajes de error
 - lodash: funciones auxiliares  groupBy, sumBy
 
##Pendientes
 - y si el usuario pudiese elegir que busca chequear? 
 - Notificaciones con mensaje de error basados en validador 
 - Usuario puede generar propio mock desde app 
 - internationalization  
 - agregar funcionalidad PWA

 