---
asignatura: Software y Estándares para la Web
titulo: Accesibilidad Web — resumen
resumen: Repaso de diseño universal, barreras, normas y herramientas de accesibilidad.
fuente: 4-Accesibilidad-Web.pdf
---

# Accesibilidad Web: resumen

## Diseño universal

La Web debe acomodarse a la diversidad de personas y evitar barreras innecesarias. **Diseño universal** significa diseñar productos usables por el mayor rango de personas, en el mayor rango de situaciones y de forma comercialmente practicable.

Los **siete principios** son uso equitativo, uso flexible, uso simple e intuitivo, información perceptible, tolerancia para el error, esfuerzo físico mínimo y tamaño y espacio adecuados para aproximarse y usar el diseño. Hay que distinguir comprender una interfaz, percibir su información, evitar fatiga y reducir consecuencias de errores.

[Definición y principios](?u=software-estandares-web%2Fseminarios-accesibilidad-web#diseno-universal) · [PDF, p. 7](4-Accesibilidad-Web.pdf#page=7).

## Barreras y alternativas

| Necesidad | Barreras destacadas | Alternativas del PDF |
|---|---|---|
| Ceguera al color | Funciones, mensajes, campos o categorías identificados solo por color. | Etiquetas, iconos, tramas, texturas y texto; contraste y personalización de estilos. |
| Visión reducida | Poco contraste, letra difícil de cambiar y pérdida de contexto al ampliar. | Monitores grandes, teclados de baja visión y ampliadores con vistas coordinadas. |
| Ceguera | Información gráfica sin descripción, formularios mal etiquetados o sin secuencia lógica, operaciones dependientes del ratón y CAPTCHA sin alternativa. | Texto equivalente, lector de pantalla, voz o Braille y acceso por teclado. |
| Audición | Alertas solo sonoras y audio sin transcripción. | Alternativas perceptibles, transcripciones y subtítulos; vocabulario y apoyo visual pertinentes. |
| Movimiento | Dificultades con puntero, teclas simultáneas o sostenidas y tiempo de respuesta limitado. | Teclado y ratón adaptados, voz, seguimiento de ojos y alternativas de teclado. |
| Cognición | Comprensión, abstracción, recuerdo y orientación. | Sencillez, etiquetas textuales y evaluación con las personas apropiadas. |

**Regla del color:** se puede usar color, pero la información importante no debe depender únicamente de él. El semáforo del PDF añade **Adelante, Ayuda y Salir**; los gráficos añaden tramas y texto; la obligatoriedad de campos se puede indicar con asterisco o icono.

Un lector de pantalla y un navegador de texto son ayudas diferentes. Añadir audio tampoco demuestra que la interfaz resulte accesible para personas con dificultades auditivas o de comprensión verbal.

[Clasificación y desarrollo](?u=software-estandares-web%2Fseminarios-accesibilidad-web#tipos-de-discapacidades) · [PDF, p. 13](4-Accesibilidad-Web.pdf#page=13).

## Memoria, aprendizaje y comunicación

El apartado sobre síndrome de Down relaciona **memoria a corto plazo** con olvidar terminar o enviar formularios y recordar páginas recién visitadas; **memoria a largo plazo** con significados de iconos, términos, dispositivos, actualizaciones y aprendizaje entre programas similares.

La **memoria verbal** afecta a comprensión de sintetizadores y asistentes; la **habilidad visoespacial**, a localizar elementos y elegir caminos. El **aprendizaje asociativo** puede dificultar interpretar iconos y metáforas, que el PDF pide completar con texto. La **memoria implícita** se relaciona con emociones, hábitos, respuesta motora y ritmo de aprendizaje. Los comandos de voz también pueden resultar una barrera.

Los apuntes conservan los seis diagramas originales de las páginas 50-55. Se estudian como esquemas de la fuente, sin generalizarlos como diagnóstico de cada persona.

[Apartado completo](?u=software-estandares-web%2Fseminarios-accesibilidad-web#sindrome-de-down-y-barreras-de-interaccion).

## Normas y versiones que hay que distinguir

| Referencia | Dato del material |
|---|---|
| AENOR 139.801 / 139.802 | Hardware / software. Redundancia de salida y alternativas de entrada. |
| UNE 139803:2004 / :2012 | Relación con WCAG 1.0 / 2.0. |
| UNE-EN 301549:2022 | La página 71 la vincula con WCAG 2.1. |
| Ley 56/2007 y RD 1494/2007 | Antecedentes históricos y referencia al plazo de 2008. |
| RD 1112/2018 | Referencia del PDF para sitios y aplicaciones móviles del sector público. |
| Directiva (UE) 2016/2102 | Webs y apps del sector público; hito móvil de 23 de junio de 2021. |
| WAI | Iniciativa de accesibilidad de W3C. |
| WCAG 1.0 | Obsoleta en el documento; A = prioridad 1, AA = 1+2, AAA = 1+2+3. |
| WCAG 2.0 / 2.1 | Cuatro principios; 12 / 13 pautas; criterios de éxito verificables; técnicas informativas. |
| WCAG 2.2 | Recomendación en la fuente; mejoras de áreas de clic y autenticación. |
| WCAG 3 | En desarrollo, con un Working Draft fechado 10 de septiembre de 2026 en la diapositiva. |
| ISO/IEC 40500:2025 | La captura de la página 92 la relaciona con WCAG 2.2. |

Los cuatro principios WCAG son **perceptibilidad, operabilidad, comprensibilidad y robustez**. Una pauta expresa objetivos; un criterio de éxito se verifica; una técnica es una forma informativa de cumplir o mejorar.

::: aviso Matices del documento
Las referencias anteriores se entienden según el PDF. La página 127 generaliza AA de WCAG 2.2 para España y no coincide con la relación WCAG 2.1 de la página 71. También hay contradicciones sobre lenguas de signos en la página 39 y mezclas de rótulos WCAG en capturas de herramientas. Los apuntes las señalan; no se usan como reglas universales inequívocas.
:::

[Normativa](?u=software-estandares-web%2Fseminarios-accesibilidad-web#normativa-aenor-y-evolucion-espanola) · [WAI y WCAG](?u=software-estandares-web%2Fseminarios-accesibilidad-web#wai-y-evolucion-de-wcag).

## Comprobar accesibilidad

La recomendación principal es **evaluar con personas que experimentan las barreras**. Se complementa con listas y normas, uso solo por teclado, ampliación y cambios de tipografía.

- **TAW:** URL, tipo de verificación y análisis. Diferenciar resultados automáticos de comprobaciones manuales; estas últimas requieren revisión y pueden no ser problemas.
- **AChecker:** problemas, posibles y potenciales problemas, validación HTML y CSS.
- **WAVE:** errores, alertas, características, estructura, HTML5/ARIA y contraste.
- **Analizador Web:** resumen, gráfico y tabla de verificaciones; la captura identifica OAW Ecuador.
- **Lynx y ELinks:** navegación textual sin gráficos.
- **Colour Contrast Analyser y Color Tester:** contraste y simulaciones de percepción según las capturas; también se citan WebAIM Contrast Checker y Color Oracle.

**Cero incidencias automáticas no equivale a accesibilidad completa.** La captura TAW de la página 100 muestra cero automáticas junto con 19, 46 y 26 verificaciones manuales por prioridad. Las sanciones se ilustran con una noticia histórica; no representan una sanción uniforme para todos los incumplimientos.

[Herramientas y límites](?u=software-estandares-web%2Fseminarios-accesibilidad-web#herramientas-de-comprobacion).

## Continuar el estudio

- [Apuntes completos](?u=software-estandares-web%2Fseminarios-accesibilidad-web).
- [Aspectos clave y claves de examen](?u=software-estandares-web%2Fseminarios-accesibilidad-web&vista=examen).
- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--seminarios-accesibilidad-web--facil).
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--seminarios-accesibilidad-web--medio).
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--seminarios-accesibilidad-web--dificil).
- [PDF original: 142 páginas](4-Accesibilidad-Web.pdf).

El profesor también indica lectura de **No me hagas pensar**, test en Campus Virtual y preguntas en exámenes. Ese libro no forma parte del material facilitado y estos cuestionarios se limitan al seminario.
