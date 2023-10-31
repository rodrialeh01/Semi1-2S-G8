# 👥 SemiSocial

<div align="center"><img src="../images/SemiSocial_Logo3.png" width="300"/></div>

# Manual Técnico

## INDICE

- [👥 SemiSocial](#-semisocial)
- [Manual Técnico](#manual-técnico)
  - [INDICE](#indice)
  - [Introducción](#introducción)
  - [Objetivos](#objetivos)
    - [Objetivo General](#objetivo-general)
    - [Objetivos Específicos](#objetivos-específicos)
  - [Arquitectura del Proyecto](#arquitectura-del-proyecto)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Descripción de los Servicios de AWS](#descripción-de-los-servicios-de-aws)
    - [Amazon S3](#amazon-s3)
    - [Amazon Rekognition](#amazon-rekognition)
    - [Amazon Translate](#amazon-translate)
    - [Amazon Lex](#amazon-lex)
    - [Amazon Cógnito](#amazon-cógnito)
    - [Amazon EC2](#amazon-ec2)
    - [Amazon API Gateway](#amazon-api-gateway)
    - [Amazon Lambda](#amazon-lambda)
    - [IAM](#iam)
  - [Conclusiones](#conclusiones)

## Objetivos

### Objetivo General

### Objetivos Específicos
 1. Estructurar eficientemente el proyecto.
 2. Implementar servicios y APIs de AWS
 3. Crear una interfaz de usuario amigable y atractiva, fácil de utilizar proporioconando una buena experiencia al usuario.

## Arquitectura del Proyecto

![Arquitectura](./images/arquitectura.png)



## Estructura del Proyecto

#### NodeJS
<div align="center"><img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" width="100"/></div>

Para la realización de la API desarrollada en NodeJS se utilizó el framework de Express, el cual es un framework de NodeJS que permite la creación de API's de forma sencilla.

Tambien se utilizó la librería de Multer para poder subir archivos a S3, también se utilizo cognito y rekognition para la autenticación y reconocimiento facial de los usuarios, aws-jwt para la generación de tokens, aws-sdk para la conexión con los servicios de AWS como S3, Rekognition, Translate, API Gateway.

Para poder conectase a la base de datos se utilizó la librería de Mongoose, la cual es una librería de NodeJS que permite la conexión con MongoDB.

Para poder ejecutar el proyecto se debe ejecutar el siguiente comando:

```
npm run dev
```

Para esto se necesita tener instalado NodeJS y MongoDB; además de haber instalado las dependencias del proyecto que se encuentran en el archivo [`package.json`](../Server/package.json).

El código de la API se encuentra en la carpeta [`Server`](../Server/) en donde se encuentra la carpeta [`src`](../Server/src/) en donde se encuentra el código de la API.

Este proyecto se encuentra corriendo en un servidor EC2 en AWS en la zona de disponibilidad `us-east-1a`, a través de un contenedor de Docker en el puerto `4000`.


### React

<div align="center"><img src="images/react.png" width="200" height="200"/></div>

Para la realización del frontend, se utilizó la librería Javascript de código abierto denominada **React**. Para su utilización, se creó el entorno de desarrollo con _*Vite*_ de la siguiente manera:

```
npm create vite@latest [Nombre del Proyecto] --template react
```

y para su ejecución, se utilizó el comando:

```
npm run dev
```

El proyecto se estructuró de tal manera para su fácil configuración, edición y que a su vez se pudiera tener eficiencia en su desarrollo. Cabe mencionar que se utilizó **Tailwind CSS**, framework de código abierto de CSS, para la creación de los componentes y el diseño de la aplicación.





### Docker

<div align="center"><img src="images/docker.png" width="200" height="200"/></div>
Es una herramienta la cual automatiza el despliegue de aplicaciones dentro de contenedores de software, encapsulando solo las dependencias necesarias para poder ejecutar el proyecto.
<br><br>

Para poder utilizar esta herrmienta se instalo **Docker** en las maquinas virtuales. Despues se crearon los dockerfile para el frontend, backend y base de datos. Tambien se crearon dos docker compose, uno para la maquina virtual que tiene el backend y frontend, y el otro para el backend. 

Al instalar docker y registrarse, se debe ejecutar el siguiente comando para levantar los contenedores:

```
docker compose up
```

Para detener los contenedores se utliza el siguiente comando:

```
docker compose down
```

## Descripción de los Servicios de AWS
<div align="center"><img src="https://5.imimg.com/data5/SELLER/Default/2021/8/NP/YN/DN/3775979/aws-logo.png" width="200"/></div>

### Amazon S3

### Amazon Rekognition
<div align="center"><img src="images/rekog.png" width="166" height="200"/></div>

Amazon Rekognition es un servicio proporcionado por AWS, centrado en el análisis de imágenes y videos, el cual permite identificar objetos, personas, texto, escenas y actividades. Entre sus principales características se encuentran:
 - Actividad del rostro
 - Comparación y búsqueda de rostros
 - Detección y análisis de rostro
 - Moderación de contenido
 - Etiquetas personalizadas
 - Detección de texto
 - Etiquetas
 - Detección de celebridades
 - Detección de segmentos de video

En el caso de Semisocial, se utilizó para dos casos:
<br>

 - **Detección de rostros:** Se implementó el servicio en el login para el reconocimiento facial de los usuarios, con el fin de poder validar su identidad y así poder acceder a la aplicación.

 - **Etiquetas:** Se implementó el servicio en la sección de publicaciones, con el fin de poder obtener una lista de etiquetas de las imágenes publicadas y luego poder filtrar estas.

### Amazon Translate

<div align="center"><img src="images/Translate.png" width="200" height="200"/></div>

Amazon Translate es un servicio de traducción automática neural que ofrece traducciones de idiomas de alta calidad y a bajo costo a escala. Amazon Translate permite a las organizaciones comunicarse de manera más efectiva y alcanzar a más clientes en todo el mundo.

En el caso de Semisocial, se utilizó para dos casos:
<br>

 - **Traducción de texto:** Se implementó el servicio en la sección de publicaciones y comentarios, con el fin de poder traducir los textos de las publicaciones a los idiomas que el usuario desee, entre ellos: español, inglés, italiano y francés.

 - **Traducción con el bot:** Se implementó el servicio en el bot, con el fin de poder traducir los textos que el usuario envíe al bot a los idiomas que el usuario desee, entre ellos: español, inglés, italiano y francés.

### Amazon Lex

<div align="center"><img src="images/lex.svg" width="200" height="200"/></div>


Amazon Lex es un servicio para crear interfaces de conversación en cualquier aplicación utilizando voz y texto. Amazon Lex proporciona las mismas tecnologías de aprendizaje profundo que Amazon Alexa, para que pueda crear fácilmente interfaces de conversación para sus propios chatbots o aplicaciones de voz. 

En el caso de Semisocial, se utilizó para crear un bot que permita a los usuarios interactuar con la aplicación, con el fin de poder consultar información de la aplicación, como por ejemplo: información de la red de cursos de la Facultad de Ingeniería de la Universidad de San Carlos de Guatemala, información de los horarios de los cursos de la carrera de Ingeniería en Sistemas, preguntas y frecuentes y ayuda para traducir textos.

### Amazon Cógnito

### Amazon EC2

### Amazon API Gateway

<div align="center"><img src="images/api_gateway.jpeg" width="200" height="200"/></div>

Esta crea API RESTFUL la cual se basa en http implementando metodos estandar (GET, POST, PUT, PATCH y DELETE), tambien habilitan la comunicacion entre cliente servidor. Se utilizo **API Gateway** para poder establecer una comunicacion con Amazon Lambda.

Proporciona varias caracteristicas como el ruteo y transformacion de solicitudes, control de acceso, monitoreo y analisis, gestion de versiones, optimizacion del rendimiento, entre otros. 
 
### Amazon Lambda

<div align="center"><img src="images/lambda.png" width="200" height="200"/></div>

Es un servicio de computación en la nube ofrecido por Amazon Web Services (AWS) que permite a los desarrolladores ejecutar código en respuesta a ciertos eventos sin necesidad de provisionar o administrar servidores, lo que lo convierte en una oferta de computación sin servidor.

Amazon Lambda ayuda a los desarrolladores a construir aplicaciones más rápidamente y les permite innovar y responder rápidamente a los cambios en el entorno empresarial sin preocuparse por la infraestructura subyacente.

### IAM

## Conclusiones
1. Con una estructuración del proyecto de manera eficiente, se logró tener un mejor control de los archivos y una mejor organización de los mismos. Esto permitió que el desarrollo del proyecto fuera más rapido por parte de los integrantes y que se pudiera tener un mejor control de los cambios realizados, dando resultado a la facilitación en navegación y edición del proyecto, así como también a la reducción, prevención y corrección de errores que surgieron durante el desarrollo de este.

2. Al trabajar con servicios de AWS se pueden observar las ventajes que tienen al implementarlas en el proyecto, asi como la reduccion de carga operativa (Lambda), la escalabilidad automatica para manejar el trafico y la demanda (API Gateway), gestion de identidad y acceso (Cognito), reconocimiento de imagenes (Rekognition), entre otros. Estas ventajas conducen a una mayor eficiencia, entrega rapida, reduccion de costos operativos y poder responder a los cambios en cualquier momento.

3. El diseño de la interfaz se centró en la estética y la facilidad de uso, lo que permitió que los usuarios pudieran utilizar la aplicación de manera intuitiva y sin complicaciones. Además, se utilizó una paleta de colores que permitiera una mejor visualización de la aplicación y que fuera agradable a la vista del usuario.