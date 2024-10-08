# Para clonar 
-git clone https://github.com/Mateosz12/EnerbitRetoWeb.git

# URL 
https://demos.devexpress.com/rwa/dxhotels/Default.aspx

# Proyecto de Pruebas Automatizadas

## Docker
1. **Crear DockerFile**:
```bash
  FROM jenkins/jenkins:lts-jdk17

USER root
RUN curl -ssl https://get.docker.com/ | sh
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs
RUN npx playwright install --with-deps
# Instalar PowerShell
RUN apt-get update && \
    apt-get install -y wget apt-transport-https software-properties-common && \
    wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && \
    apt-get update && \
    apt-get install -y powershell

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY . .
USER jenkins
   ```
2. **Construir la imagen**:
   ```bash
   docker build --tag docker-in-docker-jenkins .

   ```
3. **Ejecutar el contenedor**:
   ```bash
   docker run --rm --group-add 0 -v "//var/run/docker.sock:/var/run/docker.sock" -p 8080:8080 -v jenkins_home:/var/jenkins_home --name jenkins docker-in-docker-jenkins
   ```

## Jenkins
1. **Configurar Jenkins**:
   - Asegúrate de tener Jenkins configurado para ejecutar pipelines.
   - instalar pluggis HTML Publisher, Docker, docker pipeline
   - Crea un pipeline nuevo y vincúlalo a este repositorio. 
   - Ejecuta el pipeline para ver los resultados de las pruebas.
   - Adicional para ver el reporte debemos poner esta linea en "admistrar jenkins" -> "consola de script" y ejecuar
     : System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "") 


# Estructura

La estructura definida es basada en Screenplay
dentro de cada carpeta tenemos definido otras 2 mas 1 para las pruebas del Hotel y otra para las pruebas de saucedemo

- src
   - model
   - resourses
   - tasks
   - utils
- test
   - hotel
   - saucedemo
  

# Automatización de Pruebas para Reserva de Hotel DXHotels

Este repositorio contiene la automatización de pruebas para una aplicación web de reservas de hotel. A continuación, se detallan los escenarios automatizados y cómo se abordaron los defectos encontrados.

## Escenarios Automatizados

### 1. Login Exitoso y Fallido
Se evidencia que la pagina DXHotels presenta inconvenientes para su automatización como el capchat, no presenta un registro de usuario para posteriormente hacer login
y en cuanto al mal funcionamiento que presenta el inicio de sesion en general  se procede a automatizar la reserva con los diferentes filtros.

Para que esto no sea un impedimento, en el mismo proyecto hay uno paralelo que es la automatización de la pagina web 'https://www.saucedemo.com/v1/'.
Allí se validaron varios escenarios, tanto de inicio de sesion exitoso y no exitoso, ademas de una prueba E2E hasta el pago y comparación de precios de los elementos seleccionados.

### 2. Reservación de Hotel
Descripción: Se automatiza la reserva de un hotel con filtros específicos.
Pasos:
- Fecha de check-in: 2 días a partir de la fecha actual.
- Fecha de check-out: 7 días a partir de la fecha actual.
- Número de habitaciones: 2.
- Número de adultos: 3.
- Número de niños: 2.
- Rango de precio: superior a $200 USD.
- Número de estrellas: 3 o más.
- Aplicar los filtros seleccionados.
- Seleccionar el hotel más económico que cumpla con los filtros
establecidos.

## Defectos Encontrados
### Funcionalidad de Login
Defecto: La funcionalidad de inicio de sesión no funciona correctamente.
Al intentar loguearme en la web, observamos que dicha funcionalidad no permite hacer el loguin de manera exitosa, aun ingresando credenciales validas.

### Funcionalidad Reserva de Hotel
- Defecto 1. : No permite hacer la reserva ya que pide pide loguarse, pero esa funcionalidad presenta no funciona correctamente.
- Defecto 2. : No existe un boton "Reservar", y por este defecto y los anteriores mencionados, no se visualizara un mensaje de reserva exitosa.

Como (QA), abordaría estos errores de la siguiente manera:

## Funcionalidad de inicio de sesión no funcional:
- Primero, verificaría si el problema es específico de la automatización o si también ocurre manualmente. Si es un problema general,
- Revisaría el flujo de inicio de sesión en la automatización. ¿Está utilizando credenciales válidas? ¿Hay algún problema con la interacción de la interfaz de usuario?
- Si es posible, intentaría acceder directamente a la API de inicio de sesión verificaría si el inicio de sesion está funcionando de manera correcta y es funcionalidad meramente web.
- Documentaría el problema detalladamente y lo reportaría,informaría por medio de un jira tipo bug al equipo de desarrollo para que lo solucionen.


## Filtro de reserva no funciona y falta el botón de reserva:

- Respecto al botón de reserva faltante, revisaría el código fuente o la estructura de la página para asegurarme de que el elemento esté presente y accesible.
- Si el botón está ausente, informaría al equipo de desarrollo para que lo agreguen, como tambien un mensaje de reserva exitosa
- Documentaría estos errores y los reportaría en un jira para su corrección o mejora.


## Para Ejecutar las pruebas de ambos proyectos :

 1. Primero ejecuta el comando en la terminal para cargar las variables de entorno
     ```javascript
     .\env.ps1 

     ```
     NOTA: adicional si te falla es posible que se deban instalar los paquetes de Faker js npm install @faker-js/faker --save-dev  y  Date fns npm install date-fns --save
 2. Para ejecutar las pruebas, utiliza el siguiente comando:
     ```javascript
      npx playwright test 

    ```
2. Ejecucion modo visual:

    ```javascript
      npx playwright test --ui

    ```
3. ejecutar prueba especifica.
   ```javascript
     npx playwright test addCart.spec.ts | npx playwright test reservationHotel.spec.ts | login.espec.ts
