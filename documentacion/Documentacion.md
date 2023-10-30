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

## Arquitectura del Proyecto

![Arquitectura](./images/arquitectura.png)

## Estructura del Proyecto

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

### Amazon Lex

### Amazon Cógnito

### Amazon EC2

### Amazon API Gateway

### Amazon Lambda

### IAM

## Conclusiones
1. Con una estructuración del proyecto de manera eficiente, se logró tener un mejor control de los archivos y una mejor organización de los mismos. Esto permitió que el desarrollo del proyecto fuera más rapido por parte de los integrantes y que se pudiera tener un mejor control de los cambios realizados, dando resultado a la facilitación en navegación y edición del proyecto, así como también a la reducción, prevención y corrección de errores que surgieron durante el desarrollo de este.