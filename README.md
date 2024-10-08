# Proyecto de Generación de Remitos - Formularia

Este proyecto es una aplicación web que permite generar remitos de manera eficiente. Los usuarios pueden ingresar datos del destinatario, detalles del artículo y datos del transportista para generar un remito en formato PDF. El proyecto utiliza Firebase Firestore para almacenar la numeración única y secuencial de los remitos, asegurando que no se pierdan números entre sesiones.

## Características

- **Autenticación**: La aplicación utiliza Firebase Authentication para el manejo de usuarios. Al iniciar sesión, se almacena la información del usuario en `localStorage` para mantener la sesión activa.
- **Generación de PDF**: Usando `jsPDF`, la aplicación permite generar remitos en formato PDF que incluyen los datos del destinatario, artículos y transportista.
- **Persistencia de datos**: El número de remito es único y se guarda en Firestore para garantizar que no haya duplicados, incluso después de cerrar la sesión.
- **Sistema de pasos**: La creación de remitos se gestiona mediante un sistema de pasos (Step) que guía al usuario a través de la entrada de información.

## Tecnologías Utilizadas

- **React.js**: Librería principal utilizada para el desarrollo del frontend.
- **Firebase Firestore**: Base de datos NoSQL utilizada para almacenar la numeración de remitos.
- **Firebase Authentication**: Gestión de usuarios y autenticación.
- **jsPDF**: Librería usada para la creación y descarga de PDFs.
- **Material-UI**: Biblioteca para el diseño de la interfaz.

## Requisitos

Antes de comenzar, asegúrate de tener los siguientes requisitos instalados en tu máquina:

- Node.js
- npm o yarn

## Instalación

Sigue los pasos a continuación para instalar y ejecutar el proyecto localmente:

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git


2. Instala las dependencias:

npm install

3. Configura Firebase:

rea un proyecto en Firebase y habilita Firestore y Authentication.
Crea un archivo .env en la raíz del proyecto y añade tus credenciales de Firebase:

REACT_APP_FIREBASE_API_KEY=tu-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=tu-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
REACT_APP_FIREBASE_APP_ID=tu-app-id

4. Inicia el servidor local:

npm start

La aplicación estará disponible en http://localhost:3000.


## Despliegue
Para desplegar la aplicación en un subdominio (por ejemplo, en Hostinger):

Genera una versión optimizada del proyecto:

npm run build
