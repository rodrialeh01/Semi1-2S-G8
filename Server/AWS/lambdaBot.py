import json
import boto3
translate_client = boto3.client('translate')

def lambda_handler(event, context):
    # Obtiene el código del curso desde el evento de Amazon Lex
    slots = event['sessionState']['intent']['slots']
    intent = event['sessionState']['intent']['name']

    # Realiza la lógica para buscar la información del curso en una base de datos o estructura de datos
    if intent == "Horarios":
        codigo_curso = event['sessionState']['intent']['slots']['Curso']['value']['originalValue']
        respuesta = obtener_informacion_del_curso(codigo_curso)
    elif intent == "Redes":
        codigo_semestre = event['sessionState']['intent']['slots']['Semestre']['value']['originalValue']
        codigo_carrera = event['sessionState']['intent']['slots']['Carrera']['value']['originalValue']
        respuesta = obtener_informacion_del_semestre(codigo_semestre,codigo_carrera)
    elif intent == "NuevoIngreso":
        numero_Pregunta = event['sessionState']['intent']['slots']['PreguntaNuevo']['value']['originalValue']
        respuesta = obtener_informacion_de_Nuevo_Ingreso(numero_Pregunta)
    elif intent == "DudasGenerales":
        numero_Pregunta = event['sessionState']['intent']['slots']['NumPreguntaDudaG']['value']['originalValue']
        respuesta = obtener_informacion_de_Dudas_Generales(numero_Pregunta)
    elif intent == "Reingreso":
        numero_Pregunta = event['sessionState']['intent']['slots']['numeroReingreso']['value']['originalValue']
        respuesta = obtener_informacion_de_Reingreso(numero_Pregunta)
    elif intent == "Traductor":
        lenguaje = event['sessionState']['intent']['slots']['languageSlot']['value']['originalValue']
        texto = event['sessionState']['intent']['slots']['textoTraducir']['value']['originalValue']
        respuesta = obtener_traduccion(lenguaje,texto)
    



    return {
            "sessionState": {
                "dialogAction": {
                    "type": "Close"
                },
                "intent": {
                    "name": intent,
                    "slots": slots,
                    "state": "Fulfilled"
                }
            },
            "messages": [
                {
                    "contentType": "PlainText",
                    "content": respuesta
                }
            ]
        }

def obtener_informacion_del_curso(codigo_curso):
    
    cursos = {
        "348": "Química General 1 se imparte lunes, martes, miércoles y viernes: Sección A+: 09:50 a 10:40 Sección A-: 09:50 a 10:40 Sección B: 10:40 a 11:30 Sección C: 07:10 a 08:00 Sección F: 08:00 a 08:50 Sección J+: 10:40 a 11:30 Sección J-: 10:40 a 11:30 Sección K: 11:30 a 12:20 Sección L: 08:00 a 08:50 Sección P+: 14:00 a 14:50 Sección P-: 14:00 a 14:50 Sección R: 17:20 a 18:10 Sección S: 16:30 a 17:20",
        "101": "Matemática Básica 1 se imparte lunes, martes, miércoles y viernes: Sección A: 07:10 a 08:50 Sección B: 07:10 a 08:50 Sección F: 09:00 a 10:40 Sección G: 09:00 a 10:40 Sección J: 09:00 a 10:40 Sección K: 09:00 a 10:40 Sección N: 14:50 a 16:30 Sección P: 14:50 a 16:30 Sección U: 18:10 a 19:50",
        "17" : "Social Humanística 1 en la sección H se imparte de 9:00 a 9:50 Lunes, Martes, Miércoles y Viernes.",
        "69" : "Técnica Complementaria si imparte 1 se imparte lunes: 'A': 07:10 a 08:50; 'C': 09:00 a 10:40; 'P': 17:20 a 19:00. Martes: 'B': 07:10 a 08:50; 'E': 10:40 a 12:20; 'I': 09:00 a 10:40; 'N': 17:20 a 19:00. Miércoles: 'F': 10:40 a 12:20; 'M': 07:10 a 08:50; 'Q': 17:20 a 19:00. Jueves: 'G': 07:10 a 08:50; 'H': 10:40 a 12:20",
        "19" : "Social Humanística 2 se imparte lunes, martes, miércoles y viernes: Sección A: 07:10 a 08:00, Sección C: 08:00 a 08:50, Sección D: 08:00 a 08:50, Sección E: 09:00 a 09:50, Sección F: 09:00 a 09:50, Sección G: 09:50 a 10:40, Sección H: 09:50 a 10:40, Sección I: 13:10 a 14:00, Sección J: 10:40 a 11:30, Sección K: 10:40 a 11:30, Sección L: 11:30 a 12:20, Sección M: 07:10 a 08:00, Sección N: 13:10 a 14:00, Sección P: 14:00 a 14:50, Sección X: 10:40 a 11:30, Sección Y: 13:10 a 14:00",
        "103": "Matemática Básica 2 se imparte lunes, martes, miércoles y viernes: A: 07:10-08:50, B: 07:10-08:50, C: 07:10-08:50, D: 07:10-08:50, E: 09:00-10:40, F: 09:00-10:40, G: 09:00-10:40, H: 09:00-10:40, I: 09:00-10:40, J: 09:00-10:40, K: 07:10-08:50, L: 07:10-08:50, M: 13:10-14:50, N: 14:50-16:30, P: 14:50-16:30, S: 19:00-20:40",
        "5" : "Técnicas de Estudio e Investigación se imparte los lunes: Sección O: 15:40 a 17:20. Lunes y Miércoles: Sección A: 08:00 a 08:50; Sección H: 11:30 a 12:20. Martes: Sección N: 13:10 a 14:50 Sección P: 17:20 a 19:00 Sección R: 19:00 a 20:40. Martes y Jueves: Sección B: 09:00 a 09:50 Sección C: 09:00 a 09:50 Sección D: 09:50 a 10:40 Sección F: 11:30 a 12:20 Sección Q: 17:20 a 18:10",
        "147": "Física Básica se imparte Lunes, Martes, Miércoles y jueves: Sección A+: 07:10 a 08:00, A-: 07:10 a 08:00, B+: 08:00 a 08:50, B-: 08:00 a 08:50, C+: 09:00 a 09:50, C-: 09:00 a 09:50, E1: 11:30 a 12:20, E2: 11:30 a 12:20, E3: 11:30 a 12:20, F1: 12:20 a 13:10, F2: 12:20 a 13:10, F3: 12:20 a 13:10, F4: 12:20 a 13:10, N1: 13:10 a 14:00, N2: 13:10 a 14:00, N3: 13:10 a 14:00, P+: 14:00 a 14:50, P-: 14:00 a 14:50, R: 15:40 a 16:30",
        "796": "Lenguajes Formales y de Programación se imparte los martes: A+: 07:10 a 08:50, A-: 07:10 a 08:50, B+: 07:10 a 08:50, B-: 07:10 a 08:50",
        "960": "Matemática para Computación 1 se imparte lunes, miércoles y viernes: A: 10:40-11:30, B: 11:30-12:20, M: 13:10-14:00, N: 14:50-15:40",
        "770": "Introducción a la Programación y Computación 1: Lunes y Miércoles: F: 11:30-13:10. Martes y Jueves: A: 07:10-08:50, B: 07:10-08:50, C: 07:10-08:50, D: 07:10-08:50, E: 07:10-08:50, G: 07:10-08:50.",
        "107": "Matemática Intermedia 1 se imparte lunes, martes, miércoles y viernes: A: 09:00-10:40, B: 09:00-10:40, C: 09:00-10:40, D: 09:00-10:40, E: 09:00-10:40, F: 09:00-10:40, G: 09:00-10:40, H: 07:10-08:50, I: 10:40-12:20, J: 12:20-14:00, N: 14:50-16:30, Q: 18:10-19:50.",
        "150": "Física 1 se imparte lunes, miércoles, jueves y viernes: A: 07:10-08:00, B: 08:00-08:50, C+: 09:00-09:50, C-: 09:00-09:50, E+: 10:40-11:30, E-: 10:40-11:30, F: 12:20-13:10, N: 13:10-14:00, P+: 14:00-14:50, P-: 14:00-14:50, Q+: 14:50-15:40, Q-: 14:50-15:40, R+: 16:30-17:20, R-: 16:30-17:20, S+: 17:20-18:10, S-: 17:20-18:10, V: 18:10-19:00",
        "732": "Estadística 1 se imparte de lunes a jueves: A+: 08:00-08:50, A-: 08:00-08:50, B: 09:00-09:50, C+: 10:40-11:30, C-: 10:40-11:30, D+: 11:30-12:20, D-: 11:30-12:20, N: 14:00-14:50, P: 14:50-15:40, Q: 15:40-16:30, R: 16:30-17:20, S: 17:20-18:10, T: 18:10-19:00",
        "795": "Lógica de Sistemas se imparte Jueves: C: 12:20-14:50. Martes: B: 12:20-14:50. Sábado: A: 08:00-10:30",
        "962": "Matemática para Computación 2 se imparte lunes, miércoles y viernes: A: 10:40-11:30, N: 15:40-16:30, P: 17:20-18:10",
        "771": "Introducción a la Programación y Computación 2: jueves y viernes: A: 07:10-08:50, B: 07:10-08:50, C: 07:10-08:50, D: 07:10-08:50, N: 17:20-19:00",
        "112": "Matemática Intermedia 2 se imparte lunes, martes, miércoles y viernes: A: 09:00-09:50, B: 09:00-09:50, C: 09:00-09:50, D: 09:00-09:50, E: 09:00-09:50, F: 09:00-09:50, G: 08:00-08:50, M: 14:00-14:50, N: 14:50-15:40, P: 15:40-16:30, Q: 14:50-15:40, R: 17:20-18:10",
        "114": "Matemática Intermedia 3 se imparte lunes, martes, miércoles y viernes: A: 09:50-10:40, B: 09:50-10:40, C: 09:50-10:40, D: 09:50-10:40, E: 09:50-10:40, F: 09:50-10:40, G: 07:10-08:00, H: 12:20-13:10, M: 14:50-15:40, N: 15:40-16:30, P: 15:40-16:30, Q: 16:30-17:20, R: 18:10-19:00",
        "152": "Física 2 se imparte lunes, martes, miércoles y viernes: A: 07:10-08:00, B+: 10:40-11:30, B-: 10:40-11:30, C: 12:20-13:10, N+: 14:00-14:50, N-: 14:00-14:50, P: 14:50-15:40, Q+: 16:30-17:20, Q-: 16:30-17:20, R: 18:10-19:00",
        "2025": "Prácticas Iniciales se imparte los jueves: A+: 09:00-10:40, A-: 09:00-10:40, B+: 09:00-10:40, B-: 09:00-10:40, C: 09:00-10:40, D+: 09:00-10:40, D-: 09:00-10:40, E: 09:50-11:30, F+: 10:40-12:20, F-: 10:40-12:20, M: 13:10-14:50, N: 14:00-15:40, P: 14:00-15:40, Q: 17:20-19:00, R: 17:20-19:00, S: 18:10-19:50",
        "736": "Análisis Probabilístico se imparte de lunes a jueves: A: 09:50-10:40, N: 15:40-16:30",
        "777": "Organización de Lenguajes y Compiladores 1 se imparte martes y jueves: B: 07:10-08:50, C: 07:10-08:50, N: 17:20-19:00",
        "964": "Organización Computacional martes y jueves: A: 09:00-10:40, B: 12:20-14:00",
        "772": "Estructura de Datos: Miércoles y Viernes: A: 07:10-08:50. Miércoles y Sábado: B: 07:10-08:50. Viernes: 07:10-10:30",
        "116": "Matemática Aplicada 3 se imparte lunes, miércoles y viernes: A: 09:00-09:50, B: 09:00-09:50, C: 08:00-08:50, N: 14:00-14:50, P: 14:50-15:40, Q: 16:30-17:20, R: 17:20-18:10",
        "118": "Matemática Aplicada 1 se imparte lunes, miércoles y viernes: 09:50-10:40, B: 09:50-10:40, C: 08:00-08:50, N: 16:30-17:20, O: 15:40-16:30, P: 19:00-19:50, Q: 18:10-19:00, R: 17:20-18:10",
        "722": "Teoría de Sistemas 1 se imparte en la sección A los jueves y sábado: 07:10-08:50",
        "601": "Investigación de Operaciones 1 se imparte lunes, miércoles y viernes: A+: 10:40-11:30, A-: 10:40-11:30, N: 19:00-19:50, O: 16:30-17:20, P: 19:50-20:40",
        "14": "Economía 1 se imparte el sábado: A+: 10:30-12:10, A-: 10:30-12:10",
        "781": "Organización de Lenguajes y Compiladores 2 se imparte martes: B: 07:10-10:30. Lunes: A: 07:10-08:50 y Sábado: A: 07:10-10:30",
        "778": "Arquitectura de Computadores y Ensambladores 1: Martes y Jueves: A (10:40-12:20), B (Sábado: 08:50-10:30, Jueves: 17:20-19:00)",
        "773": "Manejo e Implementación de Archivos: Martes y Miércoles: A (07:10-08:50), B (07:10-08:50). Martes y Jueves:  C (11:30-12:20), N (19:00-20:40)",
        "724": "Teoría de Sistemas 2 se imparte en la sección A los martes (07:10-08:50) y sábado (08:50-10:30)",
        "603": "Investigación de Operaciones 2 se imparte lunes, miércoles y viernes: A+ (09:50-10:40), A- (09:50-10:40), N (18:10-19:00), P (19:00-19:50)",
        "281": "Sistemas Operativos I 'N': Lunes y Miércoles de 17:20 a 19:00",
        "779": "Arquitectura de Computadores y Ensambladores 2: N: Sábado(10:30-12:10) y Lunes (10:40-12:20). Lunes y Miércoles: P (19:00-20:40)",
        "970": "Redes de Computadoras 1: N: Sábado (13:50-17:10). O: Martes (17:20-19:00) y Viernes (19:00-20:40)",
        "774": "Sistemas de Bases de Datos 1: A: Miércoles (07:10-10:30). N: Jueves(19:00-20:40) y Sábado (07:10-08:50)",
        "2036": "Prácticas Intermedias: Miércoles:  B (10:40-12:20). Viernes: D (10:40-12:20)",
        "285": "Sistemas Operativos 2: A: Lunes (07:10-08:50) y Jueves (10:30-12:10). O: Martes (09:00-10:40)",
        "975": "Redes de Computadoras 2: A: Lunes y Jueves (17:20-19:00)",
        "775": "Sistemas de Bases de Datos 2: Miércoles y Sábado: A (07:10-08:50), B (07:10-08:50)",
        "283": "Análisis y Diseño de Sistemas 1: Martes y Jueves: A (07:10-08:50). Sábado: B (07:10-10:30)",
        "797": "Seminario de Sistemas I se imparte los viernes: Sección A (07:10-08:50), Sección B (07:10-08:50)",
        "729": "Modelación y Simulación 1 se imparte los Miércoles y Viernes: A (07:10-08:50). Lunes y Jueves: N (19:00-20:40)",
        "786": "Sistemas Organizacionales y Gerenciales 1 se imparte los martes y jueves: N (19:00-20:40)",
        "792": "Inteligencia Artificial 1 se imparte los lunes: A (07:10-10:30)",
        "785": "Análisis y Diseño de Sistemas 2 se impartes lunas y miércoles: N (19:00-20:40), O (19:00-20:40)",
        "798": "Seminario de Sistemas 2 se imparte los jueves: A (09:00-12:20)",
        "2009": "Prácticas Finales se imparte los miércoles: C (20:40-21:30)",
        "787": "Sistemas Organizacionales y Gerenciales 2 se imparte los martes y jueves: N (19:00-20:40). Martes: A (09:00-12:20)",
        "720": "Modelación y Simulación 2 se imparte los lunes y miércoles: A (19:00-20:40)",
        "780": "Software Avanzado se imparte los martes y jueves: A (07:10-08:50). Lunes y Miércoles: N (19:00-20:40)",
        "799": "Seminario de Investigación se imparte los miércoles: A (07:10-08:50), B (07:10-08:50), C (07:10-08:50)",

    }

    # Verifica si el código de curso existe en la base de datos ficticia
    if codigo_curso in cursos:
        return cursos[codigo_curso]
    else:
        return "Lo siento, no se encontró información para el código de curso proporcionado."

def obtener_informacion_del_semestre(codigo_semestre,codigo_carrera):
    if codigo_carrera == "1":
        semestres = {
            "1": "Primer Semestre de Ingeniería Cívil tiene Técnicas de Estudio e Investigación, Social Humanística 1, Matemática Básica 1, Química General 1, Técnica Complementaria 1",
            "2": "Segundo Semestre de Ingeniería Cívil tiene Social Humanística 2, Matemática Básica 2, Física Básica, Química para Ingeniería Ciil, Dibujo Constructivo para Ingeniería",
            "3": "Tercer Semestre de Ingeniería Cívil tiene Matemática Intermedia 1, Física 1, Ecología, Prácticas Iniciales",
            "4": "Cuarto Semestre de Ingeniería Cívil tiene Topografía 1, Matemática Intermedia 2, Matemática Intermedia 3, Mecánica Analítica 1, Estadística 1, Geología",
            "5": "En el quinto semestre de Ingeniería Civil, los cursos son Topografía 2, Resistencia de Materiales 1, Materiales de Construcción 1, Mecánica de Fluidos y Matemática Aplicada 1.",
            "6": "En el sexto semestre de Ingeniería Civil, los cursos son Resistencia de Materiales 2, Instalaciones Eléctricas (Civil), Materiales de Construcción 2, Mecánica de Suelos 1, Hidráulica y Ingeniería Económica 1.",
            "7": "En el séptimo semestre de Ingeniería Civil, los cursos son Vías Terrestres 1, Análisis Estructural, Concreto Armado 1, Hidrología, Hidráulica de Canales y Prácticas Intermedias.",
            "8": "En el octavo semestre de Ingeniería Civil, los cursos son Vías Terrestres 2, Concreto Armado 2, Cimentaciones 1, Introducción al Estudio de Impacto Ambiental, Ingeniería Sanitaria 1, Ingeniería Sanitaria 2 e Investigación 1.",
            "9": "En el noveno semestre de Ingeniería Civil, los cursos son Pavimentos, Diseño Estructural 1, Cimentaciones 2, Preparación y Evaluación de Proyectos 1 y Saneamiento Ambiental.",
            "10": "En el décimo semestre de Ingeniería Civil, los cursos son Puentes, Diseño Estructural 2, Métodos de Construcción y Supervisión de Obras, Planeamiento, Costos, Presupuestos y Avalúos, Práctica Final, Seminario de Investigación de EPS y Seminario de Investigación Civil."
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    elif codigo_carrera == "2":
        semestres = {
            "1": "Primer Semestre de Ingeniería Química tiene Química 3, Social Humanística 1, Técnica Complementaria 1, Matemática Básica 1",
            "2": "Segundo Semestre de Ingeniería Química tiene Química 4, Técnicas de Estudio e Investigación, Social Humanística 2, Matemática Básica 2, Física Básica",
            "3": "Tercer Semestre de Ingeniería Química tiene Análisis Cualitativo 1, Matemática Intermedia 1, Física 1, Prácticas Iniciales",
            "4": "Cuarto Semestre de Ingeniería Química tiene Química Orgánica 1, Análisis Cuantitativo, Matemática Intermedia 2, Matemática Intermedia 3, Física 2, Estadística 1",
            "5": "Quinto Semestre de Ingeniería Química tiene Química Orgánica 2, Balance de Masa y Energía, Físico Química 1, Programación de Computadoras 1, Ecología, Matemática Aplicada 1, Matemática Aplicada 3, Ingeniería Económica 1, Ingeniería Eléctrica 1",
            "6": "Sexto Semestre de Ingeniería Química tiene Química Ambiental, Flujo de Fluidos (IQ-2), Microbiología, Físico Química 2, Laboratorio de Físico Química 1, Ingeniería Eléctrica 2",
            "7": "Séptimo Semestre de Ingeniería Química tiene Transferencia de Calor (IQ-3), Ingeniería de la Producción, Laboratorio de Físico Química 2, Termodinámica 3, Administración de Empresas 1, Prácticas Intermedias",
            "8": "Octavo Semestre de Ingeniería Química tiene Laboratorio de Ingeniería Química 1, Transferencia de Masa (IQ-4), Termodinámica 4",
            "9": "Noveno Semestre de Ingeniería Química tiene Laboratorio de Ingeniería Química 2, Transferencia de Masa en Unidades Continuas (IQ-5), Ingeniería Económica 3, Cinética de Procesos Químicos, Seminario de Investigación, Seminario de Investigación de EPS, Práctica Final Ingeniería Química",
            "10": "Décimo Semestre de Ingeniería Química tiene Procesos Químicos Industriales, Diseño de Equipo"
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    elif codigo_carrera == "3":
        semestres = {
            "1": "Primer Semestre de Ingeniería Mecánica tiene Social Humanística 1, Matemática Básica 1, Técnica Complementaria 1, Química General 1",
            "2": "Segundo Semestre de Ingeniería Mecánica tiene Social Humanística 2, Matemática Básica 2, Física Básica, Técnicas de Estudio e Investigación",
            "3": "Tercer Semestre de Ingeniería Mecánica tiene Matemática Intermedia 1, Física 1, Prácticas Iniciales",
            "4": "Cuarto Semestre de Ingeniería Mecánica tiene Mecánica Analítica 1, Matemática Intermedia 2, Matemática Intermedia 3, Física 2, Estadística 1",
            "5": "Sexto Semestre de Ingeniería Mecánica tiene Dibujo Técnico Mecánico, Mecánica de Fluidos, Mecánica Analítica 2, Matemática Aplicada 3, Ecología.",
            "6": "Quinto Semestre de Ingeniería Mecánica tiene Ingeniería Eléctrica 1, Termodinámica 1, Resistencia de Materiales 1, Ciencia de los Materiales, Programación de Computadoras 1, Legislación 1",
            "7": "Séptimo Semestre de Ingeniería Mecánica tiene Ingeniería Eléctrica 2, Administración de Empresas 1, Termodinámica 2, Resistencia de Materiales 2, Procesos de Manufactura 1, Prácticas Intermedias",
            "8": "Octavo Semestre de Ingeniería Mecánica tiene Diseño de Máquinas 1, Hidráulica, Plantas de Vapor, Metalurgia y Metalografía, Procesos de Manufactura 2",
            "9": "Noveno Semestre de Ingeniería Mecánica tiene Máquinas Hidráulicas, Montaje y Mantenimiento de Equipo, Mecanismos, Diseño de Máquinas 2, Refrigeración y Aire Acondicionado, Seminario de Investigación, Seminario de Investigación de EPS, Práctica Final",
            "10": "Décimo Semestre de Ingeniería Mecánica tiene Instrumentación Mecánica, Instalaciones Mecánicas, Vibraciones, Diseño de Máquinas 3, Motores de Combustión Interna"
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    elif codigo_carrera == "4":
        semestres = {
            "1": "Primer Semestre de Ingeniería Eléctrica tiene Social Humanística 1, Técnica Complementaria 1, Química General 1, Matemática Básica 1",
            "2": "Segundo Semestre de Ingeniería Eléctrica tiene Social Humanística 2, Técnicas de Estudio e Investigación, Introducción a la Programación de Computadoras, Matemática Básica 2, Física Básica",
            "3": "Tercer Semestre de Ingeniería Eléctrica tiene Lenguajes de Programación Aplicados a Ingeniería Eléctrica, Matemática Intermedia 1, Física 1, Prácticas Iniciales",
            "4": "Cuarto Semestre de Ingeniería Eléctrica tiene Estadística 1, Matemática Intermedia 2, Matemática Intermedia 3, Física 2",
            "5": "Quinto Semestre de Ingeniería Eléctrica tiene Circuitos Eléctricos 1, Análisis Probabilístico, Matemática Aplicada 5, Matemática Aplicada 1, Física 3",
            "6": "Sexto Semestre de Ingeniería Eléctrica tiene Teoría Electromagnética 1, Electricidad y Electrónica Básica, Circuitos Eléctricos 2, Física 4",
            "7": "Séptimo Semestre de Ingeniería Eléctrica tiene Líneas de Transmisión, Conversión de Energía Electromecánica 1, Instrumentación Eléctrica, Electrónica 1, Mecánica Analítica 1, Prácticas Intermedias",
            "8": "Octavo Semestre de Ingeniería Eléctrica tiene Transmisión y Distribución, Sistemas de Control 1, Conversión de Energía Electromecánica 2, Máquinas Eléctricas, Ingeniería Económica 1",
            "9": "Noveno Semestre de Ingeniería Eléctrica tiene Análisis de Sistemas de Potencia 1, Alta Tensión, Seminario de Investigación, Seminario de Investigación de EPS, Electrónica 3, Instalaciones Eléctricas, Administración de Empresas 1, Práctica Final",
            "10": "Décimo Semestre de Ingeniería Eléctrica tiene Sistemas de Generación, Automatización Industrial, Subestaciones, Protección de Sistemas de Potencia, Preparación y Evaluación de Proyectos 1"
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    elif codigo_carrera == "5":
        semestres = {
            "1": "Primer Semestre de Ingeniería Industrial tiene Química General 1, Matemática Básica 1, Técnica Complementaria 1, Social Humanística 1",
            "2": "Segundo Semestre de Ingeniería Industrial tiene Técnicas de Estudio e Investigación, Matemática Básica 2, Física Básica, Social Humanística 2",
            "3": "Tercer Semestre de Ingeniería Industrial tiene Matemática Intermedia 1, Física 1, Prácticas Iniciales",
            "4": "Cuarto Semestre de Ingeniería Industrial tiene Dibujo Técnico Mecánico, Estadística 1, Mecánica Analítica 1, Matemática Intermedia 2, Matemática Intermedia 3, Física 2",
            "5": "Quinto Semestre de Ingeniería Industrial tiene Psicología Industrial, Contabilidad 1, Legislación 1, Programación de Computadoras 1, Estadística 2, Mecánica de Fluidos, Resistencia de Materiales 1, Ciencia de los Materiales, Matemática Aplicada 3, Ecología, Ingeniería Económica 1, Ingeniería Eléctrica 1",
            "6": "Sexto Semestre de Ingeniería Industrial tiene Mercadotecnia 1, Administración de Personal, Contabilidad 2, Legislación 2, Ingeniería de Plantas, Investigación de Operaciones I, Programación de Computadoras 2, Termodinámica 1, Procesos de Manufactura 1, Ingeniería Eléctrica 2",
            "7": "Séptimo Semestre de Ingeniería Industrial tiene Administración de Empresas 1, Microeconomía, Contabilidad 3, Ingeniería de Métodos, Seguridad e Higiene Industrial, Investigación de Operaciones II, Programación Comercial 1, Procesos de Manufactura 2, Prácticas Intermedias",
            "8": "Octavo Semestre de Ingeniería Industrial tiene Diseño para la Producción, Controles Industriales",
            "9": "Noveno Semestre de Ingeniería Industrial tiene Seminario de Investigación, Preparación y Evaluación de Proyectos 1, Control de la Producción, Seminario de Investigación de EPS, Práctica Final",
            "10": "Décimo Semestre de Ingeniería Industrial tiene Preparación y Evaluación de Proyectos 2"
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    elif codigo_carrera == "6":
        semestres = {
            "1": "Primer Semestre de Ingeniería Mecánica Eléctrica tiene Social Humanística 1, Técnica Complementaria 1, Química General 1, Matemática Básica 1",
            "2": "Segundo Semestre de Ingeniería Mecánica Eléctrica tiene Técnicas de Estudio e Investigación, Social Humanística 2, Introducción a la Programación de Computadoras, Matemática Básica 2, Física Básica",
            "3": "Tercer Semestre de Ingeniería Mecánica Eléctrica tiene Lenguajes de Programación Aplicados a Ing. Eléctrica, Matemática Intermedia 1, Física 1, Prácticas Iniciales",
            "4": "Cuarto Semestre de Ingeniería Mecánica Eléctrica tiene Estadística 1, Matemática Intermedia 2, Matemática Intermedia 3, Física 2",
            "5": "Quinto Semestre de Ingeniería Mecánica Eléctrica tiene Circuitos Eléctricos 1, Mecánica Analítica 1, Matemática Aplicada 5, Matemática Aplicada 1, Física 3",
            "6": "Sexto Semestre de Ingeniería Mecánica Eléctrica tiene Teoría Electromagnética 1, Electricidad y Electrónica Básica, Ingeniería Económica 1, Ciencia de los Materiales, Análisis Probabilístico",
            "7": "Séptimo Semestre de Ingeniería Mecánica Eléctrica tiene Circuitos Eléctricos 2, Líneas de Transmisión, Procesos de Manufactura 1, Metalurgia y Metalografía, Resistencia de Materiales 1, Prácticas Intermedias",
            "8": "Octavo Semestre de Ingeniería Mecánica Eléctrica tiene Conversión de Energía Electromecánica 1, Resistencia de Materiales 2, Mecánica de Fluidos, Mecánica Analítica 2, Administración de Empresas 1",
            "9": "Noveno Semestre de Ingeniería Mecánica Eléctrica tiene Electrónica 1, Máquinas Eléctricas, Conversión de Energía Electromecánica 2, Diseño de Máquinas 1, Procesos de Manufactura 2, Seminario de Investigación, Seminario de Investigación de EPS",
            "10": "Décimo Semestre de Ingeniería Mecánica Eléctrica tiene Instrumentación Eléctrica, Sistemas de Control 1, Diseño de Máquinas 2, Termodinámica 1, Mecanismos",
            "11": "Undécimo Semestre de Ingeniería Mecánica Eléctrica tiene Electrónica 3, Análisis de Sistemas de Potencia 1, Subestaciones, Termodinámica 2, Hidráulica, Práctica Final",
            "12": "Duodécimo Semestre de Ingeniería Mecánica Eléctrica tiene Instalaciones Eléctricas, Automatización Industrial, Vibraciones, Máquinas Hidráulicas, Plantas de Vapor"
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    elif codigo_carrera == "7":
        semestres={
            "1": "Primer Semestre de Ingeniería Mecánica Industrial tiene Técnica Complementaria 1, Social Humanística 1, Matemática Básica 1, Química General 1",
            "2": "Segundo Semestre de Ingeniería Mecánica Industrial tiene Técnicas de Estudio e Investigación, Social Humanística 2, Matemática Básica 2, Física Básica",
            "3": "Tercer Semestre de Ingeniería Mecánica Industrial tiene Matemática Intermedia 1, Física 1, Química 2, Prácticas Iniciales",
            "4": "Cuarto Semestre de Ingeniería Mecánica Industrial tiene Mecánica Analítica 1, Dibujo Técnico Mecánico, Estadística 1, Matemática Intermedia 2, Matemática Intermedia 3, Física 2",
            "5": "Quinto Semestre de Ingeniería Mecánica Industrial tiene Psicología Industrial, Contabilidad 1, Legislación 1, Ingeniería Económica 1, Ingeniería Eléctrica 1, Ciencia de los Materiales, Resistencia de Materiales 1, Mecánica Analítica 2, Mecánica de Fluidos, Estadística 2, Programación de Computadoras 1, Ecología, Matemática Aplicada 3",
            "6": "Sexto Semestre de Ingeniería Mecánica Industrial tiene Mercadotecnia 1, Administración de Personal, Contabilidad 2, Legislación 2, Investigación de Operaciones I, Ingeniería de Plantas, Ingeniería Eléctrica 2, Mecanismos, Resistencia de Materiales 2, Termodinámica 1, Metalurgia y Metalografía, Procesos de Manufactura 1",
            "7": "Séptimo Semestre de Ingeniería Mecánica Industrial tiene Administración de Empresas 1, Microeconomía, Investigación de Operaciones II, Seguridad e Higiene Industrial, Ingeniería de Métodos, Diseño de Máquinas 1, Montaje y Mantenimiento de Equipo, Procesos de Manufactura 2, Termodinámica 2, Programación Comercial 1, Prácticas Intermedias",
            "8": "Octavo Semestre de Ingeniería Mecánica Industrial tiene Diseño para la Producción, Controles Industriales, Diseño de Máquinas 2, Plantas de Vapor, Instrumentación Mecánica",
            "9": "Noveno Semestre de Ingeniería Mecánica Industrial tiene Seminario de Investigación, Seminario de Investigación de EPS, Preparación y Evaluación de Proyectos 1, Control de la Producción, Diseño de Máquinas 3, Instalaciones Mecánicas, Práctica Final",
            "10": "Décimo Semestre de Ingeniería Mecánica Industrial tiene Preparación y Evaluación de Proyectos 2."
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    elif codigo_carrera == "9":
        semestres={
            "1": "Primer Semestre de Ingeniería en Ciencias y Sistemas tiene Social Humanística 1, Matemática Básica 1, Técnica Complementaria 1, Química General 1",
            "2": "Segundo Semestre de Ingeniería en Ciencias y Sistemas tiene Social Humanística 2, Matemática Básica 2, Técnicas de Estudio e Investigación, Física Básica",
            "3": "Tercer Semestre de Ingeniería en Ciencias y Sistemas tiene Lógica de Sistemas, Matemática para Computación 1, Introducción a la Programación y Computación 1, Matemática Intermedia 1, Física 1",
            "4": "Cuarto Semestre de Ingeniería en Ciencias y Sistemas tiene Estadística 1, Lenguajes Formales y de Programación, Matemática para Computación 2, Introducción a la Programación y Computación 2, Matemática Intermedia 2, Matemática Intermedia 3, Física 2",
            "5": "Quinto Semestre de Ingeniería en Ciencias y Sistemas tiene Análisis Probabilístico, Organización de Lenguajes y Compiladores 1, Organización Computacional, Estructuras de Datos, Matemática Aplicada 3, Matemática Aplicada 1",
            "6": "Sexto Semestre de Ingeniería en Ciencias y Sistemas tiene Teoría de Sistemas 1, Investigación de Operaciones I, Economía 1, Organización de Lenguajes y Compiladores 2, Arquitectura de Computadoras y Ensambladores 1, Manejo e Implementación de Archivos",
            "7": "Séptimo Semestre de Ingeniería en Ciencias y Sistemas tiene Teoría de Sistemas 2, Investigación de Operaciones II, Sistemas Operativos 1, Arquitectura de Computadoras y Ensambladores 2, Redes de Computadoras 1, Sistemas de Bases de Datos 1, Prácticas Intermedias",
            "8": "Octavo Semestre de Ingeniería en Ciencias y Sistemas tiene Sistemas Operativos 2, Redes de Computadoras 2, Sistemas de Bases de Datos 2, Análisis y Diseño de Sistemas 1, Seminario de Sistemas I",
            "9": "Noveno Semestre de Ingeniería en Ciencias y Sistemas tiene Modelación y Simulación 1, Sistemas Organizacionales y Gerenciales 1, Inteligencia Artificial 1, Análisis y Diseño de Sistemas 2, Seminario de Sistemas 2, Práctica Final",
            "10": "Décimo Semestre de Ingeniería en Ciencias y Sistemas tiene Sistemas Organizacionales y Gerenciales 2, Modelación y Simulación 2, Software Avanzado, Seminario de Investigación"
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    elif codigo_carrera == "13":
        semestres = {
            "1": "Primer Semestre de Ingeniería Electrónica tiene Social Humanística 1, Técnica Complementaria 1, Matemática Básica 1, Química General 1",
            "2": "Segundo Semestre de Ingeniería Electrónica tiene Técnicas de Estudio e Investigación, Social Humanística 2, Introducción a la Programación de Computadoras, Matemática Básica 2, Física Básica",
            "3": "Tercer Semestre de Ingeniería Electrónica tiene Lenguajes de Programación Aplicados a Ing. Electrónica, Matemática Intermedia 1, Física 1, Prácticas Iniciales",
            "4": "Cuarto Semestre de Ingeniería Electrónica tiene Estadística 1, Matemática Intermedia 2, Matemática Intermedia 3, Física 2",
            "5": "Quinto Semestre de Ingeniería Electrónica tiene Circuitos Eléctricos 1, Electricidad y Electrónica Básica, Matemática Aplicada 5, Matemática Aplicada 1, Física 3",
            "6": "Sexto Semestre de Ingeniería Electrónica tiene Electrónica 1, Circuitos Eléctricos 2, Teoría Electromagnética 1, Análisis Probabilístico, Física 4",
            "7": "Séptimo Semestre de Ingeniería Electrónica tiene Comunicaciones 1, Electrónica 3, Electrónica 2, Instrumentación Eléctrica, Prácticas Intermedias",
            "8": "Octavo Semestre de Ingeniería Electrónica tiene Teoría Electromagnética 2, Proyectos de Computación Aplicada a I.E., Comunicaciones 2, Electrónica 5, Electrónica 4",
            "9": "Noveno Semestre de Ingeniería Electrónica tiene Telecomunicaciones y Redes Locales, Comunicaciones 3, Electrónica Aplicada 1, Electrónica 6, Sistemas de Control 1, Seminario de Investigación, Seminario de Investigación de EPS, Práctica Final",
            "10": "Décimo Semestre de Ingeniería Electrónica tiene Radiocomunicaciones Terrestres, Comunicaciones 4, Robótica, Electrónica Aplicada 2, Instalación de Equipos Electrónicos"
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    elif codigo_carrera == "35":
        semestres = {
            "1": "Primer Semestre de Ingeniería Ambiental tiene Técnica Complementaria 1, Social Humanística 1, Matemática Básica 1, Química 3, Biología General",
            "2": "Segundo Semestre de Ingeniería Ambiental tiene AutoCAD 2D, Social Humanística 2, Matemática Básica 2, Física Básica, Técnicas de Estudio e Investigación, Química 4, Climatología",
            "3": "Tercer Semestre de Ingeniería Ambiental tiene Matemática Intermedia 1, Física 1, Geografía, Análisis Cualitativo 1, Practicas Iniciales",
            "4": "Cuarto Semestre de Ingeniería Ambiental tiene Geología, Topografía 1, Matemática Intermedia 2, Matemática Intermedia 3, Física 2, Mecánica Analítica 1, Estadística 1, Química Orgánica 1",
            "5": "Quinto Semestre de Ingeniería Ambiental tiene Resistencia de Materiales 1, Mecánica de Fluidos, Ingeniería Económica 1, Legislación Ambiental 1, Topografía 2, Programación de Computadoras 1, Ecología",
            "6": "Sexto Semestre de Ingeniería Ambiental tiene Mecánica de Suelos 1, Materiales de Construcción, Hidráulica, Termodinámica 1, Seguridad e Higiene Industrial, Legislación Ambiental 2, Topografía 3, Química Ambiental, Microbiología, Economía de los Recursos Naturales",
            "7": "Séptimo Semestre de Ingeniería Ambiental tiene Hidrología, Gestión de Desastres, Taller de Sistemas de Información Geográfica, Prácticas Intermedias",
            "8": "Octavo Semestre de Ingeniería Ambiental tiene Manejo de Cuencas Hidrográficas, Ingeniería Sanitaria 1, Ingeniería Sanitaria 2, Calidad del Agua, Manejo Adecuado de Desechos Sólidos",
            "9": "Noveno Semestre de Ingeniería Ambiental tiene Preparación y Evaluación de Proyectos 1, Seminario de Investigación, Seminario de Investigación de Ética Profesional, Calidad del Aire",
            "10": "Décimo Semestre de Ingeniería Ambiental tiene Introducción al Estudio de Impacto Ambiental y Práctica Final"
        }
        if codigo_semestre in semestres:
            return semestres[codigo_semestre]
        else:
            return "Lo siento, no se encontró información para el código de semestre proporcionado."
    else:
        return "Lo siento, no se encontró información para el código de carrera proporcionado."

def obtener_informacion_de_Nuevo_Ingreso(numero_Pregunta):
    if numero_Pregunta == "1":
        respuesta = "Para poder acceder al portal de ingeniería por primera vez, usted debe: \n"
        respuesta += "1. Ir a la página https://www.ingenieria.usac.edu.gt/\n"
        respuesta += "2. En el formulario Ingreso dar click en el enlace Obtener Contraseña\n"
        respuesta += "3. En la ventana emergente:\n"
        respuesta += "I. Ingresar el número de carnet en el campo Usuario\n"
        respuesta += "II. Elegir el grupo Estudiante\n"
        respuesta += "III. En e-mail ingresar el correo electrónico a registrar\n"
        respuesta += "IV. En el campo Palabra clave elegir una palabra secreta de confirmación\n"
        respuesta += "V. Dar clic en el botón Generar\n"
        respuesta += "VI. La contraseña será enviada al correo electrónico ingresado"

        return respuesta
    elif numero_Pregunta == "2":
        respuesta = "Sí, a todos los estudiantes inscritos se les crea un correo en correo.ingenieria.usac.edu.gt\n"
        respuesta += "El correo se crea con el siguiente formato: CUI@ingenieria.usac.edu.gt\n"

        return respuesta
    elif numero_Pregunta == "3":
        respuesta = "A los estudiantes de primer ingreso y con carnet del año en curso se les asigna automáticamente, no es necesario que realicen el procedimiento en el portal de ingeniería, esto única y exclusivamente para el primer semestre. Luego del primer semestre los estudiantes son responsables de su asignación (incluyendo curso de vacaciones de junio)."

        return respuesta
    elif numero_Pregunta == "4":
        respuesta = "El requisito para poder hacer la suficiencia de un curso es no haberlo cursado anteriormente y no haber intentado hacer una suficiencia de ese mismo curso anteriormente."

        return respuesta
    elif numero_Pregunta == "5":
        respuesta = "Porque en algunos casos existen restricciones para secciones de cursos como: \n"
        respuesta += "\t a. Secciones para carnets pares/impares\n"
        respuesta += "\t b. Secciones para carreras específicas\n"
        respuesta += "\t c. Cuando el cupo de la sección ya se llenó"

        return respuesta
    else:
        return "Lo siento, no se encontró información para el número de pregunta proporcionado."

def obtener_informacion_de_Dudas_Generales(numero_Pregunta):
    if numero_Pregunta == "1":
        respuesta = "Paso 1: Debe dirigirse a la página http://rye.usac.edu.gt/actualiza/ \n"
        respuesta += "Paso 2: Ingresar con sus credenciales al portal de ingeniería.\n"
        respuesta += "Paso 3: En el área en la que se encuentran sus datos personales en el campo DPI, colocar su CUI, luego dar click en Modificar Datos\n"
        respuesta += "Nota: Verifique la información antes de guardar, ya que este cambio únicamente se puede realizar una vez. Si ha ingresado el dato de forma errónea deberá dirigirse a Centro de Cálculo a realilzar el cambio. "

        return respuesta
    elif numero_Pregunta == "2":
        respuesta = "Posibles causas por las que no se le han cargado los cursos que le aprobó son: \n"
        respuesta += "a. Datos incompletos (falta sección, el nombre o código de curso no coinciden)\n"
        respuesta += "b. Datos incorrectos (el curso no pertenece a la carrera, no está inscrito en la carrera)\n"
        respuesta += "c. La resolución no ha llegado a Centro de cálculo o a la oficina de Control Académico"

        return respuesta
    elif numero_Pregunta == "3":
        respuesta = "Para poder acceder al portal de ingeniería por primera vez, usted debe: \n"
        respuesta += "1. Ir a la página https://www.ingenieria.usac.edu.gt/\n"
        respuesta += "2. En el formulario Ingreso dar click en el enlace ¿Olvidó su Contraseña?\n"
        respuesta += "3. En la ventana emergente:\n"
        respuesta += "I. Ingresar el número de carnet en el campo Usuario\n"
        respuesta += "II. Elegir el grupo Estudiante\n"
        respuesta += "III. En e-mail ingresar el correo electrónico a registrar\n"
        respuesta += "IV. En el campo Palabra clave elegir una palabra secreta de confirmación\n"
        respuesta += "V. Dar clic en el botón Generar\n"
        respuesta += "VI. La contraseña será enviada al correo electrónico ingresado"

        return respuesta
    elif numero_Pregunta == "4":
        respuesta = "Con causas justificadas puede pedir la asignación de uno o más cursos a Junta Directiva, pero esto conlleva a una penalización por créditos según la fecha en que se realice esta petición."

        return respuesta
    elif numero_Pregunta == "5":
        respuesta = "Si se ha aprobado el laboratorio de un curso y la nota se encuentra aún vigente, entonces la misma estará disponible en la opción 'Notas' de la app 'Datos estudiantiles' al momento de la habilitación del ingreso de notas de exámenes finales correspondiente"

        return respuesta
    else:
        return "Lo siento, no se encontró información para el número de pregunta proporcionado."
    
def obtener_informacion_de_Reingreso(numero_Pregunta):
    if numero_Pregunta == "1":
        respuesta = "Sí, Haber llevado el curso que se quiere llevar como retrasada única el semestre inmediato anterior, haber llegado a zona mínima y haber pagado y asignado la segunda retrasada. La retrasada única siempre deberá aprobarse antes del(los) curso(s) congelado(s); es decir, en finales o primera retrasada. Para el congelado, se deberá llegar a zona mínima de congelamiento (60% de la zona del curso, es decir, 45 puntos) para tener derecho a examen. El congelado deberá de aprobarse después de la retrasada única (en primera o segunda retrasada). Si el curso congelado lleva laboratorio, deberá de aprobar dicho laboratorio para tener derecho tanto a zona así como a examen."

        return respuesta
    elif numero_Pregunta == "2":
        respuesta = "El procedimiento para el alquiler de toga lo puede encontrar en el siguiente enlace https://portal.ingenieria.usac.edu.gt/docs/Requisitos%20para%20la%20adquisicion%20de%20toga.pdf"
    
        return respuesta
    elif numero_Pregunta == "3":
        respuesta = "El requisito es ser estudiante de cierre (tener 215 créditos aprobados para carreras simples y 260 para carreras combinadas), no haber hecho Pre-Post anteriormente y cerrar en el semestre, curso de vacaciones o 2da retrasada perteneciente al semestre en el que solicito la asignación del Pre y Post."
    
        return respuesta
    elif numero_Pregunta == "4":
        respuesta = "El número máximo de créditos permitidos para un estudiante de pregrado en la Facultad de Ingeniería está determinado por su promedio, de acuerdo con lo siguiente: \n"
        respuesta += "Promedio entre 61 y 70: Cantidad máxima de créditos = 36\n"
        respuesta += "Promedio entre 71 y 75: Cantidad máxima de créditos = 40\n"
        respuesta += "Promedio entre 76 y 85: Cantidad máxima de créditos = 44\n"
        respuesta += "Promedio entre 86 y 100: Cantidad máxima de créditos = 48"

        return respuesta
    elif numero_Pregunta == "5":
        respuesta = "Durante el período de asignación regular, un estudiante puede realizar 5 asignaciones completas, durante las cuales podrá agregar o quitar cursos de su asignación, una vez utilizadas las 5 asignaciones, la asignación no podrá ser modificada."

        return respuesta
    else:
        return "Lo siento, no se encontró información para el número de pregunta proporcionado."
    
def obtener_traduccion(lenguaje,texto):
    translate_response = translate_client.translate_text(
        Text=texto,
        SourceLanguageCode='auto',
        TargetLanguageCode=lenguaje 
    )
    return translate_response['TranslatedText']